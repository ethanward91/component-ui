define(["require", "exports"], function (require, exports) {
    ///<reference path="../../typings/tsd.d.ts" />
    function bootstrap(app, modules) {
        angular.module(app, modules);
        angular.bootstrap(document, [app]);
    }
    exports.bootstrap = bootstrap;
});
//# sourceMappingURL=bootstrapper.js.map