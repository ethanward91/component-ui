System.register(['annotations/viewAnnotation', 'annotations/directiveAnnotation', 'annotations/bootstrapper', 'annotations/serviceAnnotation'], function(exports_1) {
    var viewAnnotation_1, directiveAnnotation_1, bootstrapper_1, serviceAnnotation_1;
    return {
        setters:[
            function (_viewAnnotation_1) {
                viewAnnotation_1 = _viewAnnotation_1;
                exports_1("View", viewAnnotation_1.ViewAnnotation);
            },
            function (_directiveAnnotation_1) {
                directiveAnnotation_1 = _directiveAnnotation_1;
                exports_1("Directive", directiveAnnotation_1.DirectiveAnnotation);
            },
            function (_bootstrapper_1) {
                bootstrapper_1 = _bootstrapper_1;
                exports_1("bootstrap", bootstrapper_1.bootstrap);
            },
            function (_serviceAnnotation_1) {
                serviceAnnotation_1 = _serviceAnnotation_1;
                exports_1("Service", serviceAnnotation_1.ServiceAnnotation);
            }],
        execute: function() {
            ///<reference path="typings/tsd.d.ts" />
            angular.module('component.ui', ['component.ui.directives', 'component.ui.components', 'component.ui.services']);
        }
    }
});
//# sourceMappingURL=ui.js.map