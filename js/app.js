 var map;
 var infowindow;
 var containerElements;
//  var nameRestaurant;
//  var imgRestaurant;

 function initMap() {
 // Creamos un mapa con las coordenadas actuales
   navigator.geolocation.getCurrentPosition(function(pos) {

   lat = pos.coords.latitude;
   lon = pos.coords.longitude;

   var myLatlng = new google.maps.LatLng(lat, lon);

   var mapOptions = {
     center: myLatlng,
     zoom: 16,
     mapTypeId: google.maps.MapTypeId.SATELLITE
   };

   map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);
   containerElements = document.getElementById("containerElements");
  //  nameRestaurant = document.getElementById("nameRestaurant");
  //  imgRestaurant = document.getElementById("imgRestaurant");

   // Creamos el infowindow
   infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   var request = {
     location: myLatlng,
     radius: 400,
     types: ['restaurant']
   };


   // Creamos el servicio PlaceService y enviamos la petición.
   var service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, function(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);

       for (var i = 0; i < results.length; i++) {
         debugger
         var h5 = document.createElement("h5");
         var div = document.createElement("div");
         var img = document.createElement("img");
         var src = document.createAttribute("src");
         var div2 = document.createElement("div");
        
         containerElements.classList.add("card-deck")
         

         h5.classList.add("card-title");
         div.classList.add("card");

         containerElements.className += " ";
         div.className += " col-md-3 ";
         img.classList.add("card-img-top");
         src.value = "comidaMexican.jpg";
         div2.classList.add("card-body");

        img.setAttributeNode(src);
         h5.textContent = results[i].name;

        containerElements.appendChild(div);
        div.appendChild(h5);
        div.appendChild(img);
        div.appendChild(div2);
        div2.appendChild(h5);


        console.log(results[i].geometry);
        console.log(results[i].icon);
        console.log(results[i].name);
        console.log(results[i].vicinity); 
        console.log(results[i].opening_hours.open_now);
        console.log(results[i].rating);

        createMarker(results[i]);
           
       }
     }
   });
 });
}


var iconBase = 'http://bennystaqueria.com/wp-content/uploads/2016/12/map-marker.png';

 function createMarker(place) {
   // Creamos un marcador
   var marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location,
     icon: iconBase
   });

 // Asignamos el evento click del marcador
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(place.name);
     infowindow.open(map, this);
   });
   }

   window.onload = initMap;






























// // Este ejemplo define un tipo de mapa de imagen usando el Gall-Peters
// // proyección.
// // https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection

// function initMap () {
//   // Crea un mapa. Usa el tipo de mapa de Gall-Peters.
//   var map = new google.maps.Map (document.getElementById ('map'), {
//     zoom: 0,
//     centro: {lat: 0, lng: 0},
//     mapTypeControl: falso
//   });

//   initGallPeters ();
//   map.mapTypes.set ('gallPeters', gallPetersMapType);
//   map.setMapTypeId ('gallPeters');

//   // Muestra el lat y lng debajo del cursor del mouse.
//   var coordsDiv = document.getElementById ('coords');
//   map.controls [google.maps.ControlPosition.TOP_CENTER] .push (coordsDiv);
//   map.addListener ('mousemove', function (event) {
//     coordsDiv.textContent =
//         'lat:' + Math.round (event.latLng.lat ()) + ',' +
//         'lng:' + Math.round (event.latLng.lng ());
//   });

//   // Agrega algunos marcadores al mapa.
//   map.data.setStyle (function (feature) {
//     regreso {
//       título: feature.getProperty ('nombre'),
//       optimizado: falso
//     };
//   });
//   map.data.addGeoJson (ciudades);
// }

// var gallPetersMapType;
// function initGallPeters () {
//   var GALL_PETERS_RANGE_X = 800;
//   var GALL_PETERS_RANGE_Y = 512;

//   // Recuperar fichas de Gall-Peters almacenadas localmente en nuestro servidor.
//   gallPetersMapType = new google.maps.ImageMapType ({
//     getTileUrl: function (coord, zoom) {
//       var scale = 1 << zoom;

//       // Envuelve los mosaicos horizontalmente.
//       var x = (escala (coord.x%) + escala)% scale;

//       // No envuelva los mosaicos verticalmente.
//       var y = coord.y;
//       if (y <0 || y> = scale) return null;

//       devuelve 'https://developers.google.com/maps/documentation/' +
//              'javascript / examples / full / images / gall-peters_' + zoom +
//              '_' + x + '_' + y + '.png';
//     },
//     tileSize: new google.maps.Size (GALL_PETERS_RANGE_X, GALL_PETERS_RANGE_Y),
//     minZoom: 0,
//     maxZoom: 1,
//     nombre: 'Gall-Peters'
//   });

//   // Describe la proyección de Gall-Peters utilizada por estas fichas.
//   gallPetersMapType.projection = {
//     fromLatLngToPoint: function (latLng) {
//       var latRadians = latLng.lat () * Math.PI / 180;
//       devolver nuevo google.maps.Point (
//           GALL_PETERS_RANGE_X * (0.5 + latLng.lng () / 360),
//           GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin (latRadians)));
//     },
//     fromPointToLatLng: function (point, noWrap) {
//       var x = point.x / GALL_PETERS_RANGE_X;
//       var y = Math.max (0, Math.min (1, point.y / GALL_PETERS_RANGE_Y));

//       return new google.maps.LatLng (
//           Math.asin (1 - 2 * y) * 180 / Math.PI,
//           -180 + 360 * x,
//           noWrap);
//     }
//   };
// }

// // GeoJSON, que describe las ubicaciones y los nombres de algunas ciudades.
// var cities = {
//   tipo: 'FeatureCollection',
//   caracteristicas: [{
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [-87.650, 41.850]},
//     propiedades: {nombre: 'Chicago'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [-149.900, 61.218]},
//     propiedades: {nombre: 'Anchorage'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [-99.127, 19.427]},
//     propiedades: {nombre: 'Ciudad de México'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [-0.126, 51.500]},
//     propiedades: {nombre: 'London'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [28.045, -26.201]},
//     propiedades: {nombre: 'Johannesburgo'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [15.322, -4.325]},
//     propiedades: {nombre: 'Kinshasa'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [151.207, -33.867]},
//     propiedades: {nombre: 'Sydney'}
//   }, {
//     tipo: 'Característica',
//     geometría: {tipo: 'Punto', coordenadas: [0, 0]},
//     propiedades: {nombre: '0 ° N 0 ° E'}
//   }]
// };