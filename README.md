# MazeSolver
A collection of algorithms to solve mazes from an input image.

## About
Some example mazes are included in the repository. These were generated either by hand, or using the software [Daedalus](http://www.astrolog.org/labyrnth/daedalus.htm).

Mazes need to follow a couple of rules in order to be used by the program:

- Each pixel in the maze must be either black or white. White represents paths, black represents walls.
- All mazes are surrounded entirely by black walls.
- One white square exists on the top row of the image, and is the start of the maze.
- One white square exists on the bottom row of the image, and is the end of the maze.

## Examples
### Usage
```
tsc
node build/src/index.js tiny.png
```

![example](output/tiny.png)

## Notes
The code is not very efficient and big mazes will easily eat up all the RAM.