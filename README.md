# action-rpc library
action-rpc is an rpc library made with typescript. It uses [action-rpc spec](./SPEC.md) to communicate.
## Server
First let's use the library to create a server
```ts
// Server code
const getUser = async (p: { id: string }, _body: null, _req: Request) => {
	return {
		body: {
			user: {
				id: p.id,
				name: "Amy"
			}
		}
	};
};
const postForm = async (_p: { id: string }, body: Record<string, string>) => {
	if (!body.password || body.password != "password") return {
		status: 400,
		statusText: "Bad request.",
		body: "Bad request."
	};
	return {
		status: 200,
		statusText: "Ok",
		body: "Ok"
	};
};
const app = service()
	.action("GET", "getUser", getUser)
	.action("POST", "postForm", postForm)
	.build();
const appHandler = actionHandler(app);
// Hono app handler
// ...
export type AppService = typeof app;
```
## Client
Then let's use service type declaration in a typed client:
```ts
import { client, jsonBodyEncoder } from "action-rpc/client";
import { ActionReturnType, _ActionParams } from "action-rpc";
import { AppService } from "./path/to/server.ts"
const action = client<typeof handlers>(new URL("your base url"))
const result = await action({
	method: "GET",
	action: "getUser",
	params: { id: "amy" },
	body: null,
});
if(result.ok) {
	// Here we use as because I didn't find any way to allow typed parsing of BodyInit
	const json = (await result.result.json()) as ActionReturnType<typeof handlers, "GET", "getUser">;
}
```