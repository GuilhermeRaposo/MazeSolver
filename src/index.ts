import Jimp = require("jimp");
import Pixel from "./Pixel";
import { Maze } from "./Maze";
import AlwaysLeft from "../solving/alwaysLeft";

const imgSize = 10;

console.log("Starting...")

Jimp.read("./examples/normal.png", (err, img) => {
    // Read Image
    const bitmap = img.bitmap.data.toJSON().data
    const pixels: Pixel[] = [];
    for(let j = 0; j < bitmap.length; j+= Pixel.size) {
        const chunk = bitmap.slice(j, j + Pixel.size);
        pixels.push(new Pixel({ r: chunk[0], g: chunk[1], b: chunk[2], a: chunk[3] }))
    }
    const pixelsCount = pixels.length;
    
    // Load maze to memory
    const maze = new Maze(Maze.pixelsToCoords(pixels, img.bitmap.width));
    console.log(`Finished loading image to memory: ${performance.now()}`)

    // Solve
    new AlwaysLeft(maze)
    console.log(`Finished solving: ${performance.now()}`)

    // Save
    img.bitmap.data = Buffer.from(Pixel.toBufferStr(maze.toPixels(pixelsCount, img.bitmap.width)), "hex");
    img.write("abc.png")
});
