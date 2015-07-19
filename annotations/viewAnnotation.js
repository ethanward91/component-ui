define(["require", "exports"], function (require, exports) {
    ///<reference path="../../typings/tsd.d.ts" />
    var ngModule;
    ngModule = angular.module('component.ui.components', []);
    function ViewAnnotation(_a) {
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
//# sourceMappingURL=viewAnnotation.js.map