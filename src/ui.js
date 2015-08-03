define(["require", "exports"], function (require, exports) {
    angular.module('component.ui', ['component.ui.components']);
    var ngModule;
    ngModule = angular.module('component.ui.components', []);
    function View(_a) {
        var selector = _a.selector, template = _a.template, templateUrl = _a.templateUrl, _b = _a.directives, directives = _b === void 0 ? [] : _b, _c = _a.properties, properties = _c === void 0 ? {} : _c, _d = _a.transclude, transclude = _d === void 0 ? false : _d, _e = _a.restrict, restrict = _e === void 0 ? 'E' : _e, _f = _a.components, components = _f === void 0 ? [] : _f;
        return function (target) {
            var componentName;
            if (selector) {
                componentName = selector;
            }
            else {
                componentName = target.name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toLowerCase() + txt.substr(1); });
            }
            ngModule.directive(componentName, function () {
                return {
                    template: template,
                    controller: target,
                    controllerAs: componentName,
                    templateUrl: templateUrl,
                    require: directives,
                    scope: properties,
                    restrict: restrict,
                    transclude: transclude
                };
            });
        };
    }
    exports.View = View;
    function Directive(_a) {
        var selector = _a.selector, template = _a.template, templateUrl = _a.templateUrl, properties = _a.properties, _b = _a.restrict, restrict = _b === void 0 ? 'A' : _b, _c = _a.link, link = _c === void 0 ? null : _c;
        return function (target) {
            var directiveName;
            if (selector) {
                directiveName = selector;
            }
            else {
                directiveName = target.name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toLowerCase() + txt.substr(1); });
            }
            ngModule.directive(directiveName, function () {
                return {
                    template: template,
                    controller: target,
                    controllerAs: directiveName,
                    templateUrl: templateUrl,
                    scope: properties,
                    restrict: restrict,
                    link: link
                };
            });
        };
    }
    exports.Directive = Directive;
    function Service(_a) {
        var selector = _a.selector, _b = _a.components, components = _b === void 0 ? [] : _b;
        return function (target) {
            var serviceName;
            if (selector) {
                serviceName = selector;
            }
            else {
                serviceName = target.name;
            }
            ngModule.service(serviceName, target);
        };
    }
    exports.Service = Service;
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
});
//# sourceMappingURL=ui.js.map