(function() {
  var url = "https://api.flickr.com/services/rest",
  url = "//doodle.cdn.prismic.io/api/documents/search";

  var api;

  Prismic.Api('https://doodle.prismic.io/api', function(err, Api) {
    // You can use the Api object inside this block
    api = Api
    Api.form('everything')
      .ref(Api.master())
      .query(Prismic.Predicates.at("document.type", "Post"))
      .orderings('[my.Post.date desc]')
      .submit(function(err, response) {
        // The documents object contains a Response object with all documents of type "product".
        var page = response.page; // The current page number, the first one being 1
        var results = response.results; // An array containing the results of the current page;
        // you may need to retrieve more pages to get all results
        var prev_page = response.prev_page; // the URL of the previous page (may be null)
        var next_page = response.next_page; // the URL of the next page (may be null)
        var results_per_page = response.results_per_page; // max number of results per page
        var results_size = response.results_size; // the size of the current page
        var total_pages = response.total_pages; // the number of pages
        var total_results_size = response.total_results_size; // the total size of results across all pages
        _appendToDoodle(results)
      });
  });

  var _appendToDoodle = function(photos) {
    $.each(photos, function(i, varient) {
      var url = varient.data['Post.illustration'].value.main.url,
        height = varient.data['Post.illustration'].value.main.dimensions.height,
        width = varient.data['Post.illustration'].value.main.dimensions.width,
        text = varient.data['Post.caption'].value;
      var img = "<div class='item' style='background-color: #F5F4F0;'>" +
        "<img class='lazy' data-original='" + url + "' height='" + height + "px' width='" + width + "px'/>" +
        "</div>";

      $(img)
        .appendTo("#doodles");
    })
    $("img.lazy")
      .lazyload({
        effect: "fadeIn",
        skip_invisible: true
      });
  }

})();
