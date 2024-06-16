import { describe, expect, it } from "vitest";
import { actionHandler } from "./handler.js";

describe("actioHandler test", () => {
    const handler = actionHandler({
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
        "POST postForm": async (_p: { id: string }, body: Record<string, string>) => {
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
        },
    });
    // TODO: Write more tests
    it("get", async () => {
        const params = new URLSearchParams({
            action: "getUser",
            id: "amy",
        });
        const result = await handler(new Request(new URL("/?" + params.toString(), "http://localhost:3000")));
        expect(result.status).toBe(200);
        const data = await result.json();
        expect(data).toStrictEqual({
            user: {
                id: "amy",
                name: "Amy"
            }
        });
    });
    it("post", async () => {
        const params = new URLSearchParams({
            action: "postForm",
            id: "test",
        });
        const result = await handler(new Request(new URL("/?" + params.toString(), "http://localhost:3000"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                password: "password"
            })
        }));
        expect(result.status).toBe(200);
    });
});

