var modelViewMatrix;
var modelViewMatrixLoc;
var projectionMatrix;
var projectionMatrixLoc;
var modelViewStack=[];

var points=[];
var colors=[];

var cmtStack=[];

var Ratio=1.618;   // ratio used for canvas and for world window

// my variables
var SIZE;
var ANGLE = 90;
var program;
var gl;
var canvas;

function main()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    modelViewMatrix = mat4();
    // Generate the points for the 3 components of the planet
    //   - generate four rings

    GeneratePoints();
    console.log("calculated points: " + points);
    projectionMatrix = ortho(-8, 8, -8, 8, -1, 1);
    gl.viewport( 0, 0, Ratio, canvas.height );

	// resize event handler
    window.onresize = function() {
       var min = window.innerWidth;

       if (window.innerHeight < min) {
          min = window.innerHeight;
       }

       if (min < canvas.width || min < canvas.height)  {
           canvas.width = min;
           canvas.height= min;

		    // version 2
           //gl.viewport(0, 0, min, min);
       }
       render();
    };

    gl.clearColor( 0.2, 0.2, 0.5, 1.0 );
    // gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    
    // Load the data into the GPU
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

    console.log(program)
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc= gl.getUniformLocation(program, "projectionMatrix");

  // Pass the data required to rotate the shape to the vertex shader
  var radian = Math.PI * ANGLE / 180.0; // Convert to radians
  var cosB = Math.cos(radian);
  var sinB = Math.sin(radian);

  var u_CosB = gl.getUniformLocation(program, 'u_CosB');
  var u_SinB = gl.getUniformLocation(program, 'u_SinB');
  if (!u_CosB || !u_SinB) {
    console.log('Failed to get the storage location of u_CosB or u_SinB');
    return;
  }
  gl.uniform1f(u_CosB, cosB);
  gl.uniform1f(u_SinB, sinB);
    render();
}

function scale4(a, b, c) {
   	var result = mat4();
   	result[0][0] = a;
   	result[1][1] = b;
   	result[2][2] = c;
   	return result;
}

function GeneratePoints() {
    GenerateBackCircles();
    GenerateCircle();
    // GenerateFrontCircles();
}

function GenerateBackCircles()
{
    var Radius = 1.3;
    SIZE = 100;
	for( var i=0; i<SIZE+1; i++ ) {
		var Angle = i * (Math.PI/SIZE);
		var X = Math.cos( Angle )*Radius;
		var Y = Math.sin( Angle )*Radius;
	        colors.push(vec4(1.0, 0.0, 1.0, 1));
		points.push(vec2(X, Y));

		// use 360 instead of 2.0*PI if // you use d_cos and d_sin
	}


 //    var center = vec2(0.0, 0.0); // center of circle
 //    var radius = 1.3;
	// SIZE=100; // slices
	// var angle = Math.PI/SIZE;
 //    // Because LINE_ST:width,RIP is used in rendering, SIZE + 1 points are needed 
 //    // to draw SIZE line segments 
	// for (var i=0; i<SIZE+1; i++) {
	//     // console.log(center[0]+radius*Math.cos(i*angle));
	//     points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
 //        colors.push(vec4(0.27, 0.16, 0.06, 1)); // red
	// }
    // var r1 = rotate(65, 50, 0, 1.0);
    // var r2 = rotate(65, 0, 0, 1.0);

	// modelViewMatrix = mult(modelViewMatrix, rotate(65.0, 50.0, 0.0, 1.0));
	// modelViewMatrix = mult(modelViewMatrix, rotate(65.0, 0.0, 0.0, 1.0));
    // modelViewMatrix = mult(mult(modelViewMatrix, r2), r1);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // center = vec2(-0.3, 0);
    // // blue yellow
    // GenerateCircle(center, radius);
    //
    // // left blend circle
    // radius=0.2;
    // center = vec2(-0.3, .75);
    // GenerateCircle(center, radius);
    //
    // // right blend circle
    // center = vec2(0.3, .75);
    // GenerateCircle(center, radius);

}

function GenerateCircle()
{
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
    // var S = scale4(1,1.618,1)
    
 //   var center = vec2(0.0, 0.0); // center of circle
 //    var radius = 1.0;
	// SIZE=100; // slices
	// var angle = 2*Math.PI/SIZE;
 //    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
 //    // to draw SIZE line segments 
	// for (var i=0; i<SIZE+1; i++) {
	//     points.push([center[0]+radius*Math.cos(i*angle), center[1]+radius*Math.sin(i*angle)]);
 //        colors.push(vec4( 1.0, 0.0, 0.0, 1.0 )); // red
	// }
	// var s = scale4(1, 1.618, 1);
    // var s2 = scale4(8,8,8);
    // var t1 = translate()
    // modelViewMatrix = mult(mult(modelViewMatrix, s), s2);
    // modelViewMatrix = mult(modelViewMatrix, s2);
}

function GenerateFrontCircles()
{



}


function DrawFullPlanet()
{
   console.log("modelViewMatrix enter drawfullplanet: " + modelViewMatrix) 
    // Draw Back Circles
	modelViewMatrix=mat4();
   console.log("modelViewMatrix create mat4: " + modelViewMatrix) 
	modelViewMatrix = mult(modelViewMatrix, translate(2, 1, 0));
	modelViewMatrix=mult(modelViewMatrix, scale4(2, 2*Ratio, 1));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
	// var s = scale4(1, Ratio, 1);
	// var r3 = rotate(0, 35, 0, 1.0);
    // modelViewMatrix=mult(modelViewMatrix, r1);
    // modelViewMatrix=mult(mult(mult(modelViewMatrix, s), r2), r1);
    // modelViewMatrix=mult(mult(mult(modelViewMatrix, r3), r2), r1);
   console.log("modelViewMatrix displayed semi circle ring: " + modelViewMatrix) 
    // draw planet circle

	// modelViewMatrix = mult(modelViewMatrix, translate(2, 1, 0));
	// modelViewMatrix=mult(modelViewMatrix, scale4(2, 2*Ratio, 1));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	gl.drawArrays(gl.TRIANGLE_FAN, SIZE+1, 80);
	// gl.vertexAttrib3f(program, points, colors, 0.0)

   console.log("modelViewMatrix displayed planet circle: " + modelViewMatrix) 

  
    // blue circle
    // gl.uniform1i(gl.getUniformLocation(program, "colorIndex"), 2);
    // gl.drawArrays( gl.TRIANGLE_FAN, 0, SIZE+2);
    // gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
    // gl.viewport( 0, 0, canvas.width/2, canvas.height);
    // gl.viewport( 0, 0, canvas.width, canvas.height);
    // gl.drawArrays( gl.LINE_STRIP, SIZE+1, SIZE+1);
 
    // Draw Front Circles

}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    // gl.viewport(0, 0, 300*1.618, 300); // golden ratio viewport
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    DrawFullPlanet();
}
