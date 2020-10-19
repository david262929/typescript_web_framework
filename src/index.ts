// // // import {UserProps} from './Models/User/types'
// // // import {User} from './Models/User'
// // // const userProps: UserProps = { 
// // //     id: 1,
// // //     name: 'Abugaga1',
// // //     age: 1000,
// // // }

// // // const user = User.buildUser(userProps)

// // // user.on('update', () => {
// // //     console.log(user,'updated2 ----- updated2');
// // // }).on('save', () => {
// // //     console.log(user,'save ----- savesavesavesave');
// // // }).on('error', (error) => {
// // //     console.error(error);
// // // });

// // // user.set({
// // //     age: 2000,
// // // })

// // // user.save();

// // // // console.log(user);

// // // // console.log(user);
// // // // console.log(user.get('name'));

// // // // user.set({ age: 21 });

// // // // user.set({
// // // //     age: parseInt( user.get('age') ),
// // // // })
// // import { User } from './Models/User';

// // (async () => {
// //     const collection = User.buildUserCollection();
// //     const models = await collection.fetch();
// //     console.log(models);
// // })()

// import { Callback, List } from "./commons/type";
// let events: List<Callback> = {};
// events = {
// 	'click:button': () => {},
// 	'hover:h1': () => {},
// }

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

console.log(userEdit)
