//import {Life} from "./life";

QUnit.test("hello test", function(assert) {
    assert.ok(1 == 1, "Passed!");
}); 

QUnit.test("constructor test", function(assert) {
    let l2 = new Life(8,3, 12, 0.4);
    assert.equal(l2.rows, 8);
    assert.equal(l2.cols,3);
    assert.equal(l2.board[0].length, 8);
    assert.equal(l2.board.length, 3);
    assert.equal(l2.updateSpeed, 5);
});

QUnit.test("replace test", function(assert) {
    let l = new Life(10,10, 12, 0.4);
    let nbd = new Array(8);
    for (var i = 0; i < 8; i++) {
        nbd[i] = new Array(3);
        for (var j = 0; j < 3; j++) {
            nbd[i][j] = 0;
        }
    }
    l.replace(nbd);
    assert.equal(l.rows, 8);
    assert.equal(l.cols, 3);
    assert.deepEqual(l.board, nbd);
});

QUnit.test("neighbors test", function(assert) {
    let l = new Life(5,5, 12, 0.4);
    var nbd = [ [1,0,0,1,1],
                [0,0,0,0,0],
                [0,1,1,1,1],
                [1,1,1,0,1],
                [1,1,1,1,1] ];
    l.replace(nbd);
    assert.equal(l.neighbors(0,0), 0);
    assert.equal(l.neighbors(0,2), 1);
    assert.equal(l.neighbors(0,4), 1);
    assert.equal(l.neighbors(2,0), 3);
    assert.equal(l.neighbors(2,2), 4);
    assert.equal(l.neighbors(2,4), 2);
    assert.equal(l.neighbors(4,0), 3);
    assert.equal(l.neighbors(4,2), 4);
    assert.equal(l.neighbors(4,4), 2);
});

QUnit.test("update test", function(assert) {
    let l = new Life(5,5, 12, 0.4);
    var nbd = [ [1,0,0,1,1],
                [0,0,0,0,0],
                [0,1,1,1,1],
                [1,1,1,0,1],
                [1,1,1,1,1] ];
    l.replace(nbd);
    l.update();
    var res = [ [0,0,0,0,0],
                [0,1,0,0,0],
                [1,0,0,0,1],
                [0,0,0,0,0],
                [1,0,0,0,1] ];
    assert.deepEqual(l.board, res);
});

QUnit.test("randomize test", function(assert){
    let l = new Life(1000, 1000, 12, 0.5);
    var sum = 0;
    var epsilon = 0.01;
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            sum += l.board[i][j];
        }
    }
    assert.ok(Math.abs((sum/1000000) - 0.5) < epsilon);
});