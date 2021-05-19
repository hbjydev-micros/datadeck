import Router from '@koa/router';
import UsersController from '../controllers/users';

const router = new Router();
const controller = new UsersController();

router.get('/users/new', ctx => controller.showCreate(ctx));

export default router;