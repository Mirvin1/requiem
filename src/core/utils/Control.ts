import EventEmitter from "./EventEmitter";

type Keybind = Record<string, string[]>;

type MacrosMap = {
    "RightClick": void,
    "LeftClick": void,
};

export default class Control {
    
    static readonly Macros = {
        RIGHT_CLICK: "RightClick",
        LEFT_CLICK: "LeftClick",
        MIDDLE_BUTTON: "MiddleButton",
    } as const;

    #buss: EventEmitter;

    #src: URL | null;

    #config: Keybind = { };

    constructor(src: URL | null = null, buss: EventEmitter) {
        this.#src = src;
        this.#buss = buss;

        this.setup();
        this.reload();
    }

    setup(): void {
        document.addEventListener('mousedown', function(event) {
            if (event.button === 0) {
                event.preventDefault();
            }
        }, false);
    
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        }, false);
    
        document.addEventListener('mousedown', function(event) {
            if (event.button === 1) {
                event.preventDefault();
            }
        }, false);
    }

    async reload() {
        if (!this.#src) return;
        Object.assign(this.#config, this.#fetchConfig(this.#src));
    }

    setSource(src: URL) {
        this.#src = src;
    }

    getSource(src: URL) {
        this.#src = src;
    }

    addKeybind(gameEvent: string, brourserEvent: string) {
        this.#config[gameEvent].push(brourserEvent);
    }

    /** Добавить сохранение в localstorage */
    removeKeybind(gameEvent: string, brourserEvent: string) {
        for (let i = 0; i < this.#config[gameEvent].length; i++) {
            if (this.#config[gameEvent][i] === brourserEvent) {
                delete this.#config[gameEvent][i];
            }
        }
    }

    async #fetchConfig(src: URL): Promise<Keybind> {
        try {
            const response = await fetch(src);
            if (!response.ok) {
                console.warn("Не удалось получить конфиг");
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка получения конфига', error);
            throw error;
        }
    }
}