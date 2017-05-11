//Position OffSet used for ALL "Orbital Monsters"
var offSetX = 0.0;
var offSetY = 0.0;
//MAX Position OffSet
var maxOSX = 15.0;
var maxOSY = 50.0;
//Booleans variables regarding Orbital Monsters direction of movement
var left = true;
var down = true;

//Array of a Single Monster's Attributes
var monsterAtr = [];
//Total number of Monsters... Default is 3 (out of 8)
var monsterCount = 3;
//Array of ALL Monsters Created
var monsterList = [];

//Initialize:
//Monster ID
monsterAtr[ 0 ] = 0;
//Monster X
monsterAtr[ 1 ] = 0;
//Monster Y
monsterAtr[ 2 ] = 0;
//Monster Color
monsterAtr[ 3 ] = 0;
//Monster Power (Number of Orbital Monsters, Color Variations, Antennas Tip Size, etc.)
monsterAtr[ 4 ] = 0;

//Initialize:
//Create Space/List for all 8  "Possible" Monsters
monsterList = [ [], [], [], [], [], [], [], [] ];

function setup()
{
  createCanvas(775, 500);
  smooth();
	frameRate(30);
  
  //StartUp Message
  console.log("Command Center XYZ: " );
  console.log("...");
}

function draw()
{
  background(255, 255, 255);
  translate( 200, 200 );
  
  drawAllMonsters();
}

function drawAllMonsters()
{
  //Draw the Default Monsters
  createDefault();
  for( var i = 0; i < monsterCount; i++ )
  {
    //"Current" Monsters Attributes
    var atr = monsterList[ i ];
    createMonster( atr[1], atr[2], atr[3], atr[4] );
  }
}

//Create the Deafualt Monsters
function createDefault()
{
  //Variables Catching the Attribute List for the 3 Default Monsters
  var monster1 = monsterList[0];
  var monster2 = monsterList[1];
  var monster3 = monsterList[2];
  
  //Monster X
  monster1[ 1 ] = 350;
  //Monster Y
  monster1[ 2 ] = -25;
  //Monster Color
  monster1[ 3 ] = color( 255, 237, 220 );
  //Monster Power (Number of Orbital Monsters, etc.)
  monster1[ 4 ] = 4;

  //Monster X
  monster2[ 1 ] = -50;
  //Monster Y
  monster2[ 2 ] = -25;
  //Monster Color
  monster2[ 3 ] = color( 205, 105, 100 );
  //Monster Power (Number of Orbital Monsters, etc.)
  monster2[ 4 ] = 2;

  //Monster X
  monster3[ 1 ] = 150;
  //Monster Y
  monster3[ 2 ] = 175;
  //Monster Color
  monster3[ 3 ] = color( 25, 15, 100 );
  //Monster Power (Number of Orbital Monsters, etc.)
  monster3[ 4 ] = 6;
}

//Draws a Single Monster with the Attributes that are passed as Parameters
function createMonster( x, y, clr, pwr )
{
  makeTVMonster( x, y, clr, pwr );
  makeAllOMs( x, y, pwr );
}

//Makes TV portion of monster
function makeTVMonster( x, y, clr, pwr )
{
  //Disk is Drawn First so that it is the "platform" of the TV / Sits on top of it
  makeDisk( x, y, pwr );
  makeTVBase( x, y, clr );
  makeTVAccents( x, y, pwr );
}

//FLOATING DISK
function makeDisk( x, y, pwr )
{
  //Disk Edges
  stroke( 0, 0, 0 );
  ellipseMode( CENTER );
  if( pwr > 4 )
  {
    fill(50, 200, 204, 90);
  }
  else
  {
    fill(204, 200, 155, 70);
  }
  ellipse( x, y + 50, 175, 125 );
}

//MAIN TV MONSTER
function makeTVBase( x, y, clr )
{
  // outer TV
  strokeWeight(3);
  fill(0, 0, 0);
  rectMode( CENTER );
  rect( x, y, 100, 100 );
  
  // inner TV (the screen)
  //fill(255, 237, 220);
  fill( clr );
  rectMode( CENTER );
  rect( x, y, 80, 80 );
}

//Antennas + Face
function makeTVAccents( x, y, pwr )
{
  //Antennas
  //antenna lines
  strokeWeight(2);
  line( x, y - 50, x - 37.5, y - 87.5 );
  line( x, y - 50, x + 25, y - 62.5 );
  //antenna tips
  strokeWeight(pwr + 5);
  point( x - 37.5, y - 87.5 );
  point( x + 25, y - 62.5 );
  
  //If it is a powerful monster.. it has extended
  //antennas
  if(pwr >= 6)
  {
    strokeWeight(2);
    line( x, y - 50, x - 50, y - 100 );
    line( x, y - 50, x + 37.5, y - 75 );
    strokeWeight(pwr + 10);
    point( x - 50, y - 100 );
  	point( x + 37.5, y - 75 );
  }
  
  // frown
  strokeWeight(2);
  noFill();
  arc( x, y + 25, 50, 25, PI, 2*PI );
  
  // eyes
  fill(98, 255, 0);
  ellipse( x - 18.75, y - 12.5, 12.5, 12.5 );
  ellipse( x + 18.75, y - 12.5, 12.5, 12.5 );
  
  // eyebrows
  line( x - 30, y - 30, x - 7.25, y - 18.75 );
  line( x + 30, y - 30, x + 7.25, y - 18.75 );
}

//Create ALL the Orbital Monsters for One Single Monster
function makeAllOMs( x, y, pwr )
{
  //Obtain the Global Position OffSet (All Monsters)
  //An Array of [X, Y]
  var globalOffSet = calculateGlobalOffSet();
  
  //Create a Very Slight Difference of Offset For a Little Variation
  //In Orbital Monsters Position Relative to the "Main" Monster
  var newOffSetX = globalOffSet[0] - pwr;
  var newOffSetY = globalOffSet[1] - pwr;
  
  //ALL "Possible" Orbital Monsters (OM) Positions
  //OM 1 Positions
  var om1X = x - 75 - newOffSetX;
  var om1Y = y - 125 + newOffSetY;
  var om1C = color( 45*pwr, 15*pwr, 25 );
  
  //OM 2 Positions
  var om2X = x - 125 - newOffSetX;
  var om2Y = y - 25 + newOffSetY;
  var om2C = color( 25, 15*pwr, 45*pwr );
  
  //OM 3 Positions
  var om3X = x + 75 - newOffSetX;
  var om3Y = y - 75 - newOffSetY;
  var om3C = color( 15*pwr, 45*pwr, 25 );
  
  //OM 4 Positions
  var om4X = x + 175 - newOffSetX;
  var om4Y = y - 25 - newOffSetY;
  var om4C = color( 45*pwr, 45*pwr, 185 );
  
  //Check "Power" to See How Many Orbital Monsters to Draw
  if( pwr > 0 )
  {
    makeOM( om1X, om1Y, om1C );
  }
  
  if( pwr > 1 )
  {
    makeOM( om2X, om2Y, om2C );
  }
  
  if( pwr > 2 )
  {
    makeOM( om3X, om3Y, om3C );
  }
  
  if( pwr > 3 )
  {
    makeOM( om4X, om4Y, om4C );
  }
}

//Create a Single Orbit Monster
function makeOM( xPos, yPos, c)
{
  fill( c );
  ellipse( xPos, yPos, 50, 50 );
  // IRIS
  fill(118, 166, 178);
  ellipse( xPos, yPos, 40, 25 );
  // PUPIL
  fill(204, 200, 155);
  ellipse( xPos, yPos, 7.5, 25 );
}

//Calculate the Global Position OffSet as an Array of [X, Y]
function calculateGlobalOffSet()
{
  //Calculate the Global OffSet of the Oribital Monsters X-Position
  //so that they can move back and forth
  if( directionX( offSetX ) )
  {
    offSetX += 1;
  }
  else
  {
    offSetX -= 1;
  }
  
  //Calculate the Global OffSet of the Oribital Monsters Y-Position
  //so that they can move up and down  
  if( directionY( offSetY ) )
  {
    offSetY += 1;
  }
  else
  {
    offSetY -= 1;
  }
  
  //Calculation Storage
  var globalOffSet = [ offSetX, offSetY ];
  return globalOffSet;
}

//Calculate whether a monster reaches the "max"
//or "min" point of their horizontal movement
//so that they can switch directions
function directionX( current )
{
  if( current == maxOSX )
  {
    offSetX -= 1;
    left = false;
  }
  else if( current == 0 )
  {
    left = true;
  }
  return left;
}

//Calculate whether a monster reaches the "max"
//or "min" point of their vertical movement
//so that they can switch directions
function directionY( current )
{
  if( current == maxOSY )
  {
    offSetY -= 1;
    down = false;
  }
  else if( current == 0 )
  {
    down = true;
  }
  return down;
}

//Create a New Monster on the Monster List and add
//them to the Screen
function addMonster( numOfMonsters )
{
  //Tests to see if MAX of 8 is reached
  //If so, Leave the Function immediately
  if( numOfMonsters > 8 )
  {
    return;
  }
  
  //Create the Array of Attributes for the New Monster
  var newMonster = [];
  
  //Add them to the Monster List
  monsterList[ numOfMonsters ] = newMonster;
  
  //Monster ID
  newMonster[ 0 ] = numOfMonsters;
  //Monster X
  newMonster[ 1 ] = random( -150, 350 );
  //Monster Y
  newMonster[ 2 ] = random( -100, 300 );
  //Monster Color
  newMonster[ 3 ] = color( random(255), random(255), random(255) );
  //Monster Power (Number of Orbital Monsters)
  newMonster[ 4 ] = random( 0, 7 )
  monsterCount++;
}

function keyTyped()
{
  //Add a Monster with SpaceBar Press
  if( key == ' ' )
  {
    addMonster( monsterCount );
    
    //Playful User Alert
    console.log( "Increased Energy Field... Overloading" );
    //Note Telling them of the Maximum 8 Monsters and the current count
    console.log( monsterCount + "/8" );
  }
  if( monsterCount > 8 )
  {
    //Reset Monster Count to allow Monster List to be Overwritten
    monsterCount = 3;
    //Playful User Alert regarding Monster Reset
    console.log( "ENERGY FIELD OVERLOADED" );
    console.log("xxx");
    //Display StartUp Message
    console.log("Command Center XYZ: " );
  	console.log("...");
  }
  
}

