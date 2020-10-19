import { User } from './Models/User';
import {UserEdit} from './Views/UserEdit';

const root: HTMLElement | null = document.getElementById('root');

if(!root){
	throw new Error(`Can't find a root element`);
}

const userEdit = new UserEdit(
	root,
	User.buildUser({
		name: 'Davo',
		age: 20,
	})
)

userEdit.render();


// import { UserList } from './Views/UserList'
// import { UserProps } from './Models/User/types'
// import { User } from './Models/User'

// const root: HTMLElement | null = document.getElementById('root');

// if(!root){
// 	throw new Error(`Can't find a root element`);
// }

// (async (): Promise<void> => {
// 	const collection = User.buildUserCollection()
// 	await collection.fetch();
// 	new UserList(root, collection).render();
// })()
