var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain()
});


var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(event) {
    var position = viewer.scene.pickPosition(event.position);
    if (Cesium.defined(position)) {
        var carto = Cesium.Cartographic.fromCartesian(position);
        var lat = Cesium.Math.toDegrees(carto.latitude);
        var lon = Cesium.Math.toDegrees(carto.longitude);
        
        console.log("Getting sample...");
        var promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [carto]);
        Cesium.when(promise, function(updatedPositions) {
            console.log("Lon " + lon + "\nLat" + lat + "\nHeight " + updatedPositions[0].height);
        });
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);