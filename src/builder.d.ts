import { Action, ActionMethods } from "./types.js";

type ServiceBuilder<T extends object> = {
    action<M extends ActionMethods, N extends string, A extends Action<any, any, any>>(
        method: M,
        actionName: N,
        actionCallback: A
    ): ServiceBuilder<T & { [P in `${M} ${N}`]: typeof actionCallback }>;
    build(): T;
}
export declare function service<T extends object>(obj?: T): ServiceBuilder<T>;