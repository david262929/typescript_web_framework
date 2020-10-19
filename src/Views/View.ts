import { Model } from './../Models/User/Model';
import { User } from "./../Models/User";
import { Callback, List } from "../commons/type";

export abstract class View<T extends Model<K>, K> {
  regions: List<Element> = {};

  constructor(
    public parent: Element,
    public model: T,
  ){
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): List<string> {
    return {};
  };

  eventsMap(): List< Callback[] | Callback > {
    return {};
  };


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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap(); 
    Object.keys(regionsMap).forEach( (key: string): void => {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if(!element){
        return;
      }
      this.regions[key] = element
    });

  }

  onRender(): void {}

  render(): any{
    this.parent.innerHTML = ''

    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    
    this.bindEvents(templateElement.content) 
    this.mapRegions(templateElement.content)

    this.onRender()

    this.parent.append(templateElement.content)
  } 

}