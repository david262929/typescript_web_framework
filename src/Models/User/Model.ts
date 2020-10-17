import { ApiSync } from './ApiSync';
import { Events } from './Events';
import { Attributes } from './Attributes';
import { AxiosResponse } from "axios";
import { Callback } from "../../commons/type";

export interface ModelType<T> {
	on(eventName: string, callback: Callback): Model<T>;
	trigger(eventName: string, ...params): Model<T>;
	get<K extends keyof T>(propName: K): T[K];
	set(update: T): Model<T>;
	fetch(): Promise<Model<T>>;
	save(): Promise<Model<T>>;
}

export class Model<T>  {
  constructor(
    private attributes: Attributes<T>,
    private events: Events,
    private sync: ApiSync<T>,
  ) {}

  on(eventName: string, callback: Callback): Model<T>{
		this.events.on(eventName, callback);
		return this;
	}

	trigger(eventName: string, ...params): Model<T>{
		this.events.trigger( eventName, ...params );
		return this;
	}

	get<K extends keyof T>(propName: K): T[K]{
		return this.attributes.get(propName);
	}

	set(update: T): Model<T>{
		this.attributes.set(update);
		this.trigger('update');
		return this;
	}

	async fetch(): Promise<Model<T>>{
		const id = this.get('id');
		
		if( !id ){
			return this.trigger('error', new Error('Cannot fetch without an id.'));
		}

		const { data }: AxiosResponse<any> = await this.sync.fetch(id);
		this.set(data)
		return this;
	}

	async save(): Promise<Model<T>>{
		const data: T = this.attributes.getAll();
		
		try{
			await this.sync.save(data);
			return this.trigger('save');
		}catch(e){
			return this.trigger('error', e);
		}
	}
}