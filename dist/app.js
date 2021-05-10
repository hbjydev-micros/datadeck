"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const koa_static_1 = __importDefault(require("koa-static"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
const app = new koa_1.default();
const router = new router_1.default();
app.use(koa_static_1.default(path_1.default.join(__dirname, '..', 'static')));
nunjucks_1.default.configure(path_1.default.join(__dirname, '..', 'views'), {
    autoescape: true,
    watch: true
});
router.get('/', (ctx, next) => {
    ctx.body = nunjucks_1.default.render('index.html', { title: 'Home' });
});
app.use(router.routes());
app.use(router.allowedMethods());
exports.default = app;
