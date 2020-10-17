import axios, { AxiosResponse } from "axios";
import { User } from ".";
import { BASE_URL } from "../../commons/consts";
import { Events } from "./Events";
import { Callback, UserProps } from "./types";

export class Collection{
  models: User[] = [];
  events: Events = new Events();
  
  on(eventName: string, callback: Callback): Collection{
		this.events.on(eventName, callback);
		return this;
	}

	trigger(eventName: string, ...params): Collection{
		this.events.trigger( eventName, ...params );
		return this;
  }
  
  async fetch() {
    const {data} = await axios.get(`${BASE_URL}/users`);
    data.forEach(
      (item: UserProps) => this.models.push(
        User.buildUser(item)
      )
    )
    return this.models;
  }

}