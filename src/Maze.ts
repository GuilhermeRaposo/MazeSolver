import Pixel from "./Pixel";

/**
 * Represents the coordinates of a pixel that is a path (not a wall)
 */
interface Coordinates {
    x: number, y: number;
}

class Wall {
    public coords: Coordinates = { x: -1, y: -1 };
}

export class Point {
    public coords: Coordinates = { x: -1, y: -1 };

    // Represents if there's another path for each of the four directions of the point
    public left?: Point;
    public up?: Point;
    public right?: Point;
    public down?: Point;

    public walked: boolean = false;
}

export class Maze {
    public start: Point;
    public end: Point;
    public points: Point[];

    constructor(coords: Coordinates[]) {
        // Link all points starting from the start
        const points = this.linkPath(coords);
        this.start = points[0];
        this.end = points[ points.length - 1 ];
        this.points = points;
    }

    public linkPath(coords: Coordinates[]): Point[] {
        const points: Point[] = [];
        coords.forEach(coord => {
            points.push({ coords: coord, walked: false })
        })

        points.forEach(point => {
            point.left = points.find(p => p.coords.x === point.coords.x - 1 && p.coords.y === point.coords.y);
            point.up = points.find(p => p.coords.y === point.coords.y - 1 && p.coords.x === point.coords.x);
            point.right = points.find(p => p.coords.x === point.coords.x + 1 && p.coords.y === point.coords.y);
            point.down = points.find(p => p.coords.y === point.coords.y + 1 && p.coords.x === point.coords.x);
        })

        return points;
    }

    public static pixelsToCoords(pixels: Pixel[], xSize: number): Coordinates[] {
        const coords: Coordinates[] = []

        for (let i = 0, xValue = 0, yValue = 0; i < pixels.length; ++i, ++xValue) {
            if (xValue == xSize) {
                xValue = 0;
                ++yValue;
            }
            if (pixels[i].isPath()) {
                coords.push({ x: xValue, y: yValue });
            }
        }
        
        return coords;
    }

    public toPixels(pixelsCount: number, xSize: number): Pixel[] {
        const pixels: Pixel[] = [];

        let xValue = 0;
        let yValue = 0;
        for (let i = 0; i < pixelsCount; ++i, ++xValue) {
            if (xValue == xSize) {
                xValue = 0;
                ++yValue;
            }
            const point = this.points.find(point => point.coords.x === xValue && point.coords.y === yValue);
            if (point) {
                if (point.walked) {
                    pixels.push(new Pixel({ r: 255, g: 0, b: 0, a: 255 }))
                }
                else {
                    pixels.push(new Pixel({ r: 255, g: 255, b: 255, a: 255 }))
                }
            }
            else {
                pixels.push(new Pixel({ r: 0, g: 0, b: 0, a: 255 }))
            }
        }
        // console.log(pixels)
        return pixels;
    }
}