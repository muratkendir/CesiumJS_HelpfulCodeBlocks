//Data örneği (VT'den JSON formatında gelecek): 
var acarblu_extent_points = new Cesium.Cartesian3.fromDegreesArrayHeights([29.1456,41.1213,264.49,29.1437,41.1213,365.11]);
var zeytinburnu_extent_points = new Cesium.Cartesian3.fromDegreesArrayHeights([28.9011,40.9872,51.25,28.9016,40.9875,86.45]);
var maslak1453_extent_points = new Cesium.Cartesian3.fromDegreesArrayHeights([29.0146,41.1162,81.31,29.0053,41.1186,290.29]);

// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = 'XXX';

var viewer = new Cesium.Viewer('cesiumContainer',{
    terrainProvider : new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(31675)
    })
});

var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(43557)
    })
);

var kure = Cesium.BoundingSphere.fromCornerPoints
    (zeytinburnu_extent_points[0], zeytinburnu_extent_points[1]);
//console.dir(kure);

viewer.scene.camera.flyToBoundingSphere(kure, 
       {duration: 6.0, 
        offset : new Cesium.HeadingPitchRange
            (0.0, Cesium.Math.toRadians(-30),(kure.radius)*3 )});
