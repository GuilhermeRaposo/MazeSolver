import { Maze, Point } from "../Maze"

export default class AlwaysLeft {
    private maze: Maze;
    private current: Point
    private previous: Point | null = null;
    private walked: Point[] = [];
    private badPaths: Point[] = [];

    constructor(maze: Maze){
        this.maze = maze;
        this.current = maze.start;
        this.walked.push(this.current);
        this.start(maze);
    }

    public start = (maze: Maze): void => {   
        while (this.current != maze.end) {
            if (this.current.left && this.current.left != this.previous && !this.badPaths.includes(this.current.left)) {
                this.move(this.current.left);
            } 
            else if (this.current.down && this.current.down != this.previous && !this.badPaths.includes(this.current.down)) {
                this.move(this.current.down);
            } 
            else if (this.current.right && this.current.right != this.previous && !this.badPaths.includes(this.current.right)) {
                this.move(this.current.right);
            } 
            else if (this.current.up && this.current.up != this.previous && !this.badPaths.includes(this.current.up)) {
                this.move(this.current.up);
            }
            else {
                if (this.current.left == this.previous) this.backtrackAndBarricade(Direction.left);
                else if (this.current.down == this.previous) this.backtrackAndBarricade(Direction.down);
                else if (this.current.right == this.previous) this.backtrackAndBarricade(Direction.right);
                else if (this.current.up == this.previous) this.backtrackAndBarricade(Direction.up);
            }
        }

        this.paintWalked();
    }

    private paintWalked = () => {
        this.maze.points.forEach(point => {
            if (this.walked.includes(point))  point.walked = true;
        });
    }

    private move = (point: Point, walked?: boolean) => {
        this.previous = this.current;
        this.current = point;
        if (!this.walked.includes(this.current)) {
            this.walked.push(this.current);
        }
        else {
            this.walked.pop()
        }
    }

    private checkBacktrack = (point: Point): boolean => this.walked.includes(point)

    /**
     * 
     */
    private backtrackAndBarricade = (direction: Direction) => {
        const badPath = this.current;
        if (direction == Direction.left && this.current.left) {
            this.move(this.current.left);
        }
        else if (direction == Direction.down && this.current.down) {
            this.move(this.current.down);
        }
        else if (direction == Direction.right && this.current.right) {

            this.move(this.current.right);
        }
        else if (direction == Direction.up && this.current.up) {
            this.move(this.current.up);
        }
        this.badPaths.push(badPath);
    }
}

enum Direction {
    left, down, right, up
}
