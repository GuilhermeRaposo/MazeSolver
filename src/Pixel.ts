import { convertRgbToHex, convertHexToRgb } from '@mdhnpm/rgb-hex-converter';

enum ColorNames {
    Black = "00000000",
    White = "ffffffff"
}

interface Color {
    r: number, g: number, b: number, a: number
}

export default class Pixel {
    public static size = 4;
    private color: Color;

    constructor(color: Color) {
        this.color = color;
    }

    public setColor = (color: string): void => {
        let rgb = convertHexToRgb(color)
        this.color = Pixel.arrayToColor(rgb)
    }

    public toHex = (): string => convertRgbToHex(this.color.r, this.color.g, this.color.b) + "ff";

    public isPath = (): boolean => this.toHex() == ColorNames.White;

    public static arrayToColor = (color: number[]): Color => {
        return {
            r: color[0], g: color[1], b: color[2], a: color[3]
        }
    }

    public static toBufferStr = (pixels: Pixel[]): string => {
        let bufferStr = "";
        pixels.forEach(pixel => bufferStr+= pixel.toHex());
        return bufferStr;
    }
}