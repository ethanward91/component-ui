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
    function Service({selector, services}: {selector? : string, services?: Array<Function>});
    /**
     * Creates a new Config Component.
     */
    function Config();
    /**
     * Adds constants to the bootstrapped angular application.
     */
    function Constant(name:string, object:any);
    /**
     * Declares a startup class.
     * angular.module().run();
     */
    function StartUp();
    
    /**
     * Used to set the context of the directive component.
     */
    enum DirectiveContext{
        Element,
        Attribute,
        Class,
        ElementAttribute,
        ElementClass,
        AttributeClass,
        All
    }
    /**
     * Used to set what property type you are using on the directive properties.
     */
    enum PropertyType{
        String,
        Expression,
        Bindable
    }
}