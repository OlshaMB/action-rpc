import { assert, beforeEach, describe, expect, it, vi } from "vitest";
import { client } from "./client.js";

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
};

global.fetch = vi.fn()
const action = client<typeof handlers>(new URL("http://localhost/"))
describe("client test", () => {
    beforeEach(() => {
        //@ts-ignore
        global.fetch.mockReset()
    })
    it("getUser", async () => {
        const params = new URLSearchParams({
            id: "amy",
            action: "getUser",
        });
        //@ts-ignore
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({
                user: {
                    id: "amy",
                    name: "Amy"
                }
            })
        });
        const result = await action({
            method: "GET",
            action: "getUser",
            params: { id: "amy" },
            body: null,
        })
        //@ts-ignore
        expect(fetch).toHaveBeenCalledWith(new URL("http://localhost/?" + params.toString()), {
            method: "GET",
            body: undefined
        })
        assert(result.ok, "failed to get user: result is not ok");
        assert(!result.error, "failed to get user: error is not null")
        const data = await result.result.json();
        expect(data).toStrictEqual({
            user: {
                id: "amy",
                name: "Amy"
            }
        });
    });
    it("postForm", async () => {
        const params = new URLSearchParams({
            id: "test",
            action: "postForm",
        });
        //@ts-ignore
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
        });
        const result = await action({
            method: "POST",
            action: "postForm",
            params: { id: "test" },
            requestInit: {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            },
            body: {
                password: "password"
            }
        })

        //@ts-ignore
        expect(fetch).toHaveBeenCalledWith(new URL("http://localhost/?" + params.toString()), {
            method: "POST",
            body: JSON.stringify({
                password: "password"
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        assert(result.ok, "failed to post form: result is not ok");
        assert(!result.error, "failed to post form: error is not null")
    });

})

