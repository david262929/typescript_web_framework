import { 
    Callback,
    UserEvents,
    UserProps,
    UserPropsNonMandatory,
} from './types'

export class User {
    events: UserEvents = {}

    constructor(private data: UserProps) {}
    get (propName: string): (number | string) {
        return this.data[propName]
    }

    set (update: UserPropsNonMandatory): void {
        Object.assign(this.data, update);
    }

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
