import Koa from "koa";
import Router from "@koa/router";
import koaStatic from "koa-static";
import nunjucks from "nunjucks";
import path from "path";

const app = new Koa();
const router = new Router();

app.use(koaStatic(path.join(__dirname, "..", "static")));

nunjucks.configure(path.join(__dirname, "..", "views"), {
  autoescape: true,
  watch: true,
});

router.get("/", (ctx, next) => {
  ctx.body = nunjucks.render("index.html", { title: "Home" });
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
