// // /(?<type>application|audio|image|message|multipart|text|video|x-[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)\/(?<subtype>[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)/i
// // /(?:(?<key>[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)=(?<value>[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+))/
// THIS HAS AN ERROR IN PARSING
// export const parseContentType = (unparsed: string) => {
//     const parts = unparsed.split(";");
//     const typePart = parts[0];
//     if (!typePart) return undefined;
//     const typePartRegexResult = /(?<type>application|audio|image|message|multipart|text|video|x-[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)\/(?<subtype>[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)/i
//         .exec(typePart)?.groups
//     if (!typePartRegexResult || !typePartRegexResult.type || !typePartRegexResult.subtype) return undefined;
//     // TODO: Params parsing
//     const params: [string, string][] = []
//     const paramParts = parts.slice(1,)
//     for (const part of paramParts) {
//         const partParsed = /(?<key>[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)=(?<value>[^ \x00-\x1F\x7F()<>@,;:\\\"\/\[\]?.=]+)/.exec(part)?.groups;
//         if (!partParsed || !partParsed.key || !partParsed.value) continue;
//         params.push([
//             partParsed.key,
//             partParsed.value
//         ] as const)
//     }
//     return {
//         type: typePartRegexResult.type.toLowerCase(),
//         subtype: typePartRegexResult.subtype.toLowerCase(),
//         params: Object.fromEntries(params)
//     };
// }
export const notFoundResponse = () => new Response("Not found.", {
    statusText: "Not found.",
    status: 404
});
export const badRequestResponse = () => new Response("Bad request.", {
    statusText: "Bad request.",
    status: 400
});
export const isContentTypeJSON = (contentType: string) => {
    // TODO: Improve regex
    return /^application\/[^ ]*json/i.test(contentType);
};