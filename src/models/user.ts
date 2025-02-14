import {PersistenceManager} from "../db";
import {ObjectId} from "mongodb";
import CustomError, {ErrorType} from "../helpers/error";

const USER_COLLECTION = 'users'

export default class User {

    private _id?: ObjectId
    private readonly _email: string
    private _password: string

    private constructor(email: string, password: string, id?: ObjectId) {
        this._email = email
        this._password = password
        this._id = id
    }

    private static get userCollection() {
        return PersistenceManager.instance.collection(USER_COLLECTION)
    }

    static create(email: string, password: string): User {
        return new User(email, password)
    }

    async save() {
        const user = this.doc()
        try {
            const result = await User.userCollection.insertOne(user)
            this._id = result.insertedId
            return this
        } catch (e: any) {
            throw CustomError.internalServerError(undefined, ErrorType.UNABLE_TO_INSERT_RECORD, e)
        }
    }

    async update() {
        if (!this._id) {
            throw CustomError.internalServerError(undefined, ErrorType.UNABLE_TO_INSERT_RECORD)
        }
        try {
            await User.userCollection.updateOne({
                _id: this._id,
            }, {
                $set: {
                    password: this._password,
                }
            })
            return this
        } catch (e: any) {
            console.log(e.message)
            throw CustomError.internalServerError(undefined, ErrorType.UNABLE_TO_INSERT_RECORD, e)
        }
    }

    set password(password: string) {
        this._password = password
    }

    get password() {
        return this._password
    }

    static async findOne(email: string): Promise<User | null> {
        const result = await User.userCollection.findOne({
            email,
        })
        if (!result) {
            return null
        }
        return new User(result.email, result.password, result._id)
    }

    get id() {
        return this._id
    }

    get email() {
        return this._email
    }

    doc() {
        return {
            email: this._email,
            password: this._password,
        }
    }
}