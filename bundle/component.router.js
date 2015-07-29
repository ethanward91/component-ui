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
});

_removeDefine();
})();
//# sourceMappingURL=component.router.js.map