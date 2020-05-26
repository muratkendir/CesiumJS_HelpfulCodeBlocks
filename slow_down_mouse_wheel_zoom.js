var viewer = new Cesium.Viewer("cesiumContainer");

var eventHandler, mousePosition;

//Standart zoom fonksiyonunu iptal eder.
viewer.scene.screenSpaceCameraController.enableZoom = false;
eventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

//İmlecin son hareket noktasının koordinatını hesaplar.
eventHandler.setInputAction(function (event) {
    mousePosition = event.endPosition;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

//Kamera yüksekliği ile tekerlek yaklaştırma katsayısını çarp, 2000'e böl, o oranda yaklaş.
eventHandler.setInputAction(function (wheelZoomAmount) {
    var cameraHeight, directionToZoom, zoomAmount;
    if (mousePosition) {
        cameraHeight = viewer.camera.positionCartographic.height;
        directionToZoom = viewer.camera.getPickRay(mousePosition).direction;
        zoomAmount = wheelZoomAmount * cameraHeight / 2000;
        viewer.camera.move(directionToZoom, zoomAmount);
    }
}, Cesium.ScreenSpaceEventType.WHEEL);
