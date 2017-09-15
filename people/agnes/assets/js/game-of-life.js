// Conway's game of life; now clickable!
// (very) loosely adapted from code by JSFiddle user Concannon


function init(){
        // Load the script
	    var gridHeight = 40;
	    var gridWidth = 40;
	    var theGrid = createArray(gridWidth);
	    var numArray = createArray(gridWidth);
	    var mirrorGrid = createArray(gridWidth);
	    var c = document.getElementById("canvas");
	    var ctx = c.getContext("2d");
	    fillRandom(); //create the starting state for the grid by filling it with random cells
	    tick(); //call main loop
    
	//functions
	function tick() { //main loop
	    var tickTime = 3000; // pause between iterations
	    console.time("loop");
	    drawGrid();
	    updateGrid();
	    console.timeEnd("loop");
	    setTimeout(function() {requestAnimationFrame(tick)}, tickTime);
	}

	function createArray(rows) { //creates a 2 dimensional array of required height
	    var arr = [];
	    for (var i = 0; i < rows; i++) {
	        arr[i] = [];
	    }
	    return arr;
	}

	function fillRandom() { //fill the grid randomly
	    for (var j = 0; j < gridHeight-1; j++) { //iterate through rows
	        for (var k = 0; k < gridWidth-1; k++) { //iterate through columns
	            theGrid[j][k] = Math.round(Math.random());
	        }
	    }
	}

	function drawGrid() { //draw the contents of the grid onto a canvas
    var liveCount = 0;
    var blockSize = 60;
    ctx.fillStyle = "red";
	    ctx.clearRect(0, 0, gridHeight*blockSize, gridWidth*blockSize); //this should clear the canvas ahead of each redraw
	    for (var j = 0; j < gridHeight; j++) { //iterate through rows
	        for (var k = 0; k < gridWidth; k++) { //iterate through columns
	            if (theGrid[j][k] === 1) {
	                ctx.fillRect(0.5 + j*blockSize, 0.5 + k*blockSize, blockSize, blockSize);
	                ctx.fill();
                    liveCount++;
                    
	            }
	        }
	    }
	    
	  for (var j = 0; j < gridHeight; j++) { //iterate through rows
	        for (var k = 0; k < gridWidth; k++) { //iterate through columns
	            if (theGrid[j][k] === 1) {
	                ctx.font = "bold 40px Arial";
	                ctx.fillStyle = "black";
	                blockNum = Math.ceil(Math.random()*10);
	                numArray[j][k] = blockNum;
                    ctx.fillText(blockNum, j*blockSize + 5, k*blockSize + 35);
                    liveCount++;
	            }
	            else{
	                numArray[j][k] = 0;
	            }
	        }
	    }
	}



	function updateGrid() { //perform one iteration of grid update
       
	    for (var j = 1; j < gridHeight - 1; j++) { //iterate through rows
	        for (var k = 1; k < gridWidth - 1; k++) { //iterate through columns
	            var totalCells = 0;
	            //add up the total values for the surrounding cells
	            totalCells += theGrid[j - 1][k - 1]; //top left
	            totalCells += theGrid[j - 1][k]; //top center
	            totalCells += theGrid[j - 1][k + 1]; //top right

	            totalCells += theGrid[j][k - 1]; //middle left
	            totalCells += theGrid[j][k + 1]; //middle right

	            totalCells += theGrid[j + 1][k - 1]; //bottom left
	            totalCells += theGrid[j + 1][k]; //bottom center
	            totalCells += theGrid[j + 1][k + 1]; //bottom right

	            //apply the rules to each cell
	            switch (totalCells) {
	                case 2:
	                    mirrorGrid[j][k] = theGrid[j][k];
                       
	                    break;
	                case 3:
	                    mirrorGrid[j][k] = 1; //live
                        
	                    break;
	                default:
	                    mirrorGrid[j][k] = 0; //
	            }
	        }
	    }

	    //mirror edges to create wraparound effect

	    for (var l = 1; l < gridHeight - 1; l++) { //iterate through rows
	        //top and bottom
	        mirrorGrid[l][0] = mirrorGrid[l][gridHeight - 3];
	        mirrorGrid[l][gridHeight - 2] = mirrorGrid[l][1];
	        //left and right
	        mirrorGrid[0][l] = mirrorGrid[gridHeight - 3][l];
	        mirrorGrid[gridHeight - 2][l] = mirrorGrid[1][l];

	    }


	    //swap grids
	    var temp = theGrid;
	    theGrid = mirrorGrid;
	    mirrorGrid = temp;
	
	    
	  function handleMouseDown(e){
  
        e.preventDefault();
        var blockSize = 60;
        
        var xOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
        var yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
        
        // get the mouse position
        var mouseX=parseInt(e.clientX + xOffset) - 8;
        var mouseY=parseInt(e.clientY + yOffset) - 74; //correct for problems with canvas

        console.log(mouseX, mouseY);
        
        gridPosj = Math.floor(mouseX/blockSize);
        gridPosk = Math.floor(mouseY/blockSize);
        
        if(gridPosk < 0){
            gridPosk = 0;
        }
        
        if(gridPosj < 0){
            gridPosj = 0;
        }
        
        console.log("position is", gridPosj, gridPosk);
        console.log("grid value is", numArray[gridPosj][gridPosk]);
        
          if(numArray[gridPosj][gridPosk] !== 0){
              newAddress = "" + numArray[gridPosj][gridPosk] + '.html';
              window.location.href = newAddress;
          }

    }

    // listen for mousedown events
    $("#canvas").mousedown(function(e){handleMouseDown(e);});
	    
	}
    }
window.onload = init;