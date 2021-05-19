import { Context } from "koa";
import Model from "src/models/_model";
import Controller from "./_base";

abstract class ContentController extends Controller {
    public constructor(public model: typeof Model) {
        super();
    }

    public abstract showCreate(ctx: Context): void;
    public abstract showUpdate(ctx: Context): void;
    public abstract showList(ctx: Context): void;
    public abstract showView(ctx: Context): void;
}

export default ContentController;