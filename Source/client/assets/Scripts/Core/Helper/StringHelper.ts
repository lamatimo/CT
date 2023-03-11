export { }

declare global {
    interface String {
        getHashCode(): number;
        mode(mode: number): number;
    }
}

String.prototype.getHashCode = function (): number {
    let self: string = this;

    let hash = 0;
    for (let i = 0; i < self.length; i++) {
        hash = ((hash << 5) - hash) + self.charCodeAt(i);
        hash &= hash;
    }
    return Math.abs(hash);
};

String.prototype.mode = function (mode: number): number {
    let self: string = this;

    if (mode <= 0) {
        throw new Error(`string mode < 0: ${self} ${mode}`);
    }

    return self.getHashCode() % mode;
};

