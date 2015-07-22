///<reference path="../typings/tsd.d.ts" />
let ngModule:ng.IModule;
ngModule = angular.module('component.ui.components', []);
export function ViewAnnotation({selector, template, templateUrl, directives = [], properties = {}, transclude = false, restrict = 'E', components = []}: {
    selector?:string;
    template?:string;
    templateUrl?:string;
    directives?:Array<string> | string;
    properties?:any;
    transclude?: boolean;
    restrict?: string;
    components?: Array<Function>;
}){
    return function(target){
        var componentName;
        if(selector){
            componentName = selector;
        }
        else{
            componentName  = target.name.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toLowerCase() + txt.substr(1);});
        }
        ngModule.directive(componentName, () =>{
            return {
                template:template,
                controller: target,
                controllerAs: 'vm',
                templateUrl:templateUrl,
                require: directives,
                scope: properties,
                restrict: restrict,
                transclude: transclude
            }
        });
    }
}
