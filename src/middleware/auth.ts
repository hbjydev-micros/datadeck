import { Context, Next } from "koa";

const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
    if (ctx.session === null || ctx.session === undefined) return ctx.redirect('/login');
    if (ctx.session.user === null || ctx.session.user === null) return ctx.redirect('/login');

    await next();
};

export default authMiddleware;