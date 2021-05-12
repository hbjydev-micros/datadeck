import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";
import { snowflake } from "../app";
import User from "../models/user";

const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
    const user = new User();
    
    user.id = snowflake.getUniqueID() as string;
    user.firstName = 'Hayden';
    user.lastName = 'Young';
    user.email = 'hi@hbjy.dev';
    user.hashPassword('Password123!');
    ctx.user = user;
    
    if (ctx.cookies.get('auth') == null && ![ '/login', '/2fa' ].includes(ctx.path)) {
        return ctx.redirect('/login');
    }

    const token = (ctx.cookies.get('auth') as string);
    if (token == null) {
        return ctx.redirect('/login');
    }

    verify(token, process.env.APP_KEY ?? '');

    await next();
};

export default authMiddleware;