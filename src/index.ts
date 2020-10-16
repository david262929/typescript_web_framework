import {UserProps} from './Models/User/types'
import {User} from './Models/User'

const userProps: UserProps = { 
    name: 'Test_name', 
    age: 20,
}
const user = new User(userProps);
