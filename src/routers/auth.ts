import Router from '@koa/router';
import AuthController from '../controllers/auth';

const router = new Router();
const controller = new AuthController();

router.get('/login', ctx => controller.loginView(ctx));
router.get('/2fa', ctx => controller.twoFactorView(ctx));

router.post('/login', async ctx => await controller.login(ctx));

export default router;