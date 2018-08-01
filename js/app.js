 var map;
 var infowindow;
 var containerElements;
 var boxRest;
 var card;

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
        
        
         var h5 = document.createElement("h5");
         var div = document.createElement("div");
         var img = document.createElement("img");
         var src = document.createAttribute("src");
         var div2 = document.createElement("div");
         var dataToggle = document.createAttribute("data-toggle");
         var dataTarget = document.createAttribute("data-target");
         var dataName = document.createAttribute("data-name");
         var dataDirection = document.createAttribute("data-direccion");
         var openNow = document.createAttribute("data-open");
         var rating =  document.createAttribute("data-rating");
         var id = document.createAttribute("id");
        
         containerElements.classList.add("card-deck")
         

         h5.classList.add("card-title");
         div.classList.add("card");

         div.className += " col-md-3";
         img.classList.add("card-img-top");
         src.value = "comidaMexican.jpg";
         dataToggle.value = "modal";
         dataTarget.value = ".bd-example-modal-lg";
         dataName.value = results[i].name;
         dataDirection.value = results[i].vicinity;
         openNow.value = results[i].opening_hours.open_now;
         rating.value = results[i].rating;
         id.value = "box-rest";


         div.setAttributeNode(dataToggle);
         div.setAttributeNode(dataTarget);
         div.setAttributeNode(dataName);
         div.setAttributeNode(dataDirection);
         div.setAttributeNode(openNow);
         div.setAttributeNode(rating);
         div.setAttributeNode(id);
         div2.classList.add("card-body");

        img.setAttributeNode(src);
         h5.textContent = results[i].name;

        containerElements.appendChild(div);
        div.appendChild(h5);
        div.appendChild(img);
        div.appendChild(div2);
        div2.appendChild(h5);


        
       div.addEventListener("click", function() {
        
         var restaurante = this.dataset.name;
         var direccion = this.dataset.direccion;
         var open = this.dataset.open;
         var rating = this.dataset.rating;

         var etiquetH1 = document.getElementById("nombreRest");
         var addres = document.getElementById("addres");
         var especiality = document.getElementById("especiality");
         var price = document.getElementById("price");
         var ranking = document.getElementById("ranking");
         var openNow = document.getElementById("openNow");

         etiquetH1.textContent = restaurante;
         addres.textContent = direccion;
         especiality.textContent = "Tacos Mexicanos";
         price.textContent = " S/. 50";
         ranking.textContent = rating;
         openNow.textContent = open;

       })

       var input = document.getElementById("input");



        input.addEventListener("keyup", function() {
          debugger

          var textoIngresado = this.value;
          console.log(textoIngresado);
          $('.card').hide();
          $('.card').each(function(){
            
            var search = $(this).text().toLowerCase();
            if (search.indexOf(textoIngresado) !== -1) {
              $(this).show();
            }
          });

        })

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