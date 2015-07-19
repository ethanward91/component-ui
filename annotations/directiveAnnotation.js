define(["require", "exports"], function (require, exports) {
    ///<reference path="../../typings/tsd.d.ts" />
    var ngModule;
    ngModule = angular.module('component.ui.directives', []);
    function DirectiveAnnotation(_a) {
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
//# sourceMappingURL=directiveAnnotation.js.map