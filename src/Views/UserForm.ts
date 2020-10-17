import { User } from '../Models/User';
import { List, Callback } from './../commons/type';
export class UserForm{

  constructor(
    public parent: Element,
    public model: User,
  ){
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('update', () => {
      this.render()
    })
  }

  eventMap(): List<Callback[]>{
    return {
      'click:.set-name': [this.onSetNameClick],
      'click:.set-age': [this.onSetAgeClick],
      'mouseenter:h1': [this.onHeaderHover],
    }
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventMap();
    for (let eventKey in eventsMap){
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach( (element: HTMLElement) => {

        element.addEventListener(eventName, (...props) => {

          eventsMap[eventKey].forEach( (callback: Callback) => {
            callback(...props)
          })
        })
      })

    }
  }

  onHeaderHover(): void{
    console.log('Hooover')
  }

  onSetNameClick= (): void => {
    const input = this.parent.querySelector('input');
    const name = input.value;

    this.model.set({name})
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  template(): string{
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input />
        <button class="set-name">Set Name</button>
        <button class="set-age">Set Random Age</button>
      </div> 
    `
  } 

  render(): any{
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    
    this.bindEvents(templateElement.content); 

    this.parent.append(templateElement.content)
  } 
}