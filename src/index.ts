import {UserProps} from './Models/User/types'
import {User} from './Models/User'

const userProps: UserProps = { 
    id: 6,
    name: 'Anun',
    age: 100,
}
const user = new User(userProps);
user.save();

user.events.on('test_test', () => {
    console.log('test_test test_test');
});

console.log(user);

user.events.trigger('test_test');

// console.log(user);

// console.log(user);
// console.log(user.get('name'));

// user.set({ age: 21 });

// user.set({
//     age: parseInt( user.get('age') ),
// })