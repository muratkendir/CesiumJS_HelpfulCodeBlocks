var viewer = new Cesium.Viewer('cesiumContainer', {
    vrButton : true
});

viewer.vrButton.viewModel.command();

var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(19365)
    })
);


var scene = viewer.scene;
var canvas = viewer.canvas;
var ellipsoid = scene.globe.ellipsoid;

var initialPosition = new Cesium.Cartesian3(-1111583.3721328347, -5855888.151574568, 2262561.444696748);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(100.0, 0.0, 0.0);
viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation,
    endTransform: Cesium.Matrix4.IDENTITY
});

canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
// disable the default event handlers
scene.screenSpaceCameraController.enableRotate = false;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableZoom = false;
scene.screenSpaceCameraController.enableTilt = false;
scene.screenSpaceCameraController.enableLook = false;

var startMousePosition;
var mousePosition;
var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false
};

var handler = new Cesium.ScreenSpaceEventHandler(canvas);

handler.setInputAction(function(movement) {
    flags.looking = true;
    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

handler.setInputAction(function(movement) {
    mousePosition = movement.endPosition;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function(position) {
    flags.looking = false;
}, Cesium.ScreenSpaceEventType.LEFT_UP);

function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
    case 'W'.charCodeAt(0):
        return 'moveForward';
    case 'S'.charCodeAt(0):
        return 'moveBackward';
    case 'Q'.charCodeAt(0):
        return 'moveUp';
    case 'E'.charCodeAt(0):
        return 'moveDown';
    case 'D'.charCodeAt(0):
        return 'moveRight';
    case 'A'.charCodeAt(0):
        return 'moveLeft';
    default:
        return undefined;
    }
}

document.addEventListener('keydown', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = true;
    }
}, false);

document.addEventListener('keyup', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = false;
    }
}, false);

viewer.clock.onTick.addEventListener(function(clock) {
    var camera = viewer.camera;
	camera.frustum.fov = Cesium.Math.RADIANS_PER_DEGREE*95;
    if (flags.looking) {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        var x = (mousePosition.x - startMousePosition.x) / width;
        //var y = -(mousePosition.y - startMousePosition.y) / height;

        var lookFactor = 0.03;
        camera.lookRight(x * lookFactor);
        //camera.lookUp(y * lookFactor);
    }

    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
	var MAX_HEIGHT = 250000;
	var MIN_EASTING = 0.45;
    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
	//var cameraEasting = ellipsoid.cartesianToCartographic(camera.position).longitude;
	//console.log('Easting: '+ cameraEasting );
	//var heightFromMax = cameraHeight - MAX_HEIGHT;
	//var longitudeFromMin = cameraEasting - MIN_EASTING;
	
	/*if (longitudeFromMin < 0) {
		viewer.scene.camera.moveRight(moveRate);  
	}
	
	if (heightFromMax > 0) {
        viewer.scene.camera.moveForward(moveRate);
    }*/
	
    var moveRate = 0.05;

    if (flags.moveForward) {
        camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
        camera.moveBackward(moveRate);
    }
    if (flags.moveUp) {
        camera.moveUp(moveRate);
    }
    if (flags.moveDown) {
        camera.moveDown(moveRate);
    }
    if (flags.moveLeft) {
        camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
        camera.moveRight(moveRate);
    }
});
