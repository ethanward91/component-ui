# component-ui
*ReadME is still under progress... Just wanted to get something up. I'll get better examples and docs up soon. 

Component based architectural abstraction over angular 1.x


Component-UI will allow you to write Angular 1.x applications with an Angular 2 look and feel.
By using features such as decorators to define your component, set your route, or create directives.

*Note: This is NOT a replacement for Angular 2. This is just simply a way to get familiarized with a more component driven architecture. Also, this IS using Typescript 1.5-beta. So be mindful of this when/if using Component-UI for production code.

### Pre-reqs
* Component-UI is built using [Typescript 1.5-beta](https://github.com/Microsoft/TypeScript), so in order to use you MUST install.
* A Module Loader will also bee needed in order for things to work properly. Component-UI is build using [SystemJS](https://github.com/systemjs/systemjs)
* Component-UI is written to use [AngularJS](https://angularjs.org/) 1.4, but should work fine with 1.3.*



## Creating Components
### View Decorator
Components are created by simply importing the "View" decorator from the "component-ui/ui" module. The View decorator is mearly just an abstraction over angular directives.

```javascript
  import {View} from 'component-ui/ui';
```

```javascript
  import {View} from 'component-ui/ui';

  @View({
    templateUrl: 'app/myApp.html'
  })
  class MyApp{
    constructor(){

    }
  }
```
API's for the View decorator: 
```javascript
@View({
	selector: '', // Used if your component name is not the same name as your class.
    template: '',
    templateUrl: '',
    restrict: '', //Defaults to "E"
    directives: ['ngModel', 'myApp'], //This relates to the angular directive's require property
    components: [MyOtherComponent, MyService] //List of components or sevices you need to register with the component.
})
```


In order to bootstrap our applications, which we have to now do manually since we are creating components/modules after angular's initial bootstrapping process. We just pull in the "bootstrap" function from the "component-ui/ui" module:
```javascript
  bootstrap('myApp', ['component.ui', '...Any other dependencies']);
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

```javascript
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
##
To setup a routable component, simply import the "Router" decorator from the "component-ui/router" module.
```javascript
 import {Router} from 'component-ui/router';
```

The current implementation for routing is using the ngRoute module. So our API for the Router decorator is as follows: 
```javascript
	@Router({
    	url: '#/myUrl'
        config: {
        	//whatever values you need in your route.
        }
    })
```
```javascript
  import {View} from 'component-ui/ui';
  import {Router} from 'component-ui/router';

  @View({
    templateUrl: 'app/pageOne.html'
  })
  @Router({
  	url: '/PageOne'
  })
  export class PageOne{
    constructor(){

    }
  }
```
Now that we've set up a routable component. We need to tell the entry component that we are going to be using this in our application.
```javascript
  import {View} from 'component-ui/ui';
  import {Customer} from 'directory/location/of/component'

  @View({
    templateUrl: 'app/myApp.html',
    components: [Customer]
  })
  class MyApp{
    constructor(){

    }
  }
```
Doing this will tell the module loader system, that this is a dependency in our application and needs to be loaded with our app.

### Service Decorator
##
The Service decorator creates an angular service, names it after the associated class, and then add the service to the "component.ui" module.
```javascript
  import {Service} from 'component-ui/ui';

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

```javascript
  import {View} from 'component-ui/ui';
  import {Router} from 'component-ui/router';
  import {MyService} from 'services/myService';

  @View({
    templateUrl: 'app/pageOne.html',
    components: [MyService]
  })
  @Router({
  	url: '/PageOne'
  })
  export class PageOne{
  	public customers;
    constructor(private MySerivce){
		this.customers = this.MyService.getCustomers();
    }
  }
```