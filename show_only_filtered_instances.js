// A simple demo of 3D Tiles feature picking with hover and select behavior
// Building data courtesy of NYC OpenData portal: http://www1.nyc.gov/site/doitt/initiatives/3d-building.page
var viewer = new Cesium.Viewer('cesiumContainer'/*, {
    terrainProvider: Cesium.createWorldTerrain()
}*/);

// Load the NYC buildings tileset
var tileset = new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(5741) });

tileset.style = new Cesium.Cesium3DTileStyle({
        show: {
            conditions: [
                ['${height} >= 150', true],
                ['${height} < 150', false]
            ]
        }
    });


tileset.readyPromise.then(function(tileset) {
    viewer.scene.primitives.add(tileset);
    viewer.zoomTo(tileset);
}).otherwise(function(error) {
    console.log(error);
});
