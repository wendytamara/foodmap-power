const splash = () => {
  $('.contenBox').hide();
  // var lala = document.getElementsByClassName('contenBox');
  setTimeout (function() {
    $('.splash').hide();
    $('.contenBox').show();
  }, 2000);
}
 
$(document).ready(splash);

 let map;
 let infowindow;
 let containerElements;
 let boxRest;
 let card;
 let containerOptions;
 let valueInput;

const initMap = () => {
 // Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
   let myLatlng = new google.maps.LatLng(lat, lon);
   let mapOptions = {
     center: myLatlng,
     zoom: 16,
     mapTypeId: google.maps.MapTypeId.SATELLITE
   };
 
   map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);
   containerElements = document.getElementById("containerElements");
   containerOptions = document.getElementById("containerOptions");
   containerOptions.addEventListener("change", typeEstablishment);

   // Creamos el infowindow
   infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   let request = {
     location: myLatlng,
     radius: 700,
     types: ['restaurant']
   };
 
  function typeEstablishment() {
    $('.contenedorDeRestaurantes').empty();
    valueInput = containerOptions.value;
    let request = {
      location: myLatlng,
      radius: 400,
      types: [valueInput]
    };
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, createResults)
    createResults(results, status);    
  }

   // Creamos el servicio PlaceService y enviamos la petición.
  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, createResults)
  function createResults(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(element => {          
        let h5 = document.createElement("h5");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let src = document.createAttribute("src");
        let div2 = document.createElement("div");
        let dataToggle = document.createAttribute("data-toggle");
        let dataTarget = document.createAttribute("data-target");
        let dataName = document.createAttribute("data-name");
        let dataDirection = document.createAttribute("data-direccion");
        let openNow = document.createAttribute("data-open");
        let rating =  document.createAttribute("data-rating");
        let photoIcon = document.createAttribute("data-icon"); 
        let id = document.createAttribute("id");    
         containerElements.classList.add("card-deck")         
         h5.classList.add("card-title");
         div.classList.add("card");
         div.className += " col-sm-6 col-md-3 ";
         img.classList.add("card-img-top");
         src.value = "comidaMexican.jpg";
         dataToggle.value = "modal";
         dataTarget.value = ".bd-example-modal-lg";
         dataName.value = element.name;
         dataDirection.value = element.vicinity;
         openNow.value = element.opening_hours.open_now;
         rating.value = element.rating;
         photoIcon.value = element.icon;
         id.value = "box-rest";
         div.setAttributeNode(dataToggle);
         div.setAttributeNode(dataTarget);
         div.setAttributeNode(dataName);
         div.setAttributeNode(dataDirection);
         div.setAttributeNode(openNow);
         div.setAttributeNode(rating);
         div.setAttributeNode(id);
         div.setAttributeNode(photoIcon);
         div2.classList.add("card-body");
        img.setAttributeNode(src);
        h5.textContent = element.name;
        containerElements.appendChild(div);
        div.appendChild(h5);
        div.appendChild(img);
        div.appendChild(div2);
        div2.appendChild(h5);
       
        div.addEventListener("click", function() {      
          let restaurante = this.dataset.name;
          let direccion = this.dataset.direccion;
          let open = this.dataset.open;
          let rating = this.dataset.rating;
          let etiquetH1 = document.getElementById("nombreRest");
          let addres = document.getElementById("addres");
          let especiality = document.getElementById("especiality");
          let price = document.getElementById("price");
          let ranking = document.getElementById("ranking");
          let openNow = document.getElementById("openNow");
          etiquetH1.textContent = restaurante;
          addres.textContent = direccion;
          ranking.textContent = rating;
          openNow.textContent = open;

          if(open === 'true') {
            alert('Establecimiento abierto!!');
          }
         
       })

       let input = document.getElementById("input");
       input.addEventListener("keyup", function() {
        let textoIngresado = this.value;
        $('.card').hide();
        $('.card').each(function(){           
          let search = $(this).text().toLowerCase();
          if (search.indexOf(textoIngresado) !== -1) {
            $(this).show();
            }
          });
        })
        createMarker(element);          
      });
     }    
   }; 
 });
}


let iconBase = 'http://bennystaqueria.com/wp-content/uploads/2016/12/map-marker.png';
function createMarker(place) {
  // Creamos un marcador
  let marker = new google.maps.Marker({
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