/*
var gameField = new Array();
var board = document.getElementById("game-table");
var currentCol;
var currentRow;
var currentPlayer;
var id = 2;

newgame();

function newgame(){
	prepareField();
	placeDisc(Math.floor(Math.random()*2)+1);
}

function checkForVictory(row,col){
	if(getAdj(row,col,0,1)+getAdj(row,col,0,-1) > 2){
		return true;
	} else {
		if(getAdj(row,col,1,0) > 2){
			return true;
		} else {
			if(getAdj(row,col,-1,1)+getAdj(row,col,1,-1) > 2){
				return true;
			} else {
				if(getAdj(row,col,1,1)+getAdj(row,col,-1,-1) > 2){
					return true;
				} else {
					return false;
				}
			}
		}
	}
}

function getAdj(row,col,row_inc,col_inc){
	if(cellVal(row,col) == cellVal(row+row_inc,col+col_inc)){
		return 1+getAdj(row+row_inc,col+col_inc,row_inc,col_inc);
	} else {
		return 0;
	}
}

function cellVal(row,col){
	if(gameField[row] == undefined || gameField[row][col] == undefined){
		return -1;
	} else {
		return gameField[row][col];
	}
}

function firstFreeRow(col,player){
	for(var i = 0; i<6; i++){
		if(gameField[i][col]!=0){
			break;
		}
	}
	gameField[i-1][col] = player;
	return i-1;
}

function possibleColumns(){
	var moves_array = new Array();
	for(var i=0; i<7; i++){
		if(gameField[0][i] == 0){
			moves_array.push(i);
		}
	}
	return moves_array;
}

function think(){
	var possibleMoves = possibleColumns();
	var aiMoves = new Array();
	var blocked;
	var bestBlocked = 0;

	for(var i=0; i<possibleMoves.length; i++){
		for(var j=0; j<6; j++){
			if(gameField[j][possibleMoves[i]] != 0){
				break;
			}
		}

		gameField[j-1][possibleMoves[i]] = 1;
		blocked = getAdj(j-1,possibleMoves[i],0,1)+getAdj(j-1,possibleMoves[i],0,-1);
		blocked = Math.max(blocked,getAdj(j-1,possibleMoves[i],1,0));
		blocked = Math.max(blocked,getAdj(j-1,possibleMoves[i],-1,1));
		blocked = Math.max(blocked,getAdj(j-1,possibleMoves[i],1,1)+getAdj(j-1, possibleMoves[i],-1,-1));

		if(blocked >= bestBlocked){
			if(blocked>bestBlocked){
				bestBlocked = blocked;
				aiMoves = new Array();
			}
			aiMoves.push(possibleMoves[i]);
		}
		gameField[j-1][possibleMoves[i]] = 0;
	}

	return aiMoves;
}

function Disc(player){
	this.player = player;
	this.color = player == 1 ? 'red' : 'yellow';
	this.id = id.toString();
	id++;

	this.addToScene = function(){
		board.innerHTML += '<div id="d'+this.id+'" class="disc '+this.color+'"></div>';
		if(currentPlayer==2){
      //computer move
			var possibleMoves = think();
			var cpuMove = Math.floor( Math.random() * possibleMoves.length);
			currentCol = possibleMoves[cpuMove];
			document.getElementById('d'+this.id).style.left = (14+60*currentCol)+"px";
			dropDisc(this.id,currentPlayer);
		}
	}

	var $this = this;
	document.onmousemove = function(evt){
		if(currentPlayer == 1){
			currentCol = Math.floor((evt.clientX - board.offsetLeft)/60);
			if(currentCol<0){currentCol=0;}
			if(currentCol>6){currentCol=6;}
			document.getElementById('d'+$this.id).style.left = (14+60*currentCol)+"px";
			document.getElementById('d'+$this.id).style.top = "-55px";
		}
	}
	document.onload = function(evt){
		if(currentPlayer == 1){
			currentCol = Math.floor((evt.clientX - board.offsetLeft)/60);
			if(currentCol<0){currentCol=0;}
			if(currentCol>6){currentCol=6;}
			document.getElementById('d'+$this.id).style.left = (14+60*currentCol)+"px";
			document.getElementById('d'+$this.id).style.top = "-55px";
		}
	}

	document.onclick = function(evt){
		if(currentPlayer == 1){
			if(possibleColumns().indexOf(currentCol) != -1){
				dropDisc($this.id,$this.player);
			}
		}
	}
}

function dropDisc(cid,player){
	currentRow = firstFreeRow(currentCol,player);
	moveit(cid,(14+currentRow*60));
	currentPlayer = player;
	checkForMoveVictory();
}

function checkForMoveVictory(){
	if(!checkForVictory(currentRow,currentCol)){
		placeDisc(3-currentPlayer);
	} else {
		var ww = currentPlayer == 2 ? 'Computer' : 'Player';
		placeDisc(3-currentPlayer);
		alert(ww+" win!");
		board.innerHTML = "";
		newgame();
	}
}

function placeDisc(player){
	currentPlayer = player;
	var disc = new Disc(player);
	disc.addToScene();
}

function prepareField(){
	gameField = new Array();
	for(var i=0; i<6; i++){
		gameField[i] = new Array();
		for(var j=0; j<7; j++){
			gameField[i].push(0);
		}
	}
}

function moveit(who,where){
	document.getElementById('d'+who).style.top = where+'px';
}
*/


document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div')
	const result = document.querySelector('#result')
	const displayCurrentPlayer = document.querySelector('#current-player')
	
	let currentPlayer = 1

	for (var i = 0, len = squares.length; i < len; i++) 	
		// add an onclick to each square
		(function(index) {
			squares[i].onclick = function() {
				// if the square below your current square is taken, you can go on top of it
				if (squares[index + 7].classList.contains('taken')) {
					if (currentPlayer === 1) {
						squares[index].classList.add('taken')
						squares[index].classList.add('player-one')
						// change your player
						currentPlayer = 2
						displayCurrentPlayer.innerHTML = currentPlayer
					} else if (currentPlayer === 2) {
						squares[index].classList.add('taken')
						squares[index].classList.add('player-two')
						// change the player
						currentPlayer = 1
						displayCurrentPlayer.innerHTML = currentPlayer
					}
					// if the square below your current square is not taken, you can't go there
				} else alert ('You can\'t go here')
			}
		}) (i)

	// check the board for a win or lose
	function checkBoard() {
		// make const that shows all winning Arrays
		const winningArrays = [
		[0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
		[20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
		[1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
		[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
		[7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
		[13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
		[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
		[12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
		[22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
		[8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
		]
		// now take the 4 values in each winningArray and plug them into the squares
		for (let y = 0; y < winningArrays.length; y++) {
			const square1 = squares[winningArrays[y][0]]
			const square2 = squares[winningArrays[y][1]]
			const square3 = squares[winningArrays[y][2]]
			const square4 = squares[winningArrays[y][3]]

			if (square1.classList.contains('player-one') &&
				square2.classList.contains('player-one') &&
				square3.classList.contains('player-one') &&
				square4.classList.contains('player-one')) {

				result.innerHTML = 'Player One Wins!'
		} else if (square1.classList.contains('player-two') &&
			square2.classList.contains('player-two') &&
			square3.classList.contains('player-two') &&
			square4.classList.contains('player-two')) {

			result.innerHTML = 'Player Two Wins!'
		}
	} 
}

squares.forEach(square => square.addEventListener('click', checkBoard))
})