import app from './app'
import envs from "./helpers/env";
import Logger from "./helpers/logger";
import {PersistenceManager} from "./db";

async function start() {
    try {
        await PersistenceManager.init()
        app.listen(envs.SERVER_PORT, () => {
            Logger.logger.log(`Server listening on port: ${envs.SERVER_PORT}`)
        })
    } catch (e: any) {
        Logger.logger.error('Failed to start server', e)
    }
}

start()