(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("src/ui.js", ["require", "exports"], function(require, exports) {
  angular.module('component.ui', ['component.ui.components']);
  var ngModule;
  ngModule = angular.module('component.ui.components', ['ui.router']);
  function View(_a) {
    var selector = _a.selector,
        components = _a.components;
    return function(target) {
      target.selector = selector;
      var compProvider = new ComponentProvider();
      compProvider.createComponent(target);
      if (target.hasRoute) {
        var routeProvider = new RouteProvider();
        routeProvider.createRoute(target);
      }
    };
  }
  exports.View = View;
  function Template(_a) {
    var template = _a.template,
        templateUrl = _a.templateUrl;
    return function(target) {
      target.template = template;
      target.templateUrl = templateUrl;
    };
  }
  exports.Template = Template;
  function Directive(_a) {
    var selector = _a.selector,
        properties = _a.properties,
        context = _a.context,
        _b = _a.link,
        link = _b === void 0 ? null : _b;
    return function(target) {
      var directiveName;
      directiveName = selector != undefined ? selector : target.name.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toLowerCase() + txt.substr(1);
      });
      var restrict;
      switch (context) {
        case 0:
          restrict = "E";
          break;
        case 1:
          restrict = "A";
          break;
        case 2:
          restrict = "C";
          break;
        case 3:
          restrict = "EA";
          break;
        case 4:
          restrict = "EC";
          break;
        case 5:
          restrict = "AC";
          break;
        default:
          restrict = "EAC";
          break;
      }
      ngModule.directive(directiveName, function() {
        return {
          template: target.template,
          controller: target,
          controllerAs: directiveName,
          templateUrl: target.templateUrl,
          bindToController: properties,
          restrict: restrict,
          link: link
        };
      });
    };
  }
  exports.Directive = Directive;
  function Service(_a) {
    var selector = _a.selector,
        _b = _a.components,
        components = _b === void 0 ? [] : _b;
    return function(target) {
      var serviceName = selector != undefined ? selector : target.name;
      ngModule.service(serviceName, target);
    };
  }
  exports.Service = Service;
  function Config() {
    return function(target) {
      ngModule.config(target);
    };
  }
  exports.Config = Config;
  function Constant(name, object) {
    ngModule.constant(name, object);
  }
  exports.Constant = Constant;
  function bootstrap(app, modules) {
    if (!modules) {
      modules = ['component.ui'];
    } else {
      modules.push('component.ui');
    }
    try {
      var m = angular.module('component.router');
      modules.push('component.router');
    } catch (err) {}
    angular.module(app.name, modules);
    angular.bootstrap(document, [app.name]);
  }
  exports.bootstrap = bootstrap;
  (function(DirectiveContext) {
    DirectiveContext[DirectiveContext["Element"] = 0] = "Element";
    DirectiveContext[DirectiveContext["Attribute"] = 1] = "Attribute";
    DirectiveContext[DirectiveContext["Class"] = 2] = "Class";
    DirectiveContext[DirectiveContext["ElementAttribute"] = 3] = "ElementAttribute";
    DirectiveContext[DirectiveContext["ElementClass"] = 4] = "ElementClass";
    DirectiveContext[DirectiveContext["AttributeClass"] = 5] = "AttributeClass";
    DirectiveContext[DirectiveContext["All"] = 6] = "All";
  })(exports.DirectiveContext || (exports.DirectiveContext = {}));
  var DirectiveContext = exports.DirectiveContext;
  var RouteProvider = (function() {
    function RouteProvider() {}
    RouteProvider.prototype.createRoute = function(component) {
      ngModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        if (!component.routeConfig) {
          component.routeConfig = {};
        }
        if (component.routeConfig.defaultRoute) {
          $urlRouterProvider.otherwise(component.routeUrl);
        }
        var selector = component.selector.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        component.routeConfig.template = '<' + selector + '></' + selector + '>';
        component.routeConfig.url = component.routeUrl;
        $stateProvider.state(component.stateName, component.routeConfig);
      }]);
    };
    return RouteProvider;
  })();
  var ComponentProvider = (function() {
    function ComponentProvider() {}
    ComponentProvider.prototype.createComponent = function(component) {
      ngModule.directive(component.selector, function() {
        return {
          template: component.template,
          controller: component,
          controllerAs: component.selector,
          templateUrl: component.templateUrl,
          scope: true,
          bindToController: true,
          restrict: 'E',
          transclude: true
        };
      });
    };
    return ComponentProvider;
  })();
});

_removeDefine();
})();
//# sourceMappingURL=component.ui.js.map