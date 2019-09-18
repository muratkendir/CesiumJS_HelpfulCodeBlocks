// A simple demo of 3D Tiles feature picking with hover and select behavior
// Building data courtesy of NYC OpenData portal: http://www1.nyc.gov/site/doitt/initiatives/3d-building.page
var viewer = new Cesium.Viewer('cesiumContainer', {
		terrainProvider: Cesium.createWorldTerrain()
	});

viewer.scene.globe.depthTestAgainstTerrain = true;

// Set the initial camera view to look at Manhattan
var initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753);
var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
viewer.scene.camera.setView({
	destination: initialPosition,
	orientation: initialOrientation,
	endTransform: Cesium.Matrix4.IDENTITY
});

// Load the NYC buildings tileset
var tileset = new Cesium.Cesium3DTileset({
		url: Cesium.IonResource.fromAssetId(5741)
	});
viewer.scene.primitives.add(tileset);

// HTML overlay for showing feature name on mouseover
var nameOverlay = document.createElement('div');
viewer.container.appendChild(nameOverlay);
nameOverlay.className = 'backdrop';
nameOverlay.style.display = 'none';
nameOverlay.style.position = 'absolute';
nameOverlay.style.bottom = '0';
nameOverlay.style.left = '0';
nameOverlay.style['pointer-events'] = 'none';
nameOverlay.style.padding = '4px';
nameOverlay.style.backgroundColor = 'black';

// Information about the currently selected feature
var selected = {
	feature: undefined,
	originalColor: new Cesium.Color()
};

// An entity object which will hold info about the currently selected feature for infobox display
var selectedEntity = new Cesium.Entity();

// Get default left click handler for when a feature is not picked on left click
var clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);

	// Information about the currently highlighted feature
	var highlighted = {
		feature: undefined,
		originalColor: new Cesium.Color()
	};

	// Color a feature yellow on hover.
	viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
		// If a feature was previously highlighted, undo the highlight
		if (Cesium.defined(highlighted.feature)) {
			highlighted.feature.color = highlighted.originalColor;
			highlighted.feature = undefined;
		}
		// Pick a new feature
		var pickedFeature = viewer.scene.pick(movement.endPosition);
		if (!Cesium.defined(pickedFeature)) {
			nameOverlay.style.display = 'none';
			return;
		}
		// A feature was picked, so show it's overlay content
		nameOverlay.style.display = 'block';
		nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
		nameOverlay.style.left = movement.endPosition.x + 'px';
		var name = pickedFeature.getProperty('name');
		if (!Cesium.defined(name)) {
			name = pickedFeature.getProperty('id');
		}
		nameOverlay.textContent = name;
		// Highlight the feature if it's not already selected.
		if (pickedFeature !== selected.feature) {
			highlighted.feature = pickedFeature;
			Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
			pickedFeature.color = Cesium.Color.YELLOW;
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


