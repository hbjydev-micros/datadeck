import { BaseEntity, PrimaryColumn } from "typeorm";
import snowflake from "../utilities/snowflake";

/**
 * The base class for database models.
 * @class
 */
class Model extends BaseEntity {
    /**
     * The model's snowflake
     */
    @PrimaryColumn('bigint', { default: `${snowflake.getUniqueID()}` })
    id!: string;
}

export default Model;
