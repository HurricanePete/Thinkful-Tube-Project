var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div class="result-panes">' +
    '<a class="js-result-link" href="" target="_blank"><img class="js-result-thumb" src="" target="_blank"></img></a>' +
    //'<p>Number of watchers: <span class="js-watchers-count"></span></p>' + 
    //'<p>Number of open issues: <span class="js-issues-count"></span></p>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyBIT_ulhAEbygGAVVf942R-t8o1e87OaGU',
      q: searchTerm + " in:name",
      per_page: 5
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


function renderResult(result) {
  var youtubeWatch = 'https://www.youtube.com/watch?v='
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-link").attr("href", youtubeWatch + result.id.videoId);
  template.find(".js-result-thumb").attr("src", result.snippet.thumbnails.default.url);
  //template.find(".js-watchers-count").text(result.watchers_count);
  //template.find(".js-issues-count").text(result.open_issues);
  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

//https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBIT_ulhAEbygGAVVf942R-t8o1e87OaGU&q=thinkful%20in:name&page=1&per_page=5