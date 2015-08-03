declare module 'component/ui'{
    export = ui;
}

declare module ui {
    function View({selector, template, templateUrl, directives, properties, transclude, restrict, components}:{
        selector?:string;
        template?:string;
        templateUrl?:string;
        directives?:Array<string> | string;
        properties?:any;
        transclude?: boolean;
        restrict?: string;
        components?: Array<Function>;
    });
    function Directive({selector, template, templateUrl, properties, restrict, link}:{
        selector?: string;
        template?: string;
        templateUrl?: string;
        properties?: any;
        restrict?: string;
        link?: Function;
    });
    function bootstrap(app: Function, modules?: Array<string>);
    function Service({selector}: {selector?: string});
}