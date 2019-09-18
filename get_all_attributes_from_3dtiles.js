var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(5741)
    })
);

viewer.zoomTo(tileset)
    .otherwise(function (error) {
        console.log(error);
    });

var scene = viewer.scene;
if (!scene.pickPositionSupported) {
    console.log('This browser does not support pickPosition.');
}

var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
// On mouse over, display all the properties for a feature in the console log.
handler.setInputAction(function(movement) {
    var feature = scene.pick(movement.endPosition);
    if (feature instanceof Cesium.Cesium3DTileFeature) {
        var propertyNames = feature.getPropertyNames();
        var length = propertyNames.length;
        for (var i = 0; i < length; ++i) {
            var propertyName = propertyNames[i];
            console.log(propertyName + ': ' + feature.getProperty(propertyName));
        }
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
