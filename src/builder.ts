import { Action, ActionMethods } from "./types.js";

export const service = <T extends object>(obj?: T) => {
    return {
        action<M extends ActionMethods, N extends string, A extends Action<any, any, any>>(
            method: M,
            actionName: N,
            actionCallback: A
        ) {
            return service({
                ...(obj ?? {}),
                [`${method} ${actionName}`]: actionCallback
            } as T & { [P in `${M} ${N}`]: typeof actionCallback });
        },
        build() {
            return obj!;
        }
    };
};