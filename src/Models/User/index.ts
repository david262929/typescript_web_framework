import { AxiosPromise, AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Events } from './Events'
import { Sync } from './Sync';
import { Callback, UserProps } from './types'


export class User {
	public events: Events = new Events();
	public sync: Sync<UserProps> = new Sync<UserProps>();
	public attributes: Attributes<UserProps>;
	
	constructor (data: UserProps){
		this.attributes = new Attributes<UserProps>(data)
	}

	on(eventName: string, callback: Callback): User{
		this.events.on(eventName, callback);
		return this;
	}

	trigger(eventName: string, ...params): User{
		this.events.trigger( eventName, ...params );
		return this;
	}

	get<K extends keyof UserProps>(propName: K): UserProps[K]{
		return this.attributes.get(propName);
	}

	set(update: UserProps): User{
		this.attributes.set(update);
		this.trigger('update');
		return this;
	}

	async fetch(): Promise<User>{
		const id = this.get('id');
		
		if( !id ){
			return this.trigger('error', new Error('Cannot fetch without an id.'));
		}

		const { data }: AxiosResponse<any> = await this.sync.fetch(id);
		this.set(data)
		return this;
	}

	async save(): Promise<User>{
		const data: UserProps = this.attributes.getAll();
		
		try{
			await this.sync.save(data);
			return this.trigger('save');
		}catch(e){
			return this.trigger('error', e);
		}
	}
}
