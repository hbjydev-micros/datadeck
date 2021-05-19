import User from "src/models/user";
import snowflake from "src/utilities/snowflake";
import {getRepository, MigrationInterface, QueryRunner, Table} from "typeorm";

export class initSchema1620775801604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'firstName',
                    type: 'varchar(40)',
                    isNullable: false
                },
                {
                    name: 'lastName',
                    type: 'varchar(40)',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'passwordHash',
                    type: 'varchar(60)',
                    isNullable: false
                },
                {
                    name: 'twoFactorSecret',
                    type: 'varchar(24)'
                }
            ]
        })); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
