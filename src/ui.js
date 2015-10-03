define(["require", "exports"], function (require, exports) {
    angular.module('component.ui', ['component.ui.components']);
    var ngModule;
    ngModule = angular.module('component.ui.components', ['ui.router']);
    function View(_a) {
        var selector = _a.selector, components = _a.components;
        return function (target) {
            target.selector = selector;
            //Creating the component.
            var compProvider = new ComponentProvider();
            compProvider.createComponent(target);
            //if we have a route attached to the component.
            if (target.hasRoute) {
                var routeProvider = new RouteProvider();
                routeProvider.createRoute(target);
            }
        };
    }
    exports.View = View;
    function Template(_a) {
        var template = _a.template, templateUrl = _a.templateUrl;
        return function (target) {
            target.template = template;
            target.templateUrl = templateUrl;
        };
    }
    exports.Template = Template;
    function Directive(_a) {
        var selector = _a.selector, properties = _a.properties, context = _a.context, _b = _a.link, link = _b === void 0 ? null : _b;
        return function (target) {
            var directiveName;
            directiveName = selector != undefined ? selector : target.name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toLowerCase() + txt.substr(1); });
            var restrict;
            if (context) {
                switch (context) {
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
            else {
                restrict = "A";
            }
            //transforming the values on properties from the enum to the appropriate values.
            Object.getOwnPropertyNames(properties).forEach(function (item) {
                if (properties[item] == 0) {
                    properties[item] = "@";
                }
                if (properties[item] == 1) {
                    properties[item] = "&";
                }
                if (properties[item] == 2) {
                    properties[item] = "=";
                }
            });
            ngModule.directive(directiveName, function () {
                return {
                    template: target.template,
                    controller: target,
                    controllerAs: directiveName,
                    templateUrl: target.templateUrl,
                    bindToController: properties,
                    restrict: restrict,
                    transclude: true,
                    link: link
                };
            });
        };
    }
    exports.Directive = Directive;
    function Service(_a) {
        var selector = _a.selector, _b = _a.components, components = _b === void 0 ? [] : _b;
        return function (target) {
            var serviceName = selector != undefined ? selector : target.name;
            ngModule.service(serviceName, target);
        };
    }
    exports.Service = Service;
    function Config() {
        return function (target) {
            ngModule.config(target);
        };
    }
    exports.Config = Config;
    function Constant(name, object) {
        ngModule.constant(name, object);
    }
    exports.Constant = Constant;
    function bootstrap(app, modules) {
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
    exports.bootstrap = bootstrap;
    //Enums
    (function (DirectiveContext) {
        DirectiveContext[DirectiveContext["Element"] = 0] = "Element";
        DirectiveContext[DirectiveContext["Attribute"] = 1] = "Attribute";
        DirectiveContext[DirectiveContext["Class"] = 2] = "Class";
        DirectiveContext[DirectiveContext["ElementAttribute"] = 3] = "ElementAttribute";
        DirectiveContext[DirectiveContext["ElementClass"] = 4] = "ElementClass";
        DirectiveContext[DirectiveContext["AttributeClass"] = 5] = "AttributeClass";
        DirectiveContext[DirectiveContext["All"] = 6] = "All";
    })(exports.DirectiveContext || (exports.DirectiveContext = {}));
    var DirectiveContext = exports.DirectiveContext;
    (function (PropertyType) {
        PropertyType[PropertyType["String"] = 0] = "String";
        PropertyType[PropertyType["Expression"] = 1] = "Expression";
        PropertyType[PropertyType["Bindable"] = 2] = "Bindable";
    })(exports.PropertyType || (exports.PropertyType = {}));
    var PropertyType = exports.PropertyType;
    //Private Classes
    var RouteProvider = (function () {
        function RouteProvider() {
        }
        RouteProvider.prototype.createRoute = function (component) {
            ngModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                    //checking to see if there is a stateConfig object on the component class.
                    if (!component.routeConfig) {
                        component.routeConfig = {};
                    }
                    //check to see if there is a defaultRoute on the component.
                    if (component.routeConfig.defaultRoute) {
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
        };
        return RouteProvider;
    })();
    var ComponentProvider = (function () {
        function ComponentProvider() {
        }
        ComponentProvider.prototype.createComponent = function (component) {
            ngModule.directive(component.selector, function () {
                return {
                    template: component.template,
                    controller: component,
                    controllerAs: component.selector,
                    templateUrl: component.templateUrl,
                    scope: true,
                    bindToController: true,
                    restrict: 'E',
                    transclude: true
                };
            });
        };
        return ComponentProvider;
    })();
});
//# sourceMappingURL=ui.js.map