export interface IDataFrame {
    frameId: number;
    frameAttempts: number[];
    frameScore: number;
    partialScore: number;
    isStrike: boolean;
    isSpare: boolean;
}