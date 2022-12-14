var modelViewMatrix=mat4(); // identity
var modelViewMatrixLoc;
var projectionMatrix;
var projectionMatrixLoc;
var modelViewStack=[];

var cmtStack=[];

var points=[];
var colors=[];
var Ratio=1.618;   // ratio used for canvas and for world window

// my variables
var SIZE;
var ANGLE = 90;
var STAR_POINTS=6;		// number of points where star touches circle
var program;
var gl;
var canvas, n;
function main() {
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // ctx = canvas.getContext('2d');
    GeneratePoints();

    modelViewMatrix = mat4();
    projectionMatrix = ortho(-8, 8, -8, 8, -1, 1);

    // gl.viewport( 0, 0, Ratio, canvas.height );
    initWebGL();

    render();
}

function initWebGL() {
    // gl.viewport( 0, 0, canvas.width*Ratio, canvas.height );
    // gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc= gl.getUniformLocation(program, "projectionMatrix");
}

function scale4(a, b, c) {
   	var result = mat4();
   	result[0][0] = a;
   	result[1][1] = b;
   	result[2][2] = c;
   	return result;
}

function GeneratePoints() {
    	GeneratePlanet();
    	GenerateGhost();
        GenerateGround();
        GenerateStars();
        GenerateBackground();
}

function GenerateStars() {
    var center= vec2(0.0, 0.0);  // location of the center of the circle
    var Radius = 0.55;			// Radius of circle
    var radius = 0.25;  
	angle=2*Math.PI/(STAR_POINTS*2);	// angle between each line used to make star

	circle=1;	// flag to determine if point rendered is touching outer circle
	for (var i=STAR_POINTS/2; i<5*STAR_POINTS/2; i++) {
		if (circle) {
			points.push([center[0]+Radius*Math.cos(i*angle), center[1]+Radius*Math.sin(i*angle)]);
            colors.push(vec4(1.0, 1.0, 1.0, 1.0)); // green
			circle=0;
		}
		else {
			points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
            colors.push(vec4(1.0, 1.0, 1.0, 1.0)); // green
			circle=1;
		}
	}
}

function GenerateBackground() {
  n = 3; // The number of vertices
    // mountain vectors left --- right
    
// Close Mountains Range
  points.push(vec2(2.0, 4.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(0.5,  -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(3.5, -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));

  points.push(vec2(3.0, 5.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(1.0,  -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(5.0, -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
 //
  points.push(vec2(4.5, 6.5));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(1.5,  -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(7.5, -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));

  points.push(vec2(6.0, 5.3));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(4.0,  -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(7.5, -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));

  points.push(vec2(7.0, 5.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(4.0,  -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(10, -1.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));


  points.push(vec2(-8.0, 2.5));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(-9.5,  0.75));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(-6.5, 0.75));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));

  points.push(vec2(-6.0, 3.5));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(-7.5,  0.75));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(-4.5, 0.75));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
 //
  points.push(vec2(-4.0, 2.0));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(-5.5,  0.75));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  points.push(vec2(-2.5, 0.75));
    colors.push(vec4(0.25, 0.1, 0.1, 1.0));
  
}

function GenerateGround() {
    points.push(vec2(-415.0, -256.0));
        colors.push(vec4(0.0, 0.25, 0.0, 1.0)); // green
    points.push(vec2(-415.0,  1.2));
        colors.push(vec4(0.0, 0.25, 0.0, 1.0)); // green
    points.push(vec2(415.0, 1.2));
        colors.push(vec4(0.0, 0.25, 0.0, 1.0)); // green
    points.push(vec2(415.0, -256.0));
        colors.push(vec4(0.0, 0.25, 0.0, 1.0)); // green
}

function GeneratePlanet() {

    var radius = 0.65;
    var center = vec2(0.0, 0.0); // center of circle
	SIZE=100; // slices
	var angle = Math.PI/SIZE;
    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
    // to draw SIZE line segments 
	for (var i=0; i<SIZE+1; i++) {
	    // console.log(center[0]+radius*Math.cos(i*angle));
	    points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
        colors.push(vec4(1.0, 0.0, 1.0, 1.0)); // red
	}

    var radius = .85;
	//SIZE=100; // slices
	//var angle = Math.PI/SIZE;
    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
    // to draw SIZE line segments 
	for (var i=0; i<SIZE+1; i++) {
	    // console.log(center[0]+radius*Math.cos(i*angle));
	    points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
        colors.push(vec4( 1.0, 0.5, 0.0, 1.0 )); // red
	}

    var radius = 0.75;
	//SIZE=100; // slices
	//var angle = Math.PI/SIZE;
    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
    // to draw SIZE line segments 
	for (var i=0; i<SIZE+1; i++) {
	    // console.log(center[0]+radius*Math.cos(i*angle));
	    points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
        colors.push(vec4(0.0, 1.0, 0.0, 1.0)); // green
	}

    var radius = 0.95;
	//SIZE=100; // slices
	//var angle = Math.PI/SIZE;
    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
    // to draw SIZE line segments 
	for (var i=0; i<SIZE+1; i++) {
	    // console.log(center[0]+radius*Math.cos(i*angle));
	    points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
        colors.push(vec4( 0.0, 0.9, 0.9, 1.0 )); // red
	}

	var Radius=1.0;
	var numPoints = 80;

	// TRIANGLE_FAN : for solid circle
	for( var i=0; i<numPoints; i++ ) {
		var Angle = i * (2.0*Math.PI/numPoints);
		var X = Math.cos( Angle )*Radius;
		var Y = Math.sin( Angle )*Radius;
	        colors.push(vec4(0.7, 0.7, 0, 1));
		points.push(vec2(X, Y));

		// use 360 instead of 2.0*PI if // you use d_cos and d_sin
	}
}

function DrawBackground() {
    modelViewMatrix = mat4();
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // firest mountain range
    gl.drawArrays( gl.TRIANGLE_FAN, 614, n );
    gl.drawArrays( gl.TRIANGLE_FAN, 617, n );
    gl.drawArrays( gl.TRIANGLE_FAN, 620, n );
    gl.drawArrays( gl.TRIANGLE_FAN, 623, n );
    gl.drawArrays( gl.TRIANGLE_FAN, 626, n );

    // farther mountain range
    gl.drawArrays( gl.TRIANGLE_FAN, 629, n );
    gl.drawArrays( gl.TRIANGLE_FAN, 632, n );
    gl.drawArrays( gl.TRIANGLE_FAN, 635, n );


}

function DrawGround() {
    // gl.viewport(-415, -256, canvas.width, canvas.height); // golden ratio viewport
    gl.viewport(0, 0, canvas.width, canvas.height); // golden ratio viewport
    console.log(canvas.width, canvas.height)
    // modelViewMatrix = mat4();
    // modelViewMatrix=mult(modelViewMatrix, scale4(-8, -4, 1));
    // modelViewMatrix=mult(modelViewMatrix, translate(-8, 4, 0));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // gl.drawArrays( gl.TRIANGLE_FAN, 598, 4 );
    gl.drawArrays( gl.TRIANGLE_FAN, 598, 4 );
}

function DrawStars() {

    modelViewMatrix = mat4();
    // gl.viewport(0, 0, Ratio, canvas.height); // golden ratio viewport
    
    
    // modelViewMatrix = mult(modelViewMatrix, rotate(180.0, 0.0, 0.0, 1.0));
    var w=canvas.width;
    var h=canvas.height/5;
    // w *= -1;
    // h *= -1;
    console.log(w, h)
    for (var i=0; i<25; i++)   {
       for (var j=0; j<25; j++) {
          var rw = Math.floor(Math.random() * (w - 2 + 1)) + 20;
          var rh = Math.floor(Math.random() * (h - 2 + 1));
          gl.viewport((i*rw)-80, 230+(j*rh), canvas.width/15, canvas.height/15);
          // modelViewMatrix = mult(modelViewMatrix, translate(1, 2, 1));
          gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
          gl.drawArrays( gl.LINE_LOOP, 602, 12);
       }
    }
    // gl.drawArrays( gl.LINE_LOOP, 0, 12 );
}

function DrawGhost() {

    gl.viewport(0, 70, 300*1.618, 300); // golden ratio viewport
    modelViewMatrix=mult(modelViewMatrix, scale4(1/10, 1/10, 1));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_LOOP, 484, 87); // body
    gl.drawArrays( gl.LINE_LOOP, 571, 6);  // mouth
    gl.drawArrays( gl.LINE_LOOP, 577, 5);  // nose

    gl.drawArrays( gl.LINE_LOOP, 582, 9);  // left eye
    gl.drawArrays( gl.TRIANGLE_FAN, 591, 7);  // left eye ball

    modelViewMatrix=mult(modelViewMatrix, translate(2.6, 0, 0));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_STRIP, 582, 9);  // right eye
    gl.drawArrays( gl.TRIANGLE_FAN, 591, 7);  // right eye ball
}

function DrawFullPlanet()
{
    // gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.viewport(-110, 260, 300*1.618, 300); // golden ratio viewport
    // Draw Back Circles
	modelViewMatrix = mult(modelViewMatrix, translate(2, 1, 0));
	modelViewMatrix=mult(modelViewMatrix, scale4(1, Ratio, 1));
	modelViewMatrix=mult(modelViewMatrix, scale4(3, 2, 1));
	modelViewMatrix = mult(modelViewMatrix, rotate(65.0, 0.0, 0.0, 1.0));
	// modelViewMatrix = mult(modelViewMatrix, rotate(25.0, 1.0, 0.0, 0.0));
	modelViewMatrix = mult(modelViewMatrix, rotate(70.0, 1.0, 0.0, 0.0));
    
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
    gl.drawArrays( gl.LINE_STRIP, SIZE+1, SIZE+1);
    gl.drawArrays( gl.LINE_STRIP, 202, SIZE+1);
    gl.drawArrays( gl.LINE_STRIP, 303, SIZE+1);

    // draw planet circle
    modelViewMatrix = mat4();

	modelViewMatrix = mult(modelViewMatrix, translate(2, 1, 0));
	modelViewMatrix=mult(modelViewMatrix, scale4(1, Ratio, 1));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	gl.drawArrays(gl.TRIANGLE_FAN, 404, 80);

    // Draw Front Circles
    modelViewMatrix = mat4();
	modelViewMatrix = mult(modelViewMatrix, translate(2, 1, 0));
	modelViewMatrix=mult(modelViewMatrix, scale4(1, Ratio, 1));
	modelViewMatrix=mult(modelViewMatrix, scale4(3, 2, 1));
	modelViewMatrix = mult(modelViewMatrix, rotate(65.0, 0.0, 0.0, 1.0));
	// modelViewMatrix = mult(modelViewMatrix, rotate(25.0, 1.0, 0.0, 0.0));
	modelViewMatrix = mult(modelViewMatrix, rotate(70.0, 1.0, 0.0, 0.0));
	modelViewMatrix=mult(modelViewMatrix, scale4(1, -1, 1));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
    gl.drawArrays( gl.LINE_STRIP, SIZE+1, SIZE+1);
    gl.drawArrays( gl.LINE_STRIP, 202, SIZE+1);
    gl.drawArrays( gl.LINE_STRIP, 303, SIZE+1);
	modelViewMatrix = mult(modelViewMatrix, translate(2, 1, 0));

}


function render() {
   gl.clear( gl.COLOR_BUFFER_BIT );
   gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
   gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

   DrawStars();
   // draw ground and sky first
   DrawGround();
   // draw stars and mountains... next

   DrawBackground();
   // then, draw planet, add rings too
   DrawFullPlanet();
   //
   // // then, draw ghost
   modelViewMatrix = mat4();
   modelViewMatrix = mult(modelViewMatrix, translate(-3, -2, 0));
   modelViewMatrix=mult(modelViewMatrix, scale4(2, 2, 1));
   gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
   DrawGhost();


   // add other things, like bow, arrow, spider, flower, tree ...

}
