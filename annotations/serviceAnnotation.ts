///<reference path="../typings/tsd.d.ts" />
let ngModule:ng.IModule;
ngModule = angular.module('component.ui.services', []);
export function ServiceAnnotation({selector, components = []}:{selector?: string; components?: any[]}){
    return function(target){
        var serviceName;
        if(selector){
            serviceName = selector;
        }
        else{
            serviceName  = target.name;
        }


        ngModule.service(serviceName, target);
    }
}
