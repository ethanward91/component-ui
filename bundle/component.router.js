(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("src/router.js", ["require", "exports"], function(require, exports) {
  var ngModule;
  ngModule = angular.module('component.ui.router', ['ngRoute']);
  function Router(_a) {
    var url = _a.url,
        _b = _a.config,
        config = _b === void 0 ? {} : _b;
    return function(target) {
      ngModule.config(['$routeProvider', function($routeProvider) {
        var selector = target.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        config.template = '<' + selector + '></' + selector + '>';
        $routeProvider.when(url, config);
      }]);
    };
  }
  exports.Router = Router;
  ngModule = angular.module('component.router', ['ui.router']);
  function ComponentRouter(_a) {
    var url = _a.url,
        _b = _a.config,
        config = _b === void 0 ? {useAsNamedView: false} : _b;
    return function(target) {
      ngModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        var selector = target.name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        var template = '<' + selector + '></' + selector + '>';
        var stateName = target.name.replace(/\w\S*/g, function(txt) {
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
          Object.getOwnPropertyNames(config.params).forEach(function(item) {
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
        $stateProvider.state(stateName, stateConfig);
      }]);
    };
  }
  exports.ComponentRouter = ComponentRouter;
});

_removeDefine();
})();
//# sourceMappingURL=component.router.js.map