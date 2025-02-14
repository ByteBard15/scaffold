import {Writable} from "node:stream";

export default class Logger {
    private stream: Writable
    static logger = new Logger()
    constructor(stream: Writable = process.stdout) {
        this.stream = stream
    }

    private parse(args: any) {
        return JSON.stringify(args, null, 2)
    }

    log(message: string, ...args: any[]) {
        this.info(message, args)
    }

    info(message: string, ...args: any[]) {
        this.stream.write(`[INFO] (${new Date().toISOString()}) ${message}, ${this.parse(args)}\n`)
    }

    error(message: string, ...args: any[]) {
        this.stream.write(`[ERROR] (${new Date().toISOString()}) ${message}, ${this.parse(args)}\n`)
    }
}