export class RandomGenerator {
    /**
     * 随机整数 [min, max]
     * @param min 
     * @param max 
     * @returns 
     */
    public static RandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}