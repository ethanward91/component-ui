///<reference path="../typings/tsd.d.ts" />
let ngModule:ng.IModule;
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
