type Value = string | number;
type Data = Record<string, Value>;

interface initArg {
    id: string;
    title: string;
    fields: {
        [k: string]: {
            label: string;
            type: string;
            default: Value;
            size?: number;
            min?: number;
            max?: number;
        };
    };
    types?: {
        [k: string]: GM_configField;
    };
    css: string;
    events: {
        open?: () => void;
        save?: () => void;
    };
}

declare interface GM_configField {
    default: Value | null;
    configId?: string;
    settings?: {
        title: string;
        label: string;
    };
    value?: Value;
    id?: string;
    format?: string;
    wrapper?: Element;
    create?: typeof GM_configStruct.prototype.create;
    toNode: () => Element;
    toValue: () => Value | null;
    reset: () => void;
}

declare class GM_configStruct {
    init(...args: initArg[]): void;
    open(): void;
    save(): void;
    close(): void;
    set(name, val): void;
    get(name, getLive?): number | string;
    write(store, obj?): Data;
    read(store): Data | Record<string, never>;
    reset(): void;
    create(tag, attr: Record<string, Value | null | undefined>): Element;
    center(): void;
    remove(element): void;

    onOpen: () => void;
    onSave: () => void;
    onClose: () => void;
    onReset: () => void;
    id: string;
    fields: null;
    title: string;
    css: string;
    frame: Element;
}
declare const GM_config = new GM_configStruct();
