export interface ILog{
    log(...data: any[]): void
    warning(...data: any[]): void
    error(...data: any[]): void
}