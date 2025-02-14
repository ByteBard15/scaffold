import {PersistenceManager} from "../db";
import {ObjectId} from "mongodb";
import CustomError, {ErrorType} from "../helpers/error";
import {JwtTokenPair} from "../helpers/token";

const TOKEN_COLLECTION = 'tokens'

export default class UserToken {

    private _id?: ObjectId
    private user_id: ObjectId
    private readonly access_token: string
    private refresh_token: string

    private constructor(access_token: string, refresh_token: string, user_id: ObjectId, id?: ObjectId) {
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.user_id = user_id
        this._id = id
    }

    private static get tokenCollection() {
        return PersistenceManager.instance.collection(TOKEN_COLLECTION)
    }

    async invalidate() {
        const result = await UserToken.tokenCollection.deleteOne({
            access_token: this.access_token,
        })
        return result.deletedCount !== 0
    }

    static async invalidate(user_id: ObjectId) {
        const result = await UserToken.tokenCollection.deleteMany({
            user_id,
        })
        return result.deletedCount !== 0
    }

    static create({ access_token, refresh_token }: JwtTokenPair, user_id: ObjectId) {
        return new UserToken(access_token, refresh_token, user_id)
    }

    async save() {
        const token = this.doc()
        try {
            const result = await UserToken.tokenCollection.insertOne(token)
            this._id = result.insertedId
            return this
        } catch (e: any) {
            throw CustomError.internalServerError(undefined, ErrorType.UNABLE_TO_INSERT_RECORD, e)
        }
    }

    static async findOne(token: string, key: 'access_token' | 'refresh_token'): Promise<UserToken> {
        const result = await UserToken.tokenCollection.findOne({
            [key]: token,
        })
        if (!result) {
            return null
        }
        return new UserToken(result.access_token, result.refresh_token, result._id)
    }

    doc() {
        return {
            user_id: this.user_id,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
        }
    }
}