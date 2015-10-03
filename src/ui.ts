declare module angular{
    function module(moduleName: string, modules?:string[]);
    function bootstrap(element:any, modules?:string[])
}

angular.module('component.ui', ['component.ui.components']);
let ngModule;
ngModule = angular.module('component.ui.components', ['ui.router']);
export function View({selector, components}:{selector: string, components?: Function[]}){
    return function(target){
        target.selector = selector;
        
        //Creating the component.
        var compProvider = new ComponentProvider();
        compProvider.createComponent(target);
        
        //if we have a route attached to the component.
        if(target.hasRoute) {
           var routeProvider = new RouteProvider();
           routeProvider.createRoute(target);
        }
    }
}
export function Template({template, templateUrl}: {template?:string, templateUrl?:string}){
    return function(target){
        target.template = template;
        target.templateUrl = templateUrl;
    }
}
export function Directive({selector, properties, context, link = null}:{
    selector?: string;
    properties?: any;
    context?: DirectiveContext;
    link?: Function;
}){
    return function(target){
        var directiveName;
        
        directiveName = selector != undefined ? selector : target.name.replace(/\w\S*/g, (txt) => {return txt.charAt(0).toLowerCase() + txt.substr(1);});
        
        var restrict:string;
        
        if(context){
            switch(context){
                case 0:
                    restrict = "E";
                    break;
                case 1: 
                    restrict = "A";
                    break;
                case 2:
                    restrict = "C";
                    break;
                case 3:
                    restrict = "EA";
                    break;
                case 4:
                    restrict = "EC";
                    break;
                case 5: 
                    restrict = "AC";
                    break;
                default: 
                    restrict = "EAC";
                    break;
            }
        }
        else{
            restrict = "A";
        }
        
        //transforming the values on properties from the enum to the appropriate values.
        Object.getOwnPropertyNames(properties).forEach(item =>{
            
            if(properties[item] == 0){
                properties[item] = "@";
            }
            if(properties[item] == 1){
                properties[item] = "&";
            }
            if(properties[item] == 2){
                properties[item] = "=";
            }
        })

        ngModule.directive(directiveName, () =>{
            return {
                template:target.template,
                controller: target,
                controllerAs: directiveName,
                templateUrl:target.templateUrl,
                bindToController: properties,
                restrict: restrict,
                transclude: true,
                link: link
            }
        });
    }
}
export function Service({selector, components = []}:{selector?: string; components?: any[]}){
    return function(target){
        var serviceName = selector != undefined ? selector : target.name;
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

//Enums

export enum DirectiveContext{
    Element,
    Attribute,
    Class,
    ElementAttribute,
    ElementClass,
    AttributeClass,
    All
}
export enum PropertyType{
    String,
    Expression,
    Bindable
}

//Private Classes
class RouteProvider{
    constructor(){
    }
    
    createRoute(component:any){
         ngModule.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
                
                //checking to see if there is a stateConfig object on the component class.
                if(!component.routeConfig){
                    component.routeConfig = {};
                }
                
                //check to see if there is a defaultRoute on the component.
                if(component.routeConfig.defaultRoute){
                     $urlRouterProvider.otherwise(component.routeUrl);
                }
                
                //Creating the selector of the directive we are going to be routing to.
                var selector = component.selector
                    .replace(/\W+/g, '-')
                    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                    .toLowerCase();
                component.routeConfig.template = '<' + selector + '></' + selector + '>';
                
                //Setting the url.
                component.routeConfig.url = component.routeUrl; 
                
                //creating the state for the component.
                $stateProvider
                    .state(component.stateName, component.routeConfig);
            }]);
    }
}

class ComponentProvider{
    constructor() {
        
    }
    
    createComponent(component: any){
        ngModule.directive(component.selector, () =>{
            return {
                template:component.template,
                controller: component, 
                controllerAs: component.selector,
                templateUrl:component.templateUrl,
                scope: true,
                bindToController: true,
                restrict: 'E',
                transclude: true
            }
        });
    }
}