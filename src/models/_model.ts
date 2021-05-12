import { BaseEntity, PrimaryColumn } from "typeorm";
import { snowflake } from "../app";

/**
 * The base class for database models.
 * @class
 */
class Model extends BaseEntity {
    /**
     * The model snowflake ID
     */
    @PrimaryColumn('bigint', { default: snowflake.getUniqueID() })
    id!: string;
}

export default Model;
