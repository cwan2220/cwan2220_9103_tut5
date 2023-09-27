function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

let horizonLine;
let treeMin;
let treeMax;
let mmgMin;
let mmgMax;
let mbgMin;
let mbgMax;
let sunSize;
let sunX;
let sunY;

//perlin noise
let mmgInc = 0.01;
let mmgStart = 0;

let mbgInc = 0.01;
let mbgStart = 0;

//gradient stuff
let c1, c2;

//palettes
let chosenPalette;
let palettes = [];

//							trees				mmg					bgm				skyUp			skyDown		lakeUp			lakeDown	
palettes[0] = ['#441e33', '#893447', '#f2656a', '#582949', '#fc9086', '#dd787a', '#17121e'];
palettes[1] = ['#232963', '#3d4e91', '#8f6edb', '#f56c83', '#ffbace', '#7989f2', '#1c5ba3'];
palettes[2] = ['#0c0912', '#1c142b', '#342a47', '#1a2126', '#a33010', '#a33010', '#1a2126'];
palettes[3] = ['#320d4f', '#521d7a', '#7227ab', '#201040', '#a449ab', '#a449ab', '#201040'];
palettes[4] = ['#1d3b1f', '#245734', '#5ead77', '#072b0d', '#2dbd4f', '#80bf94', '#072b0d'];

//====================================================================================

function setup() { //open setup
	createCanvas(800, 500);
	
	determineValues();
	
	//sky with gradient
	sky(0, 0, width, horizonLine, sky1, sky2);
	
	//lake with gradient
	lake(0, horizonLine, width, height - horizonLine, lake1, lake2);
	
	sun();
	clouds();
} //close setup

function draw() { //open draw
	background(100);
	
	//determineValues();
	
	//sky with gradient
	sky(0, 0, width, horizonLine, sky1, sky2);
	
	//lake with gradient
	lake(0, horizonLine, width, height - horizonLine, lake1, lake2);
	
	noStroke();
	sun();
	//clouds();
	mountainsBG();
	mountainsMG();
	trees();
	
	push();
	translate(0, horizonLine*2);
	scale(1, -1);
	treesReflection();
	pop();
	
	frameRate(30);
	//noLoop();
	
} //close draw

//=================================================================================

function determineValues() { //open detVal
	horizonLine = random(250, 350);
	
	treeMin = random(horizonLine, horizonLine - 20);
	treeMax = random(treeMin - 20, treeMin - 50);
	
	mmgMin = random(treeMax - 5, treeMax - 50);
	mmgMax = random(mmgMin, mmgMin - 50);
	
	mbgMin = random(mmgMin, mmgMax - 50);
	mbgMax = random(mbgMin, mbgMin - 50);
	
	sunX = random(width*0.1, width*0.9);
	sunY = random(mbgMin, height* 0.1);
	sunSize = random(30, 50);
	
	chosenPalette = random(palettes);
	//chosenPalette = palettes[1];
	
	//define gradient colors
	sky1 = color(chosenPalette[3]);
	sky2 = color(chosenPalette[4]);
	
	lake1 = color(chosenPalette[5]);
	lake2 = color(chosenPalette[6]);
	
} //close detVal

function trees() { //open trees
	fill(chosenPalette[0]);
	// let c = color(chosenPalette[0]);
	// c.setAlpha(50);
	// fill(c);
	
	beginShape(); //dumb method
		vertex(-100, horizonLine); //trees start point
		for(let x = 0; x < width; x += random(5, 20)) {
			vertex(x, random(treeMax, treeMin));
			vertex(x + 10, random(treeMin, horizonLine - 10));
		}
		vertex(width + 100, horizonLine); //trees end point
	endShape(CLOSE);
	
	beginShape(); //perlin noise method
		let xoff = random(0, 10);
		vertex(-100, horizonLine); //start point
		for (let x = 0; x < width; x+= random(2, 5)) {
			//stroke(255);
			let y = map(noise(xoff) * height, 0, height, treeMin, treeMax + 10);
			vertex(x, y);
			
			xoff += 0.1;
		}
		vertex(width + 100, horizonLine); //end point
	endShape(CLOSE);
	
} //close trees

function treesReflection() { //open treesReflection
	//fill(chosenPalette[0]);
	let c = color(chosenPalette[0]);
	c.setAlpha(50);
	fill(c);
	
	beginShape(); //dumb method
		vertex(-100, horizonLine); //trees start point
		for(let x = 0; x < width; x += random(5, 20)) {
			vertex(x, random(treeMax, treeMin));
			vertex(x + 10, random(treeMin, horizonLine - 10));
		}
		vertex(width + 100, horizonLine); //trees end point
	endShape(CLOSE);
	
	beginShape(); //perlin noise method
		let xoff = random(0, 10);
		vertex(-100, horizonLine); //start point
		for (let x = 0; x < width; x+= random(2, 5)) {
			//stroke(255);
			let y = map(noise(xoff) * height, 0, height, treeMin, treeMax + 10);
			vertex(x, y);
			
			xoff += 0.1;
		}
		vertex(width + 100, horizonLine); //end point
	endShape(CLOSE);
	
} //close treesReflection

function mountainsMG() { //open mmg
	fill(chosenPalette[1]);
	
	beginShape(); //perlin noise method
		let xoff = mmgStart;
		vertex(-100, horizonLine); //start point
		for (let x = 0; x < width; x++) {
			//stroke(255);
			let y = map(noise(xoff) * height, 0, height, mmgMax, horizonLine);
			//let y = noise(xoff) * height;
			vertex(x, y);
			
			xoff += mmgInc;
		}
		vertex(width + 100, horizonLine); //end point
	endShape(CLOSE);
	
	mmgStart += mmgInc;
	
} //close mmg

function mountainsBG() { //open mbg
	fill(chosenPalette[2]);
	
	beginShape(); //perlin noise method
	
		let xoff = mbgStart;
		vertex(-100, horizonLine); //start point
		for (let x = 0; x < width; x++) {
			//stroke(255);
			let y = map(noise(xoff) * height, 0, height, mbgMax, mbgMin);
			//let y = noise(xoff) * height;
			vertex(x, y);
			
			xoff += mbgInc;
		}
		vertex(width + 100, horizonLine); //end point
	endShape(CLOSE);
	
	//mbgStart += mbgInc;
	
} //close mbg

function sun() { //open sun
	//let sunX = random(width*0.1, width*0.9);
	//let sunY = random(mbgMin, height* 0.1);
	fill(255);
	ellipse(sunX, sunY, sunSize);
	fill(255, 20);
	ellipse(sunX, sunY, sunSize * 2);
	fill(255, 10);
	ellipse(sunX, sunY, sunSize * 3);
	fill(255, 5);
	ellipse(sunX, sunY, sunSize * 4);
} //close sun

function sky(x, y, w, h, c1, c2) { //open sky
	noFill();
	for (let i = y; i <= y + h; i++) {
		let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
	}
} //close sky

function lake(x, y, w, h, c1, c2) { //open lake
	noFill();
	for (let i = y; i <= y + h; i++) {
		let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
	}
} //close lake

function clouds() {
	noStroke();
	fill( 255, 50);
	ellipse(random(0, width), random(0, mbgMin), random(100, 200), random(20, 25));
	ellipse(random(0, width), random(0, mbgMin), random(50, 80), random(20, 25));
}
