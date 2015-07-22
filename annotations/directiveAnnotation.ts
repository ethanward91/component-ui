///<reference path="../typings/tsd.d.ts" />
let ngModule:ng.IModule;
ngModule = angular.module('component.ui.directives', []);
export function DirectiveAnnotation({selector, template, templateUrl, properties, restrict = 'A', link = null}:{
    selector?: string;
    template?: string;
    templateUrl?: string;
    properties?: any;
    restrict?: string;
    link?: Function;
}){
    return function(target){
        var directiveName;
        if(selector){
            directiveName = selector;
        }
        else{
            directiveName  = target.name.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toLowerCase() + txt.substr(1);});
        }

        ngModule.directive(directiveName, () =>{
            return {
                template:template,
                controller: target,
                controllerAs: 'vm',
                templateUrl:templateUrl,
                scope: properties,
                restrict: restrict,
                link: link
            }
        });
    }
}
