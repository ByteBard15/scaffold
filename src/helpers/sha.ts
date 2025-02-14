import * as bcrypt from "bcrypt";
import {bcrypt_salt_rounds} from "./env";

export function hash(data: string, rounds: number = bcrypt_salt_rounds): Promise<string> {
    return bcrypt.hash(data, rounds)
}

export async function compare(data?: string, hash?: string): Promise<boolean> {
    if (!data || !hash) {
        return false
    }
    return bcrypt.compare(data, hash)
}