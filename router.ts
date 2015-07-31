declare module angular{
    function module(moduleName: string, modules?:string[]);
}

let ngModule;
ngModule = angular.module('component.ui.router', ['ngRoute']);
export function Router({url, config = {}}: {url:string; config?:any}){
    return function(target){
        ngModule.config(['$routeProvider', ($routeProvider) =>{
            var selector = target.name
                .replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .toLowerCase();
            config.template = '<' + selector + '></' + selector + '>';
            $routeProvider.when(url, config);
        }]);
    }
}

///TODO: Replace with above and rename to just Router
ngModule = angular.module('component.router', ['ui.router']);
export function ComponentRouter({url, config = {}}: {url:string; config?: {parent?: any; defaultRoute?: string; params?: any}}){
    return function(target){
        ngModule.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                
            var selector = target.name
                .replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .toLowerCase();
                
            //capturning the parent's state name.
            var parentState: string = "";
            if(config.parent){
                parentState = config.parent.name
                                    .replace(/\W+/g, '-')
                                    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                                    .toLowerCase();
            }
            var template = '<' + selector + '></' + selector + '>';
            
            var state = selector + config.parent ? '.' + parentState : '';
            
            if(config.defaultRoute){
                $urlRouterProvider.otherwise(config.defaultRoute);
            }
            
            var stateConfig:any;
            
            stateConfig.url = url;
            stateConfig.template = template;
            
            Object.getOwnPropertyNames(config.params).forEach((item) => {
                    stateConfig[item] = config.params[item];
            });
            
            $stateProvider
                .state(state, stateConfig);
        }]);
    }
}
