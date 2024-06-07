import { client, jsonBodyEncoder } from "./src/client.js";
import { ActionReturnType, _ActionParams } from "./src/types.js";
const handlers = {
    "GET getUser": async (p: { id: string }, _body: null, _req: Request) => {
        return {
            body: {
                user: {
                    id: p.id,
                    name: "Amy"
                }
            }
        };
    },
    "POST postForm": async (p: { id: string }, body: Record<string, string>) => {
        // if (!body.password || body.password != "password") return badRequestResponse();
        return {
            status: 200,
            statusText: "Ok",
            body: "Ok"
        };
    }
};
const action = client<typeof handlers>(new URL("/"))
const result = await action({
    method: "GET",
    action: "getUser",
    params: { id: "amy" },
    body: null,
})
if(result.ok) {const json = (await result.result.json()) as ActionReturnType<typeof handlers, "GET", "getUser">;}
const result2 = await action({
    method: "POST",
    action: "postForm",
    params: { id: "amy" },
    body: { password: "password" },
    bodyEncoder: jsonBodyEncoder
})
if(result2.ok) {const string = (await result2.result.text()) as ActionReturnType<typeof handlers, "POST", "postForm">;}