System.register([], function(exports_1) {
    var ngModule;
    function Router(_a) {
        var url = _a.url, _b = _a.config, config = _b === void 0 ? {} : _b;
        return function (target) {
            ngModule.config(['$routeProvider', function ($routeProvider) {
                    var selector = target.name
                        .replace(/\W+/g, '-')
                        .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                        .toLowerCase();
                    config.template = '<' + selector + '></' + selector + '>';
                    $routeProvider.when(url, config);
                }]);
        };
    }
    exports_1("Router", Router);
    return {
        setters:[],
        execute: function() {
            ///<reference path="typings/tsd.d.ts" />
            ngModule = angular.module('component.ui.router', ['ngRoute']);
        }
    }
});
//# sourceMappingURL=router.js.map