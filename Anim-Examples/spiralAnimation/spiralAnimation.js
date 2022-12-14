// animation along spiral curve

var gl, program;
var points;
var moveAngle = 0;
var MAX_ANGLE = 2000;  // total number of points generated for the spiral

var modelViewMatrixLoc;
var indexLoc;

function main() {

    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var k=7;    // default values

    var points = GeneratePoints();

    //  Configure WebGL
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    indexLoc = gl.getUniformLocation(program, "index");

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function scale4(a, b, c) {
    var result = mat4();
    result[0][0] = a;
    result[1][1] = b;
    result[2][2] = c;
    return result;
}

// For the rose shape
function GeneratePoints() {
    var vertices=[];
    var k=3;  // rose has 3 petals

    vertices.push(vec2(0, 0)); // first push in the center point
    // then generate 360 points for the rose, total 361 points








    vertices.push(vec2(0, 0)); // first push in the center point
    // generate 2000 points for the spiral, total 2001 points










    return vertices;
}

// Displays the rose and the spiral track
function DrawRoseSpiral() {






    // need to pass the modelViewMatrix to webgl at some point here
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));



}

// animation :
// The 3-petal rose starts from the center of an archimedean spiral, moves along the trajectory of an archimedean spiral
// When the end of the spiral track is reached, the rose starts back from the center of the spiral again
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT );

    // Each animation step translates the rose along the spiral curve for "theta" angle








    DrawRoseSpiral();

    setTimeout(function (){requestAnimFrame(render);}, 10);  // 10 ms between animation steps
}
