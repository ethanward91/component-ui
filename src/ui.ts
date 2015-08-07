declare module angular{
    function module(moduleName: string, modules?:string[]);
    function bootstrap(element:any, modules?:string[])
}

angular.module('component.ui', ['component.ui.components']);
let ngModule;
ngModule = angular.module('component.ui.components', []);
export function View({selector, template, templateUrl, directives = [], properties = {}, transclude = false, restrict = 'E', components = []}: {
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
                controllerAs: componentName,
                templateUrl:templateUrl,
                require: directives,
                scope: properties,
                restrict: restrict,
                transclude: transclude
            }
        });
    }
}
export function Directive({selector, template, templateUrl, properties, restrict = 'A', link = null}:{
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
                controllerAs: directiveName,
                templateUrl:templateUrl,
                scope: properties,
                restrict: restrict,
                link: link
            }
        });
    }
}
export function Service({selector, components = []}:{selector?: string; components?: any[]}){
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
export function Config(){
    return function(target){
        ngModule.config(target);
    }
}
export function Constant(name: string, object:any){
    ngModule.constant(name, object);
}
export function bootstrap(app: any, modules?: Array<string>){
      if (!modules) {
          modules = ['component.ui'];
      }
      else {
          modules.push('component.ui');
      }
    
      try {
          var m = angular.module('component.router');
          modules.push('component.router');
      }
      catch (err) {
    
      }

    angular.module(app.name, modules);
    angular.bootstrap(document, [app.name]);
}
