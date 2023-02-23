import { ILog } from '../../client/assets/Scripts/Core/Log/ILog';
import { createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Options } from '../../client/assets/Scripts/Core/Options/Options';

const LOG = "info"
const WARN = "warn"
const ERROR = "error"

const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
);

const defaultOptions = {
    format: customFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
};

const logger = createLogger({
    format: customFormat,
    transports: [
        new DailyRotateFile({
            filename: "logs/info-%DATE%.log",
            level: LOG,
            ...defaultOptions,
        }),
        new DailyRotateFile({
            filename: "logs/error-%DATE%.log",
            level: ERROR,
            ...defaultOptions,
        }),
    ],
});



export class WinstonLogger implements ILog {
    log(...data: any[]): void {
        if (Options.inst.develop) {
            console.log(...data)
        }

        logger.log(LOG, data.join(' '))
    }

    warn(...data: any[]): void {
        if (Options.inst.develop) {
            console.warn(...data)
        }

        logger.warn(WARN, data.join(' '))
    }
    error(...data: any[]): void {
        if (Options.inst.develop) {
            console.error(...data)
        }

        logger.log(ERROR, data.join(' '))
    }
}