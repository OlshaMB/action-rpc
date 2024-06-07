import { assert, describe, it } from "vitest";
import { isContentTypeJSON } from "./utils.js";
// import { parseContentType } from "./utils";
// test("basic parseContentType test", () => {
//     const result = parseContentType("text/html;charset=utf-8");
//     expect(result).toStrictEqual({
//         type: "text",
//         subtype: "html",
//         params: {
//             charset: "utf-8"
//         }
//     })
// })
// test("basic parseContentType performance test", () => {
//     const start = performance.now();
//     const result = parseContentType("text/html;charset=utf-8");
//     const end = performance.now();



//     expect(end - start).lessThan(0.05)
// })
describe("isContentTypeJSON test", ()=>{
    it("application/json", ()=>{
        assert(isContentTypeJSON("application/json"));
    });
    it("application/json; charset=UTF-8", ()=>{
        assert(isContentTypeJSON("application/json; charset=UTF-8"));
    });
    it("application/activity+json;", ()=>{
        assert(isContentTypeJSON("application/activity+json;"));
    });
    it("text/html", ()=>{
        assert(!isContentTypeJSON("text/html; application/json; charset=UTF-8"));
    });
});