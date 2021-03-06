// Grant CesiumJS access to your ion assets
//Cesium.Ion.defaultAccessToken = 'XXX';

var viewer = new Cesium.Viewer('cesiumContainer');

var tileset1 = 
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(5741)
    });

viewer.scene.primitives.add(tileset1);
var tileset2 = 
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(5741)
    });

viewer.scene.primitives.add(tileset2);

viewer.zoomTo(tileset2)
    .otherwise(function (error) {
        console.log(error);
    });

var scene = viewer.scene;
if (!scene.pickPositionSupported) {
    console.log('This browser does not support pickPosition.');
}

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(result) {
    var feature = viewer.scene.pick(result.position);
    if (feature.tileset === tileset1){
    if (feature instanceof Cesium.Cesium3DTileFeature) {
        var propertyNames = feature.getPropertyNames();
        
        var length = propertyNames.length;
        for (var i = 0; i < length; ++i) {
            var propertyName = propertyNames[i];
            console.log(propertyName + ': ' + feature.getProperty(propertyName));
        }
    }}
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
