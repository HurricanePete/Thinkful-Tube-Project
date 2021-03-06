var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div class="result-panes">' +
    '<a class="js-result-link" href="" target="_blank"><img class="js-result-thumb" src="" target="_blank"></img></a>' +
    '<p><span class="js-video-title"></span></p>' + 
    '<a class="js-channel-link" href="" target="_blank"><span class="js-channel-title"></span></a>' +
  '</div>'
);

var RESULT_NAV_TEMPLATE = (
  '<input class="js-nav-prev" type="button" onclick="" value="Previous Page"/><input class="js-nav-next" type="button" onclick="" value="Next Page"/>'
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
  var youtubeWatch = 'https://www.youtube.com/watch?v=';
  var channelLink = 'https://www.youtube.com/channel/';
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-link").attr("href", youtubeWatch + result.id.videoId);
  template.find(".js-result-thumb").attr("src", result.snippet.thumbnails.default.url);
  template.find(".js-video-title").text(result.snippet.title);
  template.find(".js-channel-link").attr("href", channelLink + result.snippet.channelId);
  template.find(".js-channel-title").text(result.snippet.channelTitle);
  return template;
}

//function  renderNav(data) {
  //var navPrefix = "location.href='https://www.googleapis.com/youtube/v3/search?pageToken=";
  //var navSuffix = "&part=snippet&key=AIzaSyBIT_ulhAEbygGAVVf942R-t8o1e87OaGU&q=thinkful%20in:name&page=1&per_page=5'";
  //var template = $(RESULT_NAV_TEMPLATE);
  //template.find(".js-nav-prev").attr("onclick", navPrefix + data.prevPageToken + navSuffix);
  //template.find(".js-nav-next").attr("onclick", navPrefix + data.nextPageToken + navSuffix);
  //return template;
//}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
  //$('.js-nav').html(renderNav(data));
}

//function  displayNav (data) {
  //$('.js-nav').html(renderNav());
//}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
    //displayNav();
  });
}

//function navSubmit () {
  //var nextPageLink = 
  //$('.js-nav-next').onclick(function() {
    //window.location= renderNav()
  //}
//}

$(watchSubmit);

//https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBIT_ulhAEbygGAVVf942R-t8o1e87OaGU&q=thinkful%20in:name&page=1&per_page=5