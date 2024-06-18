import { service } from "./src/builder.js";
import { client, jsonBodyEncoder } from "./src/client.js";
import { ActionReturnType, actionHandler } from "./src/index.js";
//server
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
const _appHandler = actionHandler(app);
// Hono app handler
// ...
export type AppService = typeof app;


//client
const action = client<AppService>(new URL("/"))
const result = await action({
	method: "GET",
	action: "getUser",
	params: { id: "amy" },
	body: null,
})
if (result.ok) {
	const _json = (await result.result.json()) as ActionReturnType<AppService, "GET", "getUser">;
}
const result2 = await action({
	method: "POST",
	action: "postForm",
	params: { id: "amy" },
	requestInit: {
		headers: {
			"Content-Type": "application/json"
		},
	},
	body: { password: "password" },
	bodyEncoder: jsonBodyEncoder
})
if (result2.ok) {
	const _string = (await result2.result.text()) as ActionReturnType<AppService, "POST", "postForm">;
}
