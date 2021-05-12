import Koa from 'koa';
import Router from "@koa/router";

const registerRouter = (app: Koa, router: Router) => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}

export default registerRouter;