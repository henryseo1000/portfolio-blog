export interface Point {
    x: number;
    y: number;
    fixedY:number;
    cur: number;
}

export interface Wave {
    index: number;
    totalPoints: number;
    color: string;
    points: Point[];
    pointGap: number;
}