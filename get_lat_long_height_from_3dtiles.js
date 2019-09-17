// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MjY0OWM1MS1iMWFmLTQ3YWEtYWJjOS02YmQwOTJmMWVhODEiLCJpZCI6NzQyMywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0OTM1ODY0MX0.bWXdTNtZ_IcmsgquKKsEUbc04RaM9XWdX4oE2U5HcWo';

var viewer = new Cesium.Viewer('cesiumContainer',{
    terrainProvider : new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(31675)
    })
});

var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(33648)
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
            var cartesian = viewer.scene.pickPosition(movement.endPosition);
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
            var heightString = cartographic.height.toFixed(2);
            console.log('Lon: '+longitudeString+' Lat: '+latitudeString+' h: '+heightString);
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);