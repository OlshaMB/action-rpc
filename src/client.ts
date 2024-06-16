import type { Action, ActionMethods, Actions, _ActionParams } from "./types.js";
type _BodyType<T, M extends ActionMethods, A extends string> = `${M} ${A}` extends keyof T ? T[`${M} ${A}`] extends Action<any, any, any> ? Parameters<T[`${M} ${A}`]>[1] : never : never;
type BodyEncoder = (body: unknown) => Promise<BodyInit>;
export const jsonBodyEncoder: BodyEncoder = async (body) => JSON.stringify(body);
export const client =
    <T extends Actions<object>>(baseUrl: URL) =>
        async <M extends ActionMethods, A extends string>({ method, action, params, body, requestInit, bodyEncoder }: {
            method: M,
            action: `${M} ${A}` extends keyof T ? A : never,
            params: `${M} ${A}` extends keyof T ? T[`${M} ${A}`] extends Action<any, any, any> ? Parameters<T[`${M} ${A}`]>[0] : never : never,
            body: _BodyType<T, M, A>,
            requestInit?: RequestInit,
            bodyEncoder?: BodyEncoder,
        }) => {
            const url = new URL(baseUrl);
            for (const key in params) {
                url.searchParams.set(key, params[key]);
            }
            url.searchParams.set("action", action);
            let response: Response;
            try {
                response = await fetch(url, {
                    ...requestInit,
                    method: method,
                    body: body ? bodyEncoder ? await bodyEncoder(body) : await jsonBodyEncoder(body) : undefined,
                });
                return {
                    ok: true,
                    result: response
                } as const;
            } catch (e) {
                return {
                    ok: false,
                    error: e
                } as const;
            }
        };

