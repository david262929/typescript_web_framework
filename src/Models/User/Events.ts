import { Callback, UserEvents } from "./types"

export class Events {
	events: UserEvents = {}

	on ( eventName: string, callback: Callback ): void {
		const callbacks = this.events[eventName] || []
		callbacks.push(callback)
		this.events[eventName] = callbacks
	}

	trigger ( eventName: string ): void {
		const callbacks = this.events[eventName] || []
		if( !callbacks.length ) {
			return;
		}
		callbacks.forEach( (callback: Callback): void => callback())
	}
}