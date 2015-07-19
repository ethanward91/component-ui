define(["require", "exports", 'annotations/viewAnnotation', 'annotations/directiveAnnotation', 'annotations/bootstrapper', 'annotations/serviceAnnotation'], function (require, exports, viewAnnotation_1, directiveAnnotation_1, bootstrapper_1, serviceAnnotation_1) {
    ///<reference path="../typings/tsd.d.ts" />
    angular.module('component.ui', ['component.ui.directives', 'component.ui.components', 'component.ui.services']);
    exports.View = viewAnnotation_1.ViewAnnotation;
    exports.Directive = directiveAnnotation_1.DirectiveAnnotation;
    exports.bootstrap = bootstrapper_1.bootstrap;
    exports.Service = serviceAnnotation_1.ServiceAnnotation;
});
//# sourceMappingURL=ui.js.map