import { Action, ActionMethods } from "./types.js";

export declare function service<T extends object>(obj?: T): {
    action<M extends ActionMethods, N extends string, A extends Action<any, any, any>>(
        method: M,
        actionName: N,
        actionCallback: A
    ): T & { [P in `${M} ${N}`]: typeof actionCallback };
    build(): T;
};