declare module 'component/ui'{
    export = ui;
}

declare module ui {
    /**
     * Creates a new View Component.
     * @param selector: string
     * @param components: Function[]
     */
    function View({selector, components}:{selector:string, components?:Function[]});
    /**
     * Sets up a template to be used by a View or Directive Component.
     */
    function Template({template, templateUrl}:{template?:string, templateUrl?:string});
    /**
     * Creates a new Directive Component
     */
    function Directive({selector, properties, context, link}:{
        selector?: string;
        properties?: any;
        context?: DirectiveContext;
        link?: Function;
    });
    /**
     * Bootstraps the angular application.
     */
    function bootstrap(app: Function, modules?: Array<string>);
    /**
     * Creates a new Service Component.
     */
    function Service({selector}: {selector?: string});
    /**
     * Creates a new Config Component.
     */
    function Config();
    /**
     * Adds constants to the bootstrapped angular application.
     */
    function Constant(name:string, object:any);
    enum DirectiveContext{
        Element,
        Attribute,
        Class,
        ElementAttribute,
        ElementClass,
        AttributeClass,
        All
    }
}