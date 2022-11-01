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
var program;
var gl;
var canvas;

function main()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var center = vec2(0.0, 0.0); // center of circle
    var radius = 0.5;
    // Generate the points for the 3 components of the planet
    GenerateBackCircles(center, radius);
    // GenerateCircle(center, radius);
    console.log("calculated points: " + {points});
    // GenerateFrontCircles();
    // modelViewMatrix = mat4();
    // projectionMatrix = ortho(-8, 8, -8, 8, -1, 1);
    gl.viewport( 0, 0, canvas.width, canvas.height );
    // gl.clearColor( 0.2, 0.2, 0.5, 1.0 );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

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
    // modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    // projectionMatrixLoc= gl.getUniformLocation(program, "projectionMatrix");

    render();
}

function scale4(a, b, c) {
   	var result = mat4();
   	result[0][0] = a;
   	result[1][1] = b;
   	result[2][2] = c;
   	return result;
}

function GenerateBackCircles(center, radius)
{

	SIZE=100; // slices
	var angle = Math.PI/SIZE;
    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
    // to draw SIZE line segments 
	for (var i=0; i<SIZE+1; i++) {
	    console.log(center[0]+radius*Math.cos(i*angle));
	    points.push([center[0]+radius*Math.cos(i*angle), 
		        center[1]+radius*Math.sin(i*angle)]);
        colors.push(vec4(0.27, 0.16, 0.06, 1)); // red
	}
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

function GenerateCircle(center, radius)
{

    // var S = scale4(1,1.618,1)
}

function GenerateFrontCircles()
{



}


function DrawFullPlanet()
{

    // Draw Back Circles

    // blue circle
    // gl.uniform1i(gl.getUniformLocation(program, "colorIndex"), 2);
    // gl.drawArrays( gl.TRIANGLE_FAN, 0, SIZE+2);
    // gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
    // draw planet circle

 
    // Draw Front Circles

}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.vertexAttrib3f(program, points, colors, 0.0)
    gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
    // gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // DrawFullPlanet();
}
