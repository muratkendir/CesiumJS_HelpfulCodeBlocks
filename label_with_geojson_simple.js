var viewer = new Cesium.Viewer('cesiumContainer');

var promise = Cesium.GeoJsonDataSource.load('../../../../Apps/SampleData/simplestyles.geojson');
promise.then(function(dataSource) {
    var labels = viewer.scene.primitives.add(new Cesium.LabelCollection());

    // Get the array of entities
    var entities = dataSource.entities.values;
    
    for( var i=0;i<=entities.length;i++)
    {
        var entity = entities[i];
        var entityposition = entity.position._value;
        var entityname = entity.name;
        var entitycolor = entity.properties["marker-color"]._value;
        labels.add({
          position : entityposition,
          text : entityname,
          fillColor : Cesium.Color.fromCssColorString(entitycolor)
        });
    } 
});
