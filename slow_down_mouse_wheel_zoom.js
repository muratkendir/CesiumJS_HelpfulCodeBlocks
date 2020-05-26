var viewer = new Cesium.Viewer("cesiumContainer");
//Based code on https://gist.github.com/scothis

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
    var cameraHeight, directionToZoom, zoomAmount, maximumHeight;
    if (mousePosition) {
        maximumHeight = viewer.scene.globe.ellipsoid.maximumRadius * 4;
        cameraHeight = viewer.camera.positionCartographic.height || maximumHeight;
        directionToZoom = viewer.camera.getPickRay(mousePosition).direction;
        zoomAmount = wheelZoomAmount * cameraHeight / 2000;
        viewer.camera.move(directionToZoom, zoomAmount);
    }
}, Cesium.ScreenSpaceEventType.WHEEL);
