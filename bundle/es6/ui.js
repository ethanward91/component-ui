angular.module('component.ui', ['component.ui.components']);
let ngModule;
ngModule = angular.module('component.ui.components', []);
export function View({ selector, template, templateUrl, directives = [], properties = {}, transclude = false, restrict = 'E', components = [] }) {
    return function (target) {
        var componentName;
        if (selector) {
            componentName = selector;
        }
        else {
            componentName = target.name.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toLowerCase() + txt.substr(1); });
        }
        ngModule.directive(componentName, () => {
            return {
                template: template,
                controller: target,
                controllerAs: componentName,
                templateUrl: templateUrl,
                require: directives,
                scope: properties,
                restrict: restrict,
                transclude: transclude
            };
        });
    };
}
export function Directive({ selector, template, templateUrl, properties, restrict = 'A', link = null }) {
    return function (target) {
        var directiveName;
        if (selector) {
            directiveName = selector;
        }
        else {
            directiveName = target.name.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toLowerCase() + txt.substr(1); });
        }
        ngModule.directive(directiveName, () => {
            return {
                template: template,
                controller: target,
                controllerAs: directiveName,
                templateUrl: templateUrl,
                scope: properties,
                restrict: restrict,
                link: link
            };
        });
    };
}
export function Service({ selector, components = [] }) {
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
export function Config() {
    return function (target) {
        ngModule.config(target);
    };
}
export function Constant(object) {
    ngModule.constant(object);
}
export function bootstrap(app, modules) {
    if (!modules) {
        modules = ['component.ui'];
    }
    else {
        modules.push('component.ui');
    }
    try {
        var m = angular.module('component.router');
        modules.push('component.router');
    }
    catch (err) {
    }
    angular.module(app.name, modules);
    angular.bootstrap(document, [app.name]);
}
