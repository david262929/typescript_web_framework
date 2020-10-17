import { List, Callback } from './../commons/type';
export class UserForm{

  constructor(
    public parent: Element
  ){}

  eventMap(): List<Callback[]>{
    return {
      'click:button': [this.onButtonClick],
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

  onButtonClick(): void {
    console.log('CLick')
  }

  template(): string{
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click Me</button>
      </div> 
    `
  } 

  render(): any{
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    
    this.bindEvents(templateElement.content); 

    this.parent.append(templateElement.content)
  } 
}