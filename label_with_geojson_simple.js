var viewer = new Cesium.Viewer('cesiumContainer');

var promise = Cesium.GeoJsonDataSource.load('../../../../Apps/SampleData/simplestyles.geojson');
promise.then(function(dataSource) {
    var labels = viewer.scene.primitives.add(new Cesium.LabelCollection());

    // Get the array of entities
    var entities = dataSource.entities.values;
    
    for( var i=0;i<=entities.length;i++)
    {
        var entity = entities[i];
        var entitiyposition = entity.position._value;
        var entitiyname = entity.name;
        var entitycolor = entity.properties["marker-color"]._value;
        console.log(entitycolor);
        labels.add({
          position : entitiyposition,
          text : entitiyname,
          font: '30px sans-serif',
          fillColor : Cesium.Color.fromCssColorString(entitycolor)
        });
        
    } 
});
