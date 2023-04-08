import Jimp = require("jimp");
import Pixel from "./Pixel";
import { Maze } from "./Maze";
import alwaysLeft from "../solving/alwaysLeft";

const imgSize = 10;

console.log("Starting...")

Jimp.read("tiny.png", (err, img) => {
    // Read Image
    const bitmap = img.bitmap.data.toJSON().data
    const pixels: Pixel[] = [];
    for(let j = 0; j < bitmap.length; j+= Pixel.size) {
        const chunk = bitmap.slice(j, j + Pixel.size);
        pixels.push(new Pixel({ r: chunk[0], g: chunk[1], b: chunk[2], a: chunk[3] }))
    }
    const pixelsCount = pixels.length;
    
    // Load maze to memory
    const maze = new Maze(Maze.pixelsToCoords(pixels, 10));
    console.log(`Finished loading image to memory: ${performance.now()}`)

    // Solve
    alwaysLeft(maze)
    console.log(`Finished solving: ${performance.now()}`)

    // Save
    img.bitmap.data = Buffer.from(Pixel.toBufferStr(maze.toPixels(pixelsCount, 10)), "hex");
    img.write("abc.png")
});
