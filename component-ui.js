//(function(){
//    var _removeDefine = System.get("@@amd-helpers").createDefine();
    (function() {
        var _removeDefine = System.get("@@amd-helpers").createDefine();
        define("annotations/viewAnnotation", ["require", "exports"], function(require, exports) {
            var ngModule;
            ngModule = angular.module('component.ui.components', []);
            function ViewAnnotation(_a) {
                var selector = _a.selector,
                    template = _a.template,
                    templateUrl = _a.templateUrl,
                    _b = _a.directives,
                    directives = _b === void 0 ? [] : _b,
                    _c = _a.properties,
                    properties = _c === void 0 ? {} : _c,
                    _d = _a.transclude,
                    transclude = _d === void 0 ? false : _d,
                    _e = _a.restrict,
                    restrict = _e === void 0 ? 'E' : _e,
                    _f = _a.components,
                    components = _f === void 0 ? [] : _f;
                return function(target) {
                    var componentName;
                    if (selector) {
                        componentName = selector;
                    } else {
                        componentName = target.name.replace(/\w\S*/g, function(txt) {
                            return txt.charAt(0).toLowerCase() + txt.substr(1);
                        });
                    }
                    ngModule.directive(componentName, function() {
                        return {
                            template: template,
                            controller: target,
                            controllerAs: 'vm',
                            templateUrl: templateUrl,
                            require: directives,
                            scope: properties,
                            restrict: restrict,
                            transclude: transclude
                        };
                    });
                };
            }
            exports.ViewAnnotation = ViewAnnotation;
        });

        _removeDefine();
    })();
    (function() {
        var _removeDefine = System.get("@@amd-helpers").createDefine();
        define("annotations/directiveAnnotation", ["require", "exports"], function(require, exports) {
            var ngModule;
            ngModule = angular.module('component.ui.directives', []);
            function DirectiveAnnotation(_a) {
                var selector = _a.selector,
                    template = _a.template,
                    templateUrl = _a.templateUrl,
                    properties = _a.properties,
                    _b = _a.restrict,
                    restrict = _b === void 0 ? 'A' : _b,
                    _c = _a.link,
                    link = _c === void 0 ? null : _c;
                return function(target) {
                    var directiveName;
                    if (selector) {
                        directiveName = selector;
                    } else {
                        directiveName = target.name.replace(/\w\S*/g, function(txt) {
                            return txt.charAt(0).toLowerCase() + txt.substr(1);
                        });
                    }
                    ngModule.directive(directiveName, function() {
                        return {
                            template: template,
                            controller: target,
                            controllerAs: 'vm',
                            templateUrl: templateUrl,
                            scope: properties,
                            restrict: restrict,
                            link: link
                        };
                    });
                };
            }
            exports.DirectiveAnnotation = DirectiveAnnotation;
        });

        _removeDefine();
    })();
    (function() {
        var _removeDefine = System.get("@@amd-helpers").createDefine();
        define("annotations/bootstrapper", ["require", "exports"], function(require, exports) {
            function bootstrap(app, modules) {
                angular.module(app, modules);
                angular.bootstrap(document, [app]);
            }
            exports.bootstrap = bootstrap;
        });

        _removeDefine();
    })();
    (function() {
        var _removeDefine = System.get("@@amd-helpers").createDefine();
        define("annotations/serviceAnnotation", ["require", "exports"], function(require, exports) {
            var ngModule;
            ngModule = angular.module('component.ui.services', []);
            function ServiceAnnotation(_a) {
                var selector = _a.selector,
                    _b = _a.components,
                    components = _b === void 0 ? [] : _b;
                return function(target) {
                    var serviceName;
                    if (selector) {
                        serviceName = selector;
                    } else {
                        serviceName = target.name;
                    }
                    ngModule.service(serviceName, target);
                };
            }
            exports.ServiceAnnotation = ServiceAnnotation;
        });

        _removeDefine();
    })();
//    _removeDefine();
//})
(function() {
    var _removeDefine = System.get("@@amd-helpers").createDefine();
    define("component/ui", ["require", "exports", "annotations/viewAnnotation", "annotations/directiveAnnotation", "annotations/bootstrapper", "annotations/serviceAnnotation"], function(require, exports, viewAnnotation_1, directiveAnnotation_1, bootstrapper_1, serviceAnnotation_1) {
      angular.module('component.ui', ['component.ui.directives', 'component.ui.components', 'component.ui.services']);
      exports.View = viewAnnotation_1.ViewAnnotation;
      exports.Directive = directiveAnnotation_1.DirectiveAnnotation;
      exports.bootstrap = bootstrapper_1.bootstrap;
      exports.Service = serviceAnnotation_1.ServiceAnnotation;
    });
    _removeDefine();
})();
//# sourceMappingURL=component-ui.map