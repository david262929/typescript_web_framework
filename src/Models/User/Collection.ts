import axios, { AxiosResponse } from "axios";
import { User } from ".";
import { Events } from "./Events";
import { Callback, UserProps } from "./types";

export class Collection<T, K>{
  models: T[] = [];
  events: Events = new Events();

  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
  ){}
  
  on(eventName: string, callback: Callback): Collection<T, K>{
		this.events.on(eventName, callback);
		return this;
	}

	trigger(eventName: string, ...params): Collection<T, K>{
		this.events.trigger( eventName, ...params );
		return this;
  }
  
  async fetch() {
    const {data} = await axios.get(`${this.rootUrl}/users`);
    data.forEach(
      (item: K) => this.models.push(
        this.deserialize(item)
      )
    )
    return this.models;
  }

}