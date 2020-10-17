import {UserProps} from './Models/User/types'
import {User} from './Models/User'

const userProps: UserProps = { 
    name: 'Abugaga',
    age: 1000,
}
const user = new User(userProps);

user.on('update', () => {
    console.log(user,'updated2 ----- updated2');
}).on('save', () => {
    console.log(user,'save ----- savesavesavesave');
}).on('error', (error) => {
    console.error(error);
});

user.set({
    age: 2000,
})

user.save();

// console.log(user);

// console.log(user);
// console.log(user.get('name'));

// user.set({ age: 21 });

// user.set({
//     age: parseInt( user.get('age') ),
// })