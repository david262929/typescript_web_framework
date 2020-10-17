import { Callback, List } from "../../commons/type"

export class Events {
	events: List<Callback[]> = {}

	on ( eventName: string, callback: Callback ): void {
		const callbacks = this.events[eventName] || []
		callbacks.push(callback)
		this.events[eventName] = callbacks
	}

	trigger ( eventName: string, ...params: any ): void {
		const callbacks = this.events[eventName] || []
		if( !callbacks.length ) {
			return;
		}
		callbacks.forEach( (callback: Callback): void => callback(...params))
	}
}