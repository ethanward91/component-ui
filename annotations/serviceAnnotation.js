System.register([], function(exports_1) {
    var ngModule;
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
    exports_1("ServiceAnnotation", ServiceAnnotation);
    return {
        setters:[],
        execute: function() {
            ///<reference path="../typings/tsd.d.ts" />
            ngModule = angular.module('component.ui.services', []);
        }
    }
});
//# sourceMappingURL=serviceAnnotation.js.map