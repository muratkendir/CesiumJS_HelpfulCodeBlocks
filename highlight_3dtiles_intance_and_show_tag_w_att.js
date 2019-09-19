//Sandcastle_Begin
Cesium.Ion.defaultAccessToken = 'XXX';


// A simple demo of 3D Tiles feature picking with hover and select behavior
// Building data courtesy of NYC OpenData portal: http://www1.nyc.gov/site/doitt/initiatives/3d-building.page
var viewer = new Cesium.Viewer('cesiumContainer', {
		terrainProvider: Cesium.createWorldTerrain()
	});

viewer.scene.globe.depthTestAgainstTerrain = true;



var osman = new Cesium.Cesium3DTileStyle({
    "show" : "true",
    "color" : "color('#40E0D0')"
});

// Load the NYC buildings tileset

var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(39508)
    })
);

viewer.zoomTo(tileset)
    .otherwise(function (error) {
        console.log(error);
    });

viewer.scene.primitives.add(tileset);

tileset.style = osman;


// HTML overlay for showing feature name on mouseover
var nameOverlay = document.createElement('div');
viewer.container.appendChild(nameOverlay);
nameOverlay.className = 'backdrop';
nameOverlay.style.display = 'none';
nameOverlay.style.position = 'absolute';
nameOverlay.style.bottom = '0';
nameOverlay.style.left = '0';
nameOverlay.style['pointer-events'] = 'none';
nameOverlay.style.padding = '8px';
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
        var name = '('+ pickedFeature.getProperty('gml:description') + ') - ' + pickedFeature.getProperty('gml:name');
		if (!Cesium.defined(name)) {
			name = pickedFeature.getProperty('id');
		}
		nameOverlay.textContent = name;
		// Highlight the feature if it's not already selected.
		if (pickedFeature !== selected.feature) {
			highlighted.feature = pickedFeature;
			Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
			pickedFeature.color = Cesium.Color.CHARTREUSE;
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
