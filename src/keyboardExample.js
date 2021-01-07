var positionX = 0, positionY = -30, positionZ = 40, lookatX = 0, lookatY = 0, lookatZ = 0, upX=0, upY=1, upZ=0;


function changeCamera() {
  //var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(positionX,positionY,positionZ);
  //camera.lookAt(lookatX,lookatY,lookatZ); // or camera.lookAt(0, 0, 0);
  camera.up.set(upX,upY,upZ); // That's the default value
  camera.lookAt(lookatX,lookatY,lookatZ);
  return camera;
}

function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = changeCamera(); // Init camera in this position
  var clock = new THREE.Clock();

  // Show text information onscreen
  showInformation();

  // To use the keyboard
  var keyboard = new KeyboardState();

  // Enable mouse rotation, pan, zoom etc.
  var trackballControls = new THREE.TrackballControls(camera, renderer.domElement );

  // Show axes (parameter is size of each axis)
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(150, 150, 150)",
      side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshNormalMaterial();
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // position the cube
  cube.position.set(0.0, 0.0, 2.0);
  // add the cube to the scene
  scene.add(cube);

  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

  render();

  function keyboardUpdate() {

    keyboard.update();

    var speed = 30;
  	var moveDistance = speed * clock.getDelta();

  	if ( keyboard.pressed("left") )   positionX=positionX-1; camera = changeCamera();;
  	if ( keyboard.pressed("right") )  positionX=positionX+1; camera = changeCamera();;
    if ( keyboard.pressed("up") )     positionZ=positionZ+1; camera = changeCamera();;
  	if ( keyboard.pressed("down") )   positionZ=positionZ-1; camera = changeCamera();;

    if ( keyboard.pressed("Q") )  upX = upX -1; upZ = upZ -1;  camera = changeCamera();;
  	if ( keyboard.pressed("E") )  upX = upX +1; upZ = upZ +1;  camera = changeCamera();;

  	if ( keyboard.pressed("A") )  lookatX = lookatX -1; camera = changeCamera();;
  	if ( keyboard.pressed("D") )  lookatX = lookatX +1; camera = changeCamera();;
    if ( keyboard.pressed("W") )  lookatZ = lookatZ +1; camera = changeCamera();;
  	if ( keyboard.pressed("S") )  lookatZ = lookatZ -1; camera = changeCamera();;

  	//if ( keyboard.pressed("space") ) cube.position.set(0.0, 0.0, 2.0);
  }

  function showInformation()
  {
    // Use this to show information onscreen
    controls = new InfoBox();
      controls.add("Keyboard Example");
      controls.addParagraph();
      controls.add("Press WASD keys to move continuously");
      controls.add("Press arrow keys to move in discrete steps");
      controls.add("Press SPACE to put the cube in its original position");
      controls.show();
  }

  function render()
  {
    stats.update(); // Update FPS
    requestAnimationFrame(render); // Show events
    trackballControls.update();
    keyboardUpdate();
    renderer.render(scene, camera) // Render scene
  }
}
