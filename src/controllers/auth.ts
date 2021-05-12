import { IsBoolean, IsEmail, MinLength, validate } from "class-validator";
import { Context } from "koa";
import { render } from "nunjucks";
import User from "../models/user";
import genToken from "../utilities/genToken";
import Controller from "./_base";

interface ILoginData {
    email: string;
    password: string;
    remember_me?: string | boolean;
}

class LoginData {
    @IsEmail({}, {
        message: 'Email field should be a valid email address.'
    })
    email!: string;

    @MinLength(8, {
        message: 'Password should be 8 characters at minimum.'
    })
    password!: string;

    @IsBoolean()
    remember!: boolean;
}

/**
 * Handles authentication for the Datadeck system.
 * @class
 */
class AuthController extends Controller {
    public loginView(ctx: Context): void {
        ctx.body = render('auth/login.html');
    }

    public twoFactorView(ctx: Context): void {
        ctx.body = render('auth/2fa.html');
    }

    /**
     * Handles exchanging a username and password for a session cookie.
     * @function
     */
    public async login(ctx: Context): Promise<void> {
        const body = (ctx.request.body as ILoginData)
        const data = new LoginData();

        data.email = body.email
        data.password = body.password;

        if (body.remember_me === undefined) {
            data.remember = false;
        } else if (body.remember_me === 'on') {
            data.remember = true;
        }

        try {
            const errors = await validate(data);
            if (errors.length > 0) {
                const validationErrors: { [key: string]: string } = {};
                for (const error of errors) {
                    if (error.constraints === undefined) continue;
                    Object.keys(error.constraints).forEach(e => {
                        if (error.constraints === undefined) return;
                        if (error.constraints[e] === undefined) return;

                        validationErrors[error.property] = error.constraints[e];
                    });
                }
                ctx.body = render('auth/login.html', { errors: validationErrors });
                return;
            }
        } catch(error) {
            ctx.body = render('auth/login.html');
            return;
        }

        const user = (ctx.user as User);
        if (user == null || user === undefined) {
            ctx.body = render('auth/login.html', { errors: {
                email: 'No user found with that email address'
            }, data: { email: data.email }});
            return;
        }

        if (!user.checkPassword(data.password)) {
            ctx.body = render('auth/login.html', { errors: {
                password: 'Password incorrect'
            }});
            return;
        }

        const { token } = genToken(user);

        ctx.cookies.set('auth', token);
        
        ctx.redirect('/');
    }
}

export default AuthController;
