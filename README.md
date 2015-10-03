# component-ui
Component based architectural abstraction over angular 1.x


Component-UI will allow you to write Angular 1.x applications with an Angular 2 look and feel.
By using features such as decorators to define your component, set your route, or create directives.

*Note: This is NOT a replacement for Angular 2. This is just simply a way to get familiarized with a more component driven architecture.

### Pre-reqs
* Component-UI is built using [Typescript 1.5](https://github.com/Microsoft/TypeScript), so in order to use you MUST install.
* A Module Loader will also bee needed in order for things to work properly. Component-UI is build using [SystemJS](https://github.com/systemjs/systemjs)
* Component-UI is written to use [AngularJS](https://angularjs.org/) 1.4, but should work fine with 1.3.*



## Creating Components
### View Decorator
Components are created by simply importing the "View" and "Template" decorators from the "component/ui" module.

```typescript
  import {View, Template} from 'component/ui';
```

```typescript
  import {View, template} from 'component/ui';

  @View({
    selector: "myApp"
  })
  @Template({
    templateUrl: 'app/myApp.html'
  })
  class MyApp{
    constructor(){

    }
  }
```
When creating components ordering of the decorators is key. Decorators are ran from the bottom up. So by having the View below the Template,
when the component is setup it will have no template to set.
```typescript
  import {View, template} from 'component/ui';
  
  //Will not render the template because the component has been created before the template has been declared. 
  @Template({
    templateUrl: 'app/myApp.html'
  })
  @View({
    selector: "myApp"
  })
  class MyApp{
    constructor(){

    }
  }
```

API for the View and Template decorators: 
```typescript
@View({
  selector: string, // Name of your component
  components?: Array<Function> //List of components or sevices you need to register with the component.
})
@Template({
  template: string,
  templateUrl: string
})
```


In order to bootstrap our applications, which we have to now do manually since we are creating components/modules after angular's initial bootstrapping process. We just pull in the "bootstrap" function from the "component/ui" module:
```typescript
  bootstrap(MyApp, ['...Any other dependencies']);
```
After we've setup our initial entry point for our application we simple drop the component in our index.html page as shown below:

```html
<html>
	<head>
    	<!-- Your script references -->
    </head>
    <body>
    	<my-app></my-app>
    </body>
</html>
```
*Note that we are not setting ng-app anywhere in our index.html page. This is because the bootstrap function handles this for us, by calling the angular.bootstrap() method.

Now that we have our entry component setup and wired into our index.html. Next is to wire up the System.js loader, or module loader of your choice, and setup our System.config to map our modules.

```typescript
System.config({
	"map": {
    	"app": "myApp.js"
    }
});
```

```html
<html>
	<head>
    	<!-- Your script references -->
        <script src="node_modules/systemjs/bin/system.js"></script>
        <script src="config.js"></script>
    </head>
    <body>
    	<my-app></my-app>
        <script>
        	System.import("app");
        </script>
    </body>
</html>
```
### Route Decorator
To setup a routable component, simply import the "Router" and "RouteConfig" decorators from the "component/router" module.
```typescript
 import {Router, RouteConfig} from 'component/router';
```
The Router decorator will set up the necessary parts for the View decorator to make your component routable. While the RouteConfig will set up any additional configuration you would like on the route. E.g. Setting a default route. 
```typescript
	@Router({
    	url: "/myUrl", //url of your component
      stateName: "myRouteState" //this property is optional and will default to the name of your component class if not provided.
    })
  @RouteConfig({
    defaultRoute: true, //tells the router to set this component as it's default route.
    parent: "myParent", //used if nesting routes.
    params: {  // used for options parameters you would like to have on your route.
      Options: ""
    }
  })
```
Example of setting up a routable component.
```typescript
  import {View, Template} from 'component/ui';
  import {Router, RouteConfig} from 'component/router';

  @View({
    selector: "customers"
  })
  @Template({
    templateUrl: "app/customers.html"
  })
  @Router({
  	url: "/customers",
    stateName: "customerList"
  })
  @RouteConfig({
    defaultRoute: true, //This tells the router to set the url of this component to be the default route of the application.
    params: {
      title: "Customers" //The params property gives you the option to set custom properties on your route.
    }
  })
  export class CustomerListComponent{
    constructor(){

    }
  }
```

Now that we've set up a routable component. We need to tell the entry component that we are going to be using this in our application.
```typescript
  import {View, Template, bootstrap} from 'component/ui';
  import {CustomerListComponent} from 'directory/location/of/component'

  @View({
    selector: "myApp"
    components: [CustomerListComponent]
  })
  @Template({
     templateUrl: 'app/myApp.html',
  })
  class MyApp{
    constructor(){

    }
  }
  
  bootstrap(MyApp);
```
Doing this will tell the module loader system, that this is a dependency in our application and needs to be loaded with our app.

### Directive Decorator
The Directive decorator is used for creating DOM manipulating components that aren't page level elements. i.e a datepicker widget.
API's for the Directive decorator: 
```typescript
@Directive({
        selector: string; //Selector of your directive
        properties?: any; //Any scope properties that the directive requires. **Note.. These are being bound to the controller via the bindToController method.
        context?: DirectiveContext; //The context of your directive (Attribute by default). See the DirectiveContext Enum.
        link?: Function; //Option link function.
    })
```
#### DirectiveContext Enum
```typescript
 enum DirectiveContext{
        Element,
        Attribute,
        Class,
        ElementAttribute,
        ElementClass,
        AttributeClass,
        All
    }
```

Creating a Directive
```typescript
import {Directive, Template} from 'component/ui';

@Directive({
	selector: "myDirective",
  context: DirectiveContext.Attribute,
  properties: {
    myProperty: '@'
  }
})
@Template({
  template: '<div>html template here</div>'
})
export class MyDirective{
  public myProperty: string;
  constructor(){
  }
}
```

### Service Decorator
The Service decorator creates an angular service, names it after the associated class, and then add the service to the "component.ui" module.

Service Decorator API
```typescript
@Service({
  selector?: string //Will take the class name by default
})
```

Creating a Service
```typescript
import {Service} from 'component/ui';

@Service({})
export class MyService{
  constructor(){

  }
  getCustomers(){
  	return [
      	{
          	firstName: 'John',
              lastName: 'Doe'
          }
      ]
  }
}
```
To use the above service in our component we just import the service, and tell the component we are going to be using it.

```typescript
  import {View, Template} from 'component/ui';
  import {Router, RouteConfig} from 'component/router';
  import {MySevice} from 'services/myService';

  @View({
    selector: "customers"
  })
  @Template({
    templateUrl: "app/customers.html"
  })
  @Router({
  	url: "/customers",
    stateName: "customerList"
  })
  @RouteConfig({
    defaultRoute: true, //This tells the router to set the url of this component to be the default route of the application.
    params: {
      title: "Customers" //The params property gives you the option to set custom properties on your route.
    }
  })
  export class CustomeCustomerListComponentrs{
  	public customers;
    //We are using Angular's Dependency injection to do the work of getting the service to the controller
    //But we are also using the import Service definition to get our typing.
    constructor(private MySerivce: MyService){
  		this.customers = this.MyService.getCustomers();
    }
  }
```