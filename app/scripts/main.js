(function(){
  var url = "https://api.flickr.com/services/rest"

  var _appendToDoodle = function(photos) {
    $.each(photos, function( i, varient ) {
      var url = varient.url_k || varient.url_o,
        height = varient.height_k || varient.height_o,
        width = varient.width_k || varient.width_o;
      var img = $( "<img class='lazy' data-original='"+ url + "' height='"+ height + "px' width='" + width +"px'/>").appendTo( "#doodles" );
    })
    $("img.lazy").lazyload({
      effect : "fadeIn",
      skip_invisible : true
    });
  }


  var _getData = function() {
    $.getJSON(url, {
        method: "flickr.photosets.getPhotos",
        api_key: "854eda8a22ce0fc41ef727a252fa6edb",
        photoset_id: "72157660277959374",
        user_id: "107302365@N05",
        extras: "date_upload, url_k, url_o",
        nojsoncallback: true,
        format: "json"
      })
      .done(function( data ) {
        var photos = data.photoset.photo

        photos.sort(function (a, b) {
          if (a.dateupload > b.dateupload) {
            return -1;
          }
          if (a.dateupload < b.dateupload) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        _appendToDoodle(photos)
      });
  }

  _getData()

})();
