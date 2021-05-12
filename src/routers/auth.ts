import Router from '@koa/router';
import AuthController from '../controllers/auth';

const router = new Router();
const controller = new AuthController();

router.get('/login', controller.loginView);
router.get('/2fa', controller.twoFactorView);

router.post('/login', controller.login);

export default router;