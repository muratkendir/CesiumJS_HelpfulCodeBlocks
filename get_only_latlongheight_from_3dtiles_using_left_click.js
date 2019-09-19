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

viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement)
    {
    var pickedFeature = viewer.scene.pick(movement.position);
     if (!Cesium.defined(pickedFeature))
         {
         // nothing picked
         return;
         }
    var worldPosition = viewer.scene.pickPosition(movement.position);
    var cartoposition = Cesium.Cartographic.fromCartesian(worldPosition);
    console.log(
        'Longitude: '+
        Cesium.Math.toDegrees(cartoposition.longitude).toFixed(7)+
        '  Latitude: '+
        Cesium.Math.toDegrees(cartoposition.latitude).toFixed(7)+
        ' Ellipsoidal Height: '+
        cartoposition.height.toFixed(2)
    );
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK
);
