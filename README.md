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



#### Creating Components
##

```javascript
  import {View} from 'component/ui';

  @View({
    templateUrl: 'app/myApp.html'
  })
  class MyApp{
    constructor(){

    }
  }
```

#### Bootstrapping an application
##
```javascript
 import {View, bootstrap} from 'component/ui';

  @View({
    templateUrl: 'app/myApp.html'
  })
  class MyApp{
    constructor(){

    }
  }
  
  bootstrap('myApp', ['component.ui', '...Any other dependencies']);
```

#### Creating a Component with a Route
##
```javascript
  import {View} from 'component/ui';
  import {Router} from 'component/router';

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

#### Creating Services
##
The Service decorator creates an angular service, names it after the associated class, and then add the service to the "component.ui" module.
```javascript
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

```javascript
  import {View} from 'component/ui';
  import {Router} from 'component/router';
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