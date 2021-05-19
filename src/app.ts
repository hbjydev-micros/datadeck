import 'dotenv/config';
import 'reflect-metadata';
import Koa, { Context } from "koa";
import Router from "@koa/router";
import koaStatic from "koa-static";
import nunjucks from "nunjucks";
import path from "path";
import bodyParser from "koa-bodyparser";
import authRouter from './routers/auth';
import userRouter from './routers/users';
import session from "koa-session";
import authMiddleware from "./middleware/auth";

const app = new Koa();
const router = new Router();

app.keys = [ process.env.APP_KEY ?? 'appkeyplschange' ];

const staticPath = path.join(path.dirname(__filename), "..", "dist", "static")
app.use(koaStatic(staticPath));

app.use(bodyParser());

app.use(session({
  key: 'datadeck.sess',
  maxAge: 86400000
}, app));

app.use(authMiddleware);

nunjucks.configure(path.join(__dirname, "..", "views"), {
  autoescape: true,
  watch: true,
});

router.get('/', (ctx: Context) => {
  ctx.body = nunjucks.render('index.html');
});

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
