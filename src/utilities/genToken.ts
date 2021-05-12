import jwt from 'jsonwebtoken';
import User from "../models/user";

interface TokenData {
    token: string;
    expiresIn: number;
}

interface UserTokenData {
    uid: string;
}

const genToken = (user: User): TokenData => {
    const expiresIn = 60 * 60; // 1 hour
    const secret = process.env.APP_KEY!!;
    const data: UserTokenData = {
        uid: user.id
    };

    return {
        expiresIn,
        token: jwt.sign(data, secret, { expiresIn })
    };
};

export default genToken;