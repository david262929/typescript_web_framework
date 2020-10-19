import { List } from "../commons/type";
import { User } from "../Models/User";
import { UserProps } from "../Models/User/types";
import { View } from "./View";
import {UserForm} from '../Views/UserForm';
import {UserShow} from '../Views/UserShow';


export class UserEdit extends View<User, UserProps>{
  regionsMap(): List<string> {
    return {
      userShow: '.user-show',
      userForm: '.user-form',
    };
  };


  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render()
    new UserForm(this.regions.userForm, this.model).render()
  }

  template(): string{
    return `
      <div>
      <div class="user-show"></div> 
      <div class="user-form"></div>
      </div> 
    `
  } 
}