class Life {
    rows: number;
    cols: number;
    board: number[][];
    boardCanvas: any;
    ctx: any;
    frameCount: number;
    updateSpeed: number;

    constructor(rs: number, cs: number, speed: number, th: number) {
        // initializes an empty board with rs rows
        // and cs columns with frames per second speed
        this.rows = rs;
        this.cols = cs;
        this.boardCanvas = document.getElementById("board");
        this.ctx = this.boardCanvas.getContext('2d');
        this.ctx.fillstyle = 'green';
        this.board = new Array(this.cols);
        for (var i = 0; i < this.cols; i++) {
            this.board[i] = new Array(this.rows);
            for (var j = 0; j < this.rows; j++) {
                this.board[i][j] = 0;
            }
        }
        // randomize
        this.randomize(th);

        // we only want to actually update once every 10 frames
        this.frameCount = 0;
        this.updateSpeed = 60/speed;
    }

    replace(bd: number[][]) {
        this.rows = bd.length;
        this.cols = bd[0].length;
        this.board = bd;
    }

    randomize(threshold: number) {
        // randomizes the board, where threshold is the probability
        // that a cell is alive
        for (var row in this.board) {
            for (var col in this.board[row]) {
                if (Math.random() < threshold) {
                    this.board[row][col] = 1;
                }
            }
        }
    }

    update() {
        // updates the board according to the rules of Conway's
        // game of life
        var n = 0;
        // need to create a new board because we can't update the board in place
        let nbd = new Array(this.cols);
        for (var i = 0; i < this.cols; i++) {
            nbd[i] = new Array(this.rows);
            for (var j = 0; j < this.rows; j++) {
                nbd[i][j] = 0;
            }
        }
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                n = this.neighbors(i, j);
                if (this.board[i][j] == 1) {
                    // if the cell is alive
                    if (n == 2 || n == 3) {
                        // with fewer than 2 or more than 3 live neighbors it dies
                        nbd[i][j] = 1;
                    }
                }
                else if (this.board[i][j] == 0){
                    // if the cell is dead
                    if (n == 3) {
                        // with exactly 3 neighbors it lives
                        nbd[i][j] = 1;
                    }
                }
            }
        }
        this.replace(nbd);
    }

    neighbors(row: number, col: number): number {
        if (row == 0) {
            //first row
            if (col == 0) {
                //first column
                // *3.
                // 12.
                // ...
                return this.board[1][0] + this.board[1][1] + this.board[0][1];
            }
            else if (col == this.cols - 1) {
                //last column
                // .1*
                // .23
                // ...
                return this.board[0][col-1] + this.board[1][col-1] + this.board[1][col];
            }
            else {
                //anything in between
                // .1*5.
                // .234.
                // .....
                return this.board[0][col-1] + this.board[1][col-1]
                    + this.board[1][col] + this.board[1][col+1] + this.board[0][col+1];
            }
        }
        else if (row == this.rows - 1) {
            //last row
            if (col == 0) {
                //first column
                // ...
                // 32.
                // *1.
                return this.board[row][1] + this.board[row-1][1] + this.board[row-1][0];
            }
            else if (col == this.cols - 1) {
                //last column
                // ...
                // .21
                // .3*
                return this.board[row-1][col] + this.board[row-1][col-1] 
                    + this.board[row][col-1];
            }
            else {
                // anything in between
                // .....
                // .432.
                // .5*1.
                return this.board[row][col+1] + this.board[row-1][col+1]
                    + this.board[row-1][col] + this.board[row-1][col-1] + this.board[row][col-1];
            }
        }
        else {
            // in the middle
            if (col == 0) {
                // first column
                // ...
                // 74.
                // *3.
                // 12.
                // ...
                return this.board[row+1][col] + this.board[row+1][col+1]
                    + this.board[row][col+1] + this.board[row-1][col+1] + this.board[row-1][col];
            }
            else if (col == this.cols - 1) {
                // last column
                // ...
                // .21
                // .3*
                // .45
                // ...
                return this.board[row-1][col] + this.board[row-1][col-1]
                    + this.board[row][col-1] + this.board[row+1][col-1] + this.board[row+1][col];
            }
            else {
                // in the middle
                // .....
                // .432.
                // .5*1.
                // .678.
                // .....
                return this.board[row][col+1] + this.board[row-1][col+1]
                    + this.board[row-1][col] + this.board[row-1][col-1] + this.board[row][col-1]
                    + this.board[row+1][col-1] + this.board[row+1][col] + this.board[row+1][col+1];
            }
        }
    }

    render= () => {
        // height and width of each cell are the height and width of the canvas element,
        // divided by the number of rows or columns respectively
        this.frameCount += 1;
        if (this.frameCount >= this.updateSpeed) {
            this.update();
            this.ctx.clearRect(0,0,this.boardCanvas.width, this.boardCanvas.height);
            let h = this.boardCanvas.height / this.rows;
            let w = this.boardCanvas.width / this.cols;
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    if (this.board[i][j] > 0) {
                        this.ctx.fillRect(j * w, i * h, w, h);
                    }
                }
            }
            this.frameCount = 0;
        }
        window.requestAnimationFrame(this.render);
    }
}