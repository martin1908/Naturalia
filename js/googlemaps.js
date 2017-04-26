function initMap() {
  var position = new google.maps.LatLng(54.3491601, 18.6475975);
  var myOptions = {
    zoom: 15,
    center: position,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(
    document.getElementById("map_canvas"),
    myOptions);

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title:"This is the place."
  });  

  var contentString = 'Hello <strong>World</strong>!';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(position);
  });

}
