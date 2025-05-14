import { compareSync, hashSync } from 'bcrypt-ts';
import dotenv from 'dotenv';
import { randomBytes } from 'node:crypto';

dotenv.config();

export class Encrypter {
    static saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

    static hashPassword(password: string) {
        return hashSync(password, this.saltRounds);
    }

    static async comparePassword(
        password: string,
        hash: string,
    ) {
        return compareSync(password, hash);
    }

    static async mailTokenGenerate(length=56) {
        return Buffer.from(randomBytes(length)).toString('hex');
    }
}
