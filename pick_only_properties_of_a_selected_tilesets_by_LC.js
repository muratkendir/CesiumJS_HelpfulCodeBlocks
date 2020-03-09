// Grant CesiumJS access to your ion assets
//Cesium.Ion.defaultAccessToken = 'XXX';

var viewer = new Cesium.Viewer('cesiumContainer');

var tileset1 = new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(80027)
    });

viewer.scene.primitives.add(tileset1);
var tileset2 = new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(69944)
    });
tileset2.style = new Cesium.Cesium3DTileStyle({
        color: 'rgba(255, 255, 255, 0.1)'
    });
viewer.scene.primitives.add(tileset2);

viewer.zoomTo(tileset2).otherwise(
    function (error) {
    console.log(error);
});

var scene = viewer.scene;
if (!scene.pickPositionSupported) {
    console.log('This browser does not support pickPosition.');
}

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (result) {
    
    var pickedObjects = viewer.scene.drillPick(result.position);
    if (pickedObjects.length >= 1) {
        for (var j = 0; j < pickedObjects.length; j++) {

            if (pickedObjects[j].tileset === tileset1) {
                console.log(j);
            } else {
                pickedObjects.splice(j, 1);
            }
        }
        
        var feature = pickedObjects[0];
        console.dir(feature);

        if (feature instanceof Cesium.Cesium3DTileFeature) {
            var propertyNames = feature.getPropertyNames();

            var length = propertyNames.length;
            for (var i = 0; i < length; ++i) {
                var propertyName = propertyNames[i];
                console.log(propertyName + ': ' + feature.getProperty(propertyName));
            }
        }

    }

}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
