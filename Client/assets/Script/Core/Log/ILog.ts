export interface ILog{
    debug(s: string): void
    warning(s: string): void
    error(s: string): void
}