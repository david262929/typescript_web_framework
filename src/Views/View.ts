import { Model } from './../Models/User/Model';
import { User } from "./../Models/User";
import { Callback, List } from "../commons/type";

export abstract class View<T extends Model<K>, K> {
  constructor(
    public parent: Element,
    public model: T,
  ){
    this.bindModel();
  }

  abstract eventsMap(): List< Callback[] | Callback >;
  abstract template(): string;

  bindModel(): void {
    this.model.on('update', () => {
      this.render()
    })
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap){
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach( element => {

        element.addEventListener(eventName, (...props) => {

          let callbacksArray: Callback[] | Callback = eventsMap[eventKey];

          if( !Array.isArray(callbacksArray) ){
            callbacksArray = [callbacksArray] 
          }

          callbacksArray.forEach( (callback: Callback) => {
            callback(...props)
          })
          
        })
      })

    }
  }

  render(): any{
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    
    this.bindEvents(templateElement.content); 

    this.parent.append(templateElement.content)
  } 

}