///<reference path="../typings/tsd.d.ts" />
angular.module('component.ui', ['component.ui.directives','component.ui.components', 'component.ui.services']);
import { ViewAnnotation as View } from 'annotations/viewAnnotation';
import { DirectiveAnnotation as Directive } from 'annotations/directiveAnnotation';
import { bootstrap } from 'annotations/bootstrapper';
import { ServiceAnnotation as Service} from 'annotations/serviceAnnotation';

export {View, Directive, bootstrap, Service}