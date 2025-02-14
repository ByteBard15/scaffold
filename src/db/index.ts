import {Db, MongoClient} from "mongodb";
import { mongo_db_config } from "../helpers/env";
import CustomError, {ErrorType} from "../helpers/error";

export class PersistenceManager {
    private static _instance: PersistenceManager;
    private client: MongoClient | undefined;
    private db: Db | undefined;

    private constructor(client: MongoClient, db: Db) {
        this.db = db;
        this.client = client;
    }

    close() {
        this.db = undefined;
        return this.client?.close();
    }

    static async init() {
        if (PersistenceManager._instance) {
            return;
        }
        const client = new MongoClient(mongo_db_config.uri());
        await client.connect();

        const db = client.db(mongo_db_config.name);
        const manager = new PersistenceManager(client, db);
        PersistenceManager._instance = manager;
        return manager;
    }

    static get instance() {
        if (!PersistenceManager._instance) {
            throw CustomError.internalServerError(undefined, ErrorType.DATABASE_NOT_INITIALIZED)
        }
        return PersistenceManager._instance
    }

    collection(name: string) {
        return this.db.collection(name)
    }
}

