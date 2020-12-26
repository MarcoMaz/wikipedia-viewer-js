//Main Function
function loadData(){
  var $wiki = $('.wiki-results'),
      searchresult = $('#search').val();
  $wiki.text("");
  
  //Wikipedia AJAX request
  var wikiSearch = "https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=5&search=" + searchresult + "&callback=?",
      wikiRequestTimeout = setTimeout(function(){
        $wiki.text("Failed to get Wikipedia Resources");
        }, 8000);
  
  $.ajax(wikiSearch, {
    dataType: "jsonp",
    type: 'post',
    headers: {
      'Api-User-Agent': 'Example/1.0'
      },
    success: function(data){
          var title = data[1],
              descr = data[2],
              link = data[3],       
              newTitle = "",
              newDescr = "",
              newLink = "",
              newArticle = "";
        for (var i = 0; i < data[1].length; i++){          
          newTitle = "<h1>" + title[i] + "</h1>";
          newDescr = "<p>" + descr[i] + "</p>";
          newLink = '<a href="' + link[i] + '" >' + link[i] + '</a><br><br><br>';          
          newArticle = newTitle + newDescr + newLink;
          $wiki.append(newArticle);
          }  
    clearTimeout(wikiRequestTimeout);      
    }
  });        
  return false;
  }

//Random Controller
$('#random').click(function(){
  $(this).attr('target', '_blank');
});

//Controller
$('#form-container').submit(loadData);