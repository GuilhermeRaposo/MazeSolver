import Jimp = require("jimp");
import Pixel from "./Pixel";
import { Maze } from "./Maze";
import AlwaysLeft from "../solving/alwaysLeft";
import fs from "fs";

console.log("Starting...")

// Read path
process.argv = process.argv.slice(2);
const fileName = process.argv[0];
let fullPath = "";
console.log(`./examples/${fileName}`)
if (fs.existsSync(`./examples/${fileName}`)) {
    fullPath = `./examples/${fileName}`;
}
else if (fs.existsSync(fileName)){
    fullPath = fileName;
}
else {
    console.log("File not found in either the root path or examples folder");
    process.exit(1)
}

Jimp.read(fullPath, (err, img) => {
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
    img.write(`./output/${fileName}`)
});
