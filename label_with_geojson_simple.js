var viewer = new Cesium.Viewer('cesiumContainer');

var promise = Cesium.GeoJsonDataSource.load('../../SampleData/simplestyles.geojson');
promise.then(function(dataSource) {
    var entityLabelCollectionIdx = {};
    var entityLabelCollection;
    // Get the array of entities
    var entities = dataSource.entities.values;
    for( var i=0;i<=entities.length;i++)
    {
        var entity = entities[i];
        var labelEntity = {
                    label: {
                        text: entity.name,
                        font: '30px sans-serif',
                        show: true
                    }
                };
        labelEntity.position = new Cesium.Cartesian3(0,0,0);
        entityLabelCollection.push(labelEntity);
    }
    // Print all labels
        entityLabelCollection.forEach(function(item) {
            dataSource.entities.add(item);
        });
     
});





/*
// Ceisum ION Token anahtarı
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MjY0OWM1MS1iMWFmLTQ3YWEtYWJjOS02YmQwOTJmMWVhODEiLCJpZCI6NzQyMywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0OTM1ODY0MX0.bWXdTNtZ_IcmsgquKKsEUbc04RaM9XWdX4oE2U5HcWo';

var viewer = new Cesium.Viewer('cesiumContainer');
viewer.scene.terrainProvider = Cesium.createWorldTerrain();

//Cesium'a geojson ekleme (Etiketler için) BAŞ
var dataSourceCollection = new Cesium.DataSourceCollection();
var datasource = new Cesium.GeoJsonDataSource();

var dataSourceDisplay =  new Cesium.DataSourceDisplay({
        scene: viewer.scene,
        dataSourceCollection : dataSourceCollection
    });

var datasourcepromise = datasource.load('../../../../Apps/SampleData/ne_10m_us_states.topojson', {
        stroke: Cesium.Color.TRANSPARENT,
        fill: Cesium.Color.YELLOW,
        strokeWidth: 1
    });
// Data done loading
    // Processing over
	//the given entities
	var entities;
    datasourcepromise.then(function(ds) {

        var entity, positions, center,
                name, id, color, colorHash = {},
                i= 0, labelEntity, entityLabelCollection = [], entityLabelCollectionIdx = {};

        // Add the incoming data
        dataSourceCollection.add(ds);

        // Get the array of entities
        entities = ds.entities.values;

        // Loops over the entities
        for (i = 0; i < entities.length; i++) {

            // For each entity, create a random color based on the state name.
            // Some states have multiple entities, so we store the color in a
            // hash so that we use the same color for the entire state.
            entity = entities[i];
            name = entity.name;
            id = entity.id;
            color = colorHash[name];

            if (!color) {
                color = Cesium.Color.fromRandom({
                    alpha : 1.0
                });
                colorHash[name] = color;
            }
//
            //Set the polygon material to our random color.
            entity.polygon.material = color.withAlpha(0.0);

            //Remove the outlines.
            entity.polygon.outline = false;

            if (!entityLabelCollectionIdx[name]) {

                labelEntity = {
                    name: (id + "_label"),

                    label: {
                        text: name + "",
                        font: '30px sans-serif',
                        outlineWidth: 3.0,
						outlineColor: Cesium.Color.OLDLACE,
                        //fillColor: Cesium.Color.fromCssColorString('#D09DCC'),
						fillColor: Cesium.Color.OLDLACE,
                        verticalOrigin: Cesium.VerticalOrigin.TOP,
                        show: true,
                        pixelOffset: new Cesium.Cartesian2(-10.0, -10.0),
                         //translucencyByDistance: new Cesium.NearFarScalar(10.0e2, 1.0, 18.0e6, 0)
                        //pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0)
                    }
                };

                // get the state entity's polygon position
                positions = entity.polygon.hierarchy['_value'].positions;
                center = Cesium.BoundingSphere.fromPoints(positions).center;

                // set the new label according to the state position
                // labelEntity.position = new Cesium.ConstantPositionProperty(center);
                labelEntity.position = new Cesium.Cartesian3(center.x, center.y, center.z+=500);

                // store the new entity data
                entityLabelCollection.push(labelEntity);
                entityLabelCollectionIdx[name] = labelEntity;
            }
        }

        // Update all entities - does not update dynamic entities changes
        // dataSourceDisplay.update(new Cesium.JulianDate());

        // Update all entities - Updates on any entity dynamic changes
        viewer.clock.onTick.addEventListener(function(clock) {
            dataSourceDisplay.update(clock.currentTime);

        });

        // Print all labels
        entityLabelCollection.forEach(function(item) {
            datasource.entities.add(item);
        });
		});

//Cesium'a geojson ekleme (Etiketler için) - SON

*/
