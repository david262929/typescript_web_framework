import { Model } from './Model';
import { Attributes } from './Attributes';
import { Events } from './Events'
import { ApiSync } from './ApiSync';
import { UserProps } from './types'


export class User extends Model<UserProps> {
	static buildUser(attrs: UserProps): User{
		return new User(
			new Attributes<UserProps>(attrs),
			new Events(),
			new ApiSync<UserProps>(),
		)
	}
}

