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
export function ComponentRouter({url, config = {useAsNamedView: false}}: {url:string; config?: {parent?: string; defaultRoute?: string; useAsNamedView?: boolean; params?: any}}){
    return function(target){
        ngModule.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                
            var selector = target.name
                .replace(/\W+/g, '-')
                .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                .toLowerCase();
            
            var template = '<' + selector + '></' + selector + '>';
            
            var stateName = target.name.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toLowerCase() + txt.substr(1);
            });
            
            stateName = (config.parent ? (config.parent + '.') : '') + stateName;
            if(config.defaultRoute){
                $urlRouterProvider.otherwise(config.defaultRoute);
            }
            
            var stateConfig:any = {};
            
            stateConfig.url = url;
            stateConfig.template = template;
            
            if(config.params){
                Object.getOwnPropertyNames(config.params).forEach((item) => {
                    stateConfig[item] = config.params[item];
                });
            }
            
            //Sets up the nested view
            //NOTE: By doing this we practically excluding the component/ui View decorator
            //since now the view code will be handled by the componentRouter
            if(config.useAsNamedView){
                stateConfig.views = {};
                var view:string;
                
                //give the consumer the option to set their own viewName
                //usefull for when you are using two seperate templates for the same nested-view
                if(config.params.viewName){
                    view = config.params.viewName;
                }
                else{
                    view = selector;
                }
                
                stateConfig.views[view] = {
                    templateUrl: config.params.templateUrl,
                    controller: target,
                    controllerAs: selector
                }
            }
            
            $stateProvider
                .state(stateName, stateConfig);
        }]);
    }
}
