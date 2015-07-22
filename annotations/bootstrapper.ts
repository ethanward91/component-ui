///<reference path="../typings/tsd.d.ts" />
export function bootstrap(app: string, modules?: Array<string>){
    angular.module(app, modules);
    angular.bootstrap(document, [app]);
}
