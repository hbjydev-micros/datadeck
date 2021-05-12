import bcrypt from 'bcryptjs';
import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";

/**
 * The User model, representing a user in the database.
 * @class
 */
@Entity()
class User {
    /**
     * The user's snowflake
     */
    @PrimaryColumn('bigint')
    id!: string;

    /**
     * The user's first name
     */
    @Column({ name: 'firstName', length: '40' })
    @Length(40)
    firstName!: string;

    /**
     * The user's last name
     */
    @Column({ length: '40' })
    @Length(40)
    lastName!: string;

    /**
     * The user's email address. This is used to authenticate.
     */
    @Column()
    @IsEmail()
    email!: string;

    /**
     * The hashed password for the user.
     */
    @Column()
    passwordHash!: string;

    /**
     * The 2FA secret key used to generate codes for verification.
     */
    @Column()
    twoFactorSecret?: string;

    public hashPassword(password: string, salt = 10): void {
        this.passwordHash = bcrypt.hashSync(password, salt);
    }

    public checkPassword(candidate: string): boolean {
        return bcrypt.compareSync(candidate, this.passwordHash);
    }

    public checkTwoFactor(code: string): boolean {
        return true;
    }
};

export default User;