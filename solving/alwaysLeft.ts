import { Maze, Point } from "../src/Maze"

export default (maze: Maze): void => {
    let current = maze.start;
    let previous;
    let deadEnd = false;
    current.walked = true;
    const walked: Point[] = [];

    while (current != maze.end) {
        if (current.left && (current.left != previous || deadEnd)) {
            deadEnd = false;
            previous = current;
            walked.push(current);
            current = current.left;
            current.walked = true;
            checkBacktrack(walked);
            continue;
        }
        if (current.down && (current.down != previous || deadEnd)) {
            deadEnd = false;
            previous = current;
            walked.push(current);
            current = current.down;
            current.walked = true;
            checkBacktrack(walked);
            continue;
        }
        if (current.right && (current.right != previous || deadEnd)) {
            deadEnd = false;
            previous = current;
            walked.push(current);
            current = current.right;
            current.walked = true;
            checkBacktrack(walked);
            continue;
        }
        if (current.up && (current.up != previous || deadEnd)) {
            deadEnd = false;
            previous = current;
            walked.push(current);
            current = current.up;
            current.walked = true;
            checkBacktrack(walked);
            continue;
        }
        deadEnd = true;
    }
}

const checkBacktrack = (walked: Point[]): void => {
    if (new Set(walked).size !== walked.length) {
        fixBacktrack(walked);
    }
}

const fixBacktrack = (walked: Point[]): void => {
    walked[walked.length - 2].walked = false;
    walked.pop();
    walked.pop();
}