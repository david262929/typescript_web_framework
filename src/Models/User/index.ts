import { Attributes } from './Attributes';
import { Events } from './Events'
import { Sync } from './Sync';
import { UserProps } from './types'


export class User {
	public events: Events = new Events();
	public sync: Sync<UserProps> = new Sync<UserProps>();
	public attributes: Attributes<UserProps>;
	
	constructor (data: UserProps){
		this.attributes = new Attributes<UserProps>(data)
	}
}
