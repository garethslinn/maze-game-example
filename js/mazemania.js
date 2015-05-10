var Mazemania = function() {
    this.canvas;
    var ctx;
    this.init();
}

Mazemania.prototype.drawPlayer = function() {
    ctx.beginPath();
    ctx.rect(this.player[0],this.player[1],this.player[2],this.player[3]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

Mazemania.prototype.drawEnemy = function() {
    for (var i=0; i < this.enemy.length; i++) {
        ctx.beginPath();
        ctx.rect(this.enemy[i][0],this.enemy[i][1],this.enemy[i][2],this.enemy[i][3]);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}

Mazemania.prototype.drawWall = function() {
    for (var i=0; i < this.wall.length; i++) {
        ctx.beginPath();
        ctx.rect(this.wall[i][0],this.wall[i][1],this.wall[i][2],this.wall[i][3]);
        ctx.closePath();
        ctx.fillStyle = "grey";
        ctx.fill();
        ctx.stroke();
    }
}

Mazemania.prototype.rect = function(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

Mazemania.prototype.clear = function() {
    ctx.clearRect(0, 0, this.width, this.height);
}

Mazemania.prototype.init = function() {
    var that = this;
    this.width = 600;
    this.height = 400;
    this.dx = 40;
    this.dy = 40;
    this.timer = 10;
    this.wall = [[0,160,this.dx,this.dy],
        [80,160,this.dx,this.dy],
        [40,40,this.dx,this.dy],[40,80,this.dx,this.dy],[40,240,this.dx,this.dy],[40,320,this.dx,this.dy],
        [120,0,this.dx,this.dy],[120,80,this.dx,this.dy],[120,120,this.dx,this.dy],[120,160,this.dx,this.dy],
        [120,160,this.dx,this.dy],[120,240,this.dx,this.dy],[120,320,this.dx,this.dy],[120,360,this.dx,this.dy],
        [160,0,this.dx,this.dy],[160,80,this.dx,this.dy],[160,160,this.dx,this.dy],[160,160,this.dx,this.dy],
        [160,160,this.dx,this.dy],[160,240,this.dx,this.dy],[160,320,this.dx,this.dy],[160,360,this.dx,this.dy],
        [200,0,this.dx,this.dy],
        [240,0,this.dx,this.dy],[240,80,this.dx,this.dy],[240,120,this.dx,this.dy],[240,160,this.dx,this.dy],[240,200,this.dx,this.dy],
        [240,280,this.dx,this.dy],[240,320,this.dx,this.dy],
        [280,0,this.dx,this.dy],[280,80,this.dx,this.dy],[280,120,this.dx,this.dy],[280,160,this.dx,this.dy],[280,200,this.dx,this.dy],
        [280,280,this.dx,this.dy],[280,320,this.dx,this.dy],
        [360,0,this.dx,this.dy],[360,80,this.dx,this.dy],[360,120,this.dx,this.dy],[360,160,this.dx,this.dy],[360,200,this.dx,this.dy],
        [360,280,this.dx,this.dy],[360,320,this.dx,this.dy],
        [400,0,this.dx,this.dy],
        [440,0,this.dx,this.dy],[440,80,this.dx,this.dy],[440,120,this.dx,this.dy],[440,160,this.dx,this.dy],
        [440,160,this.dx,this.dy],[440,240,this.dx,this.dy],[440,320,this.dx,this.dy],[440,360,this.dx,this.dy],
        [480,160,this.dx,this.dy],
        [520,40,this.dx,this.dy],[520,80,this.dx,this.dy],[520,240,this.dx,this.dy],[520,320,this.dx,this.dy],
        [560,160,this.dx,this.dy],

    ];
    this.enemy = [[40,80,this.dx,this.dy],[280,0,this.dx,this.dy]];
    this.player = [0,360,this.dx,this.dy]; //x,y,h,w;
    window.addEventListener('keydown',function(e) {
        Mazemania.prototype.move(e,that);
    });

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    this.enemyInterval = setInterval(function() {
        that.enemyMovement();
    }, 100);

    this.drawInterval = setInterval(function() {
        that.draw();
    }, this.timer);
}

Mazemania.prototype.enemyMovement = function(){
    var that = this;
    for (var i=0; i < that.enemy.length; i++) {
        var enemyDirection = [38,40,37,39];
        var randomNumber = Math.floor(Math.random()*4);
        this.enemyMove(enemyDirection[randomNumber],i);
    }
}

Mazemania.prototype.enemyMove = function(evt,j){
    switch (evt) {
        case 38:  /* Up */
            if (this.enemy[j][1] - this.dy >= 0){
                this.enemy[j][1] -= this.dy;
                if (this.collision(this,j) == true) {
                    this.enemy[j][1] += this.dy;
                }
            }
            break;
        case 40:  /* Down */
            if (this.enemy[j][1] + this.dy < this.height){
                this.enemy[j][1] += this.dy;
                if (this.collision(this,j) == true) {
                    this.enemy[j][1] -= this.dy;
                }
            }
            break;
        case 37:  /* Left */
            if (this.enemy[j][0] - this.dx >= 0){
                this.enemy[j][0] -= this.dx;
                if (this.collision(this,j) == true) {
                    this.enemy[j][0] += this.dx;
                }
            }
            break;
        case 39:  /* Right */
            if (this.enemy[j][0] + this.dx < this.width){
                this.enemy[j][0] += this.dx;
                if (this.collision(this,j) == true) {
                    this.enemy[j][0] -= this.dx;
                }
            }
            break;
    }
}

Mazemania.prototype.move = function(evt,that){
    switch (evt.keyCode) {
        case 32:  /* Up arrow was pressed */
            console.log('fire');
            break;
        case 38:  /* Up arrow was pressed */
            if (that.player[1] - that.dy >= 0){
                that.player[1] -= that.dy;
                if (that.collision(that,0) == true) {
                    that.player[1] += that.dy;
                }
            }
            break;
        case 40:  /* Down arrow was pressed */
            if (that.player[1] + that.dy < that.height){
                that.player[1] += that.dy;
                if (that.collision(that,0) == true) {
                    that.player[1] -= that.dy;
                }
            }
            break;
        case 37:  /* Left arrow was pressed */
            if (that.player[0] - that.dx >= 0){
                that.player[0] -= that.dx;
                if (that.collision(that,0) == true) {
                    that.player[0] += that.dx;
                }
            }
            break;
        case 39:  /* Right arrow was pressed */
            if (that.player[0] + that.dx < that.width){
                that.player[0] += that.dx;
                if (that.collision(that,0) == true) {
                    that.player[0] -= that.dx;
                }
            }
            break;
    }
}

Mazemania.prototype.stop = function() {
    clearInterval(this.enemyInterval);
    clearInterval(this.drawInterval);
    clearInterval(this.drawInterval);
    alert('You have been caught!')
}

Mazemania.prototype.collision = function(that,j) {
    for (var i=0; i < this.enemy.length; i++) {
        if (that.player[0] === that.enemy[i][0] && that.player[1] === that.enemy[i][1] || that.player[0] === that.enemy[i][0] && that.player[1] === that.enemy[i][1]) {
            that.stop();
            //return false; no need to return false; just initiate death sequence.
        }
    }
    for (var i=0; i < this.wall.length; i++) {
        if (that.player[0] === that.wall[i][0] && that.player[1] === that.wall[i][1] || that.player[0] === that.wall[i][0] && that.player[1] === that.wall[i][1]) {
            return true;
        }
        if (that.enemy[j][0] === that.wall[i][0] && that.enemy[j][1] === that.wall[i][1] || that.enemy[j][0] === that.wall[i][0] && that.enemy[j][1] === that.wall[i][1]) {
            return true;
        }
    }

}

Mazemania.prototype.draw = function() {
    this.clear();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    this.rect(0,0,this.width,this.height);
    this.drawEnemy();
    this.drawWall();
    ctx.fillStyle = "blue";
    this.drawPlayer(this.player[0],this.player[1],this.player[2],this.player[3]);
}

var mazemania = new Mazemania();

/*
function (rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x ||
        rectB.x + rectB.width < rectA.x ||
        rectA.y + rectA.height < rectB.y ||
        rectB.y + rectB.height < rectA.y);
};
    */