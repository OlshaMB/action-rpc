import { ActionMethods, Actions } from "./types.js";
import { badRequestResponse, isContentTypeJSON, notFoundResponse } from "./utils.js";

export const actionHandler =
    <T>(actions: Actions<T>) =>
        async (request: Request) => {
            const url = new URL(request.url);
            const actionName = url.searchParams.get("action");
            if (!actionName) return notFoundResponse();
            const action = actions[`${request.method as ActionMethods} ${actionName}` as keyof Actions<T>];
            if (!action) return notFoundResponse();
            let body: unknown = {};
            const contentType = request.headers.get("Content-Type");
            if (contentType) {
                if (isContentTypeJSON(contentType)) {
                    try {
                        body = await request.json();
                    } catch (_error) {
                        return badRequestResponse();
                    }
                }
            }
            const { body: responseBody, ...responseInit } = await action(Object.fromEntries(url.searchParams.entries()), body, request);
            let encodedResponseBody: BodyInit
            if (
                typeof responseBody == "object" &&
                !(
                    responseBody instanceof ReadableStream ||
                    responseBody instanceof Blob ||
                    responseBody instanceof ArrayBuffer ||
                    responseBody.buffer instanceof ArrayBuffer ||
                    // responseBody.buffer instanceof SharedArrayBuffer ||
                    responseBody instanceof FormData ||
                    responseBody instanceof URLSearchParams
                )
            ) {
                encodedResponseBody = JSON.stringify(responseBody)
            } else {
                encodedResponseBody = responseBody
            }
            return new Response(encodedResponseBody, responseInit)
        };