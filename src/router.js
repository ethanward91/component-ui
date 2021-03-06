define(["require", "exports"], function (require, exports) {
    var ngModule;
    ngModule = angular.module('component.router', []);
    function Router(_a) {
        var url = _a.url, stateName = _a.stateName;
        return function (target) {
            target.hasRoute = true;
            target.routeUrl = url;
            target.stateName = stateName != undefined ? stateName : target.name.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toLowerCase() + txt.substr(1);
            });
        };
    }
    exports.Router = Router;
    function RouteConfig(_a) {
        var defaultRoute = _a.defaultRoute, parent = _a.parent, params = _a.params;
        return function (target) {
            //Setting up our routeConfig object.
            target.routeConfig = {};
            target.routeConfig.defaultRoute = defaultRoute;
            target.routeConfig.parent = parent;
            if (params) {
                Object.getOwnPropertyNames(params).forEach(function (item) {
                    target.routeConfig[item] = params[item];
                });
            }
        };
    }
    exports.RouteConfig = RouteConfig;
    ///TODO: Replace with above and rename to just Router
    ngModule = angular.module('component.router', ['ui.router']);
    function ComponentRouter(_a) {
        var url = _a.url, _b = _a.config, config = _b === void 0 ? { useAsNamedView: false } : _b;
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
                    //Sets up the nested view
                    //NOTE: By doing this we practically excluding the component/ui View decorator
                    //since now the view code will be handled by the componentRouter
                    if (config.useAsNamedView) {
                        stateConfig.views = {};
                        var view;
                        //give the consumer the option to set their own viewName
                        //usefull for when you are using two seperate templates for the same nested-view
                        if (config.params.viewName) {
                            view = config.params.viewName;
                        }
                        else {
                            view = selector;
                        }
                        stateConfig.views[view] = {
                            templateUrl: config.params.templateUrl,
                            controller: target,
                            controllerAs: selector
                        };
                    }
                    $stateProvider
                        .state(stateName, stateConfig);
                }]);
        };
    }
    exports.ComponentRouter = ComponentRouter;
});
//# sourceMappingURL=router.js.map