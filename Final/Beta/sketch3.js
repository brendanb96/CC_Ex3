var offSetX = 0.0;
var offSetY = 0.0;
var maxOSX = 15.0;
var maxOSY = 50.0;
var left = true;
var down = true;
var positive = true;
// Make a "center" variable to avoid needless math operations 
// and to make all locations easier to comprehend
// var centerX = 0;
// var centerY = 0;
var orbitNum = 4;
var monsterAtr = [];
var monsterCount = 1;
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
//Monster Power (Number of Orbital Monsters)
monsterAtr[ 4 ] = 0;


//Initialize:

monsterList[ 0 ] = monsterAtr;

function setup()
{
  createCanvas(500, 500);
  smooth();
  // centerX = width/2;
  // centerY = height/2;
}

function draw()
{
  background(255, 255, 255);
  translate( 200, 200 );
  
  //Default Monster
  if( monsterAtr[ 0 ] == 0 )
  {
    //Monster X
    monsterAtr[ 1 ] = width/8;
    //Monster Y
    monsterAtr[ 2 ] = height/8;
    //Monster Color
    monsterAtr[ 3 ] = color( 255, 237, 220 );
    //Monster Power (Number of Orbital Monsters)
    monsterAtr[ 4 ] = 4;
  }
  
  
  drawAllMonsters();
  console.log(width);
  
  // if( keyPressed )
  // {
  //   if( key == CODED )
  //   {
  //     if( key == UP )
  //     {
  //     translate( 0, -10 );
  //     }
  //   }
  // }
  
  //if( keyPressed )
  //{
  //  if( key == ' ' )
  //  {
  //    orbitNum += 1;
  //    if( orbitNum > 16 )
  //    {
  //      orbitNum = 4;
  //    }
  //  }
  //}
  
  //if( key == ' ' )
  //{
  //  orbitNum += 1;
  //  if( orbitNum > 16 )
  //  {
  //    orbitNum = 4;
  //  }
  //}
  
  // Calculate the offset of the Oribital Monsters x-position
  // so that they can move back and forth
//   if( directionX( offSetX ) )
//   {
//     offSetX += 1;
//   }
//   else
//   {
//     offSetX -= 1;
//   }
  
//   // Calculate the offset of the Oribital Monsters y-position
//   // so that they can move up and down  
//   if( directionY( offSetY ) )
//   {
//     offSetY += 1;
//   }
//   else
//   {
//     offSetY -= 1;
//   }
}

function addMonster( numOfMonsters )
{
  if( numOfMonsters > 8 )
  {
    return;
  }
  var newMonster = [];
  //Initialize:
  //Monster ID
  newMonster[ 0 ] = 0;
  //Monster X
  newMonster[ 1 ] = 0;
  //Monster Y
  newMonster[ 2 ] = 0;
  //Monster Color
  newMonster[ 3 ] = 0;
  //Monster Power (Number of Orbital Monsters)
  newMonster[ 4 ] = 0;
  
  monsterList[ numOfMonsters ] = newMonster;
  //Monster ID
  newMonster[ 0 ] = numOfMonsters;
  //Monster X
  newMonster[ 1 ] = random( 500 );
  //Monster Y
  newMonster[ 2 ] = random( 500 );
  //Monster Color
  newMonster[ 3 ] = color( random(255), random(255), random(255) );
  //Monster Power (Number of Orbital Monsters)
  newMonster[ 4 ] = random( 0, 7 )
  monsterCount++;
}

function drawAllMonsters()
{
  for( var i = 0; i < monsterCount; i++ )
  {
    //"Current" Monsters Attributes
    var atr = monsterList[ i ];
    createMonster( atr[1], atr[2], atr[3], atr[4] );
  }
}

//makes a new monster
function createMonster( x, y, clr, pwr )
{
  makeTVMonster( x, y, clr, pwr );
  makeAllOMs( x, y, pwr );
}

//makes TV portion of monster
function makeTVMonster( x, y, clr, pwr )
{
  makeDisk( x, y, pwr );
  makeTVBase( x, y, clr );
  makeTVAccents( x, y, pwr );
}

function makeTVBase( x, y, clr )
{
  // MAIN TV MONSTER
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

function makeTVAccents( x, y, pwr )
{
  // antennas
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

function makeDisk( x, y, pwr )
{
  // FLOATING DISK
  // Disk Edges
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

//Create ALL the Orbital Monsters
function makeAllOMs( x, y, pwr )
{
  // ALL Orbital Monsters (OM) Positions
  // OM 1 Positions
  var om1X = x - 75 - offSetX;
  var om1Y = y - 125 + offSetY;
  var om1C = color( 45*pwr, 15*pwr, 25 );
  
  // OM 2 Positions
  var om2X = x - 125 - offSetX;
  var om2Y = y - 25 + offSetY;
  var om2C = color( 25, 15*pwr, 45*pwr );
  
  //OM 3 Positions
  var om3X = x + 75 - offSetX;
  var om3Y = y - 75 - offSetY;
  var om3C = color( 15*pwr, 45*pwr, 25 );
  
  // OM 4 Positions
  var om4X = x + 175 - offSetX;
  var om4Y = y - 25 - offSetY;
  var om4C = color( 45*pwr, 45*pwr, 185 );
  
  //var excessMonsters = orbitNum - 4;
  
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
  
  //for( int e = excessMonsters; e > 4; e-- )
  //{
  //  color omRandC = color( 255 , 55 , 55 );
  //  makeOM( om1X + e, om2Y + e, omRandC );
  //}
}

//Create 1 Orbit Monster
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

//void keyPressed()
//{
//  if( key == CODED )
//  {
//    if( key == UP )
//    {
//      translate( 0, -10 );
//    }
//  }
//}

function keyTyped()
{
  if( key == ' ' )
  {
    addMonster( monsterCount );
  } 
}

// Calculate whether a monster reaches the "max"
// or "min" point of their horizontal movement
// so that they can switch directions
// function directionX( current )
// {
//   if( current == maxOSX )
//   {
//     maxOSX += 1;
//     left = false;
//   }
//   else if( current == 0 )
//   {
//     left = true;
//   }
//   return left;
// }

// Calculate whether a monster reaches the "max"
// or "min" point of their vertical movement
// so that they can switch directions
// function directionY( current )
// {
//   if( current == maxOSY )
//   {
//     maxOSY += 1;
//     down = false;
//   }
//   else if( current == 0 )
//   {
//     down = true;
//   }
//   return down;
// }