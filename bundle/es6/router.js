let ngModule;
ngModule = angular.module('component.ui.router', ['ngRoute']);
export function Router({ url, config = {} }) {
    return function (target) {
        ngModule.config(['$routeProvider', ($routeProvider) => {
                var selector = target.name
                    .replace(/\W+/g, '-')
                    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
                    .toLowerCase();
                config.template = '<' + selector + '></' + selector + '>';
                $routeProvider.when(url, config);
            }]);
    };
}
///TODO: Replace with above and rename to just Router
ngModule = angular.module('component.router', ['ui.router']);
export function ComponentRouter({ url, config = { useAsNamedView: false } }) {
    return function (target) {
        ngModule.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
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
                    Object.getOwnPropertyNames(config.params).forEach((item) => {
                        stateConfig[item] = config.params[item];
                    });
                }
                if (config.useAsNamedView) {
                    stateConfig.views = {};
                    stateConfig.views[selector] = {
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
