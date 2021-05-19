import { Context } from "koa";
import { render } from "nunjucks";
import User from "../models/user";
import { IField } from "../utilities/viewTypes";
import ContentController from "./_contentBase";

class UsersController extends ContentController {
    public constructor() {
        super(User);
    }

    public showCreate(ctx: Context): void {
        const title = 'Create a new user';
        const action = '/users';

        const fields: IField[] = [
          {
            name: "username",
            type: "text",
            label: "Username",
          },
          {
            name: "email",
            type: "email",
            label: "E-mail Address",
          },
          {
            name: "password",
            type: "password",
            label: "Password",
          },
        ];

        ctx.body = render('form.html', { title, action, fields });
    }

    public showUpdate(ctx: Context): void {
        throw new Error("Method not implemented.");
    }

    public showList(ctx: Context): void {
        throw new Error("Method not implemented.");
    }

    public showView(ctx: Context): void {
        throw new Error("Method not implemented.");
    }
}

export default UsersController;