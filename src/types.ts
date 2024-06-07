// Maybe add body type somehow
export type Action<P extends Record<string, string>, B, R extends object | BodyInit> = (actionParams: P, body: B, request: Request) => Promise<ResponseInit & { body?: R }>;
export type ActionMethods = "GET" | "POST";
export type ActionReturnType<T, M extends ActionMethods, A extends string> = `${M} ${A}` extends keyof T ? T[`${M} ${A}`] extends Action<any, any, any> ? Awaited<ReturnType<T[`${M} ${A}`]>>["body"] : never : never
export type _ActionParams<T> = T[keyof T] extends Action<any, any, any>
  ? Parameters<T[keyof T]>
  : never;
export type _ActionReturnTypes<T> = T[keyof T] extends Action<any, any, any>
  ? ReturnType<T[keyof T]>
  : never;
export type _ActionKey = `${ActionMethods} ${string}`;
export type Actions<T> = {[K in keyof T]: K extends _ActionKey ? T[K] extends Action<any, any, any> ? T[K] : never : never};

// type ActionResult<T extends BodyInit> = 