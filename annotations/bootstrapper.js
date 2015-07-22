System.register([], function(exports_1) {
    ///<reference path="../typings/tsd.d.ts" />
    function bootstrap(app, modules) {
        angular.module(app, modules);
        angular.bootstrap(document, [app]);
    }
    exports_1("bootstrap", bootstrap);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=bootstrapper.js.map