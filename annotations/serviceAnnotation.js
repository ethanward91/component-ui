define(["require", "exports"], function (require, exports) {
    ///<reference path="../../typings/tsd.d.ts" />
    var ngModule;
    ngModule = angular.module('component.ui.services', []);
    function ServiceAnnotation(_a) {
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
    exports.ServiceAnnotation = ServiceAnnotation;
});
//# sourceMappingURL=serviceAnnotation.js.map