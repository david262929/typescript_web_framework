import { UserShow } from './UserShow';
import { UserProps } from './../Models/User/types'
import {CollectionView} from './CollectionView'
import {User} from '../Models/User'


export class UserList extends CollectionView<User, UserProps>{
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render()
  }
}