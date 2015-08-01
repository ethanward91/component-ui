define(["require", "exports"], function (require, exports) {
    var ngModule;
    ngModule = angular.module('component.ui.router', ['ngRoute']);
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
    exports.Router = Router;
    ///TODO: Replace with above and rename to just Router
    ngModule = angular.module('component.router', ['ui.router']);
    function ComponentRouter(_a) {
        var url = _a.url, _b = _a.config, config = _b === void 0 ? {} : _b;
        return function (target) {
            ngModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                    var selector = target.name
                        .replace(/\W+/g, '-')
                        .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                        .toLowerCase();
                    var template = '<' + selector + '></' + selector + '>';
                    var stateName = target.name.replace(/\w\S*/g, function (txt) {
                        return txt.charAt(0).toLowerCase() + txt.substr(1);
                    });
                    stateName = (config.parent ? (config.parent + '.') : '') + stateName;
                    if (config.defaultRoute) {
                        $urlRouterProvider.otherwise(config.defaultRoute);
                    }
                    var stateConfig = {};
                    stateConfig.url = url;
                    stateConfig.template = template;
                    if (config.params) {
                        Object.getOwnPropertyNames(config.params).forEach(function (item) {
                            stateConfig[item] = config.params[item];
                        });
                    }
                    $stateProvider
                        .state(stateName, stateConfig);
                }]);
        };
    }
    exports.ComponentRouter = ComponentRouter;
});
//# sourceMappingURL=router.js.map