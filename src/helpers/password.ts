import * as bcrypt from 'bcrypt'

let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export function validatePassword(password: string): boolean {
    return regex.test(password)
}