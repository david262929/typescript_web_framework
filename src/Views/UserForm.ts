import { UserProps } from './../Models/User/types';
import { User } from '../Models/User';
import { List, Callback } from './../commons/type';
import { View } from './View';

export class UserForm extends View<User, UserProps>{
  eventsMap(): List< Callback[] | Callback >{
    return {
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveModelClick,
      'click:.set-age': this.onSetAgeClick,
      'mouseenter:h1': this.onHeaderHover,
    }
  }

  onHeaderHover(): void{
    console.log('Hooover')
  }

  onSetNameClick= (): void => {
    const input: HTMLInputElement | null = this.parent.querySelector('input');
    if(!input){
      return;
    }

    const name = input.value;

    this.model.set({name})
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSaveModelClick = (): void => {
    this.model.save();
  }

  template(): string{
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="set-name">Set Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save Model</button>
      </div> 
    `
  } 
}