type EventHandler = (...args: any[]) => boolean | void;

interface EventHandlerInfo {
    handler: EventHandler;
    priority: number;
    cancelIgnore: boolean;
}

export default class EventEmitter {
    private events: { [eventName: string]: EventHandlerInfo[] } = {};

    on(eventName: string, handler: EventHandler, priority: number = 7, cancelIgnore: boolean = false): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push({ handler, priority, cancelIgnore });
        this.events[eventName].sort((a, b) => a.priority - b.priority); // Sort in ascending order
    }

    off(eventName: string, handler: EventHandler): void {
        if (!this.events[eventName]) return;
        this.events[eventName] = this.events[eventName].filter(entry => entry.handler !== handler);
    }

    emit(eventName: string, ...args: any[]): boolean {
        if (!this.events[eventName]) return true;
        for (const entry of this.events[eventName]) {
            if (!entry.cancelIgnore && entry.handler(...args) === false) {
                return false;
            }
        }
        return true;
    }
}