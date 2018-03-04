$(document).ready(function(){
  
  $("#link-button").click(function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
 
  $("input").keypress(function(event)
             {
              if ( event.which == 13 ) {
                $("#searchSubmit").click();
              }
             });
  
//-----------------------------------------------------------------------------------------
  
$(".search_box").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term,
                'limit': 20
            },
            success: function(data) {
                response(data[1]);
            }
        });

    },
  
  classes: {
    "ui-autocomplete": "ulAuto"
  }, 
  
  autoFocus: true,
  
select: function( event, ui ) {$("#searchSubmit").click();}
  
});  
  
//-----------------------------------------------------------------------------------------  
  
  
  
  
//-------------------------------------------------------------------------------------------  
$('*').mousemove(function (ev) {
      var target = $(ev.target);
      var elId = target.attr('id');
    if(elId.substring(0,5) === 'data_')
     {
        var elIndex = elId.substring(7);
       $('div[id^="div-td"]').css({'background-color': '#cc3341'});
       $("#div-td" + elIndex).css({'background-color': '#cef442'});
     }
  else
    {
       $('div[id^="div-td"]').css({'background-color': '#cc3341'});
    }
});    
 //-----------------------------------------------------------------

  $("#searchSubmit").click(function(){
    $("#output-ul").empty();
    var searchString = "";
    
    if($('#input').val())
       {
        searchString = $('#input').val();
         var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchString + "&callback=?";
          $.ajax(
            {
          
            // type of call
            type: "GET",
            
            // url to query
            url: url,
            
            async: false,
            
            dataType: "json",
  
          // if everithing's ok
          success: function(risposta)
                   {
                      var newRow = $("<tr>");
                      var index = 0;
                      var obj = risposta["query"]["pages"];
                      for(var key in obj)
                      {

                        var id = obj[key]['pageid'];
                        var title = obj[key]['title'];
                        var extract = obj[key]['extract'];
                        index++; //this is used for indexing elements;
                        var open = "<li id='lix" + index + "'>";
                          var elem_table_left = "<table><tr><td><div id='div-td" + index + "'></div></td>";
                            var elem_td_left = "<td><div id='li-div" + index + "'style='background-color:white'>";
                              var elem_a_left = "<a id='data_b_" + index + "' href=https://en.wikipedia.org/?curid=" + id + " target='_blank'>"                        
                                var firstP = "<h4 id='data_a_" + index + "'>" + title + "</h4>";
                                var secondP = "<h5 id='data_c_" + index + "'>" + extract + "</h5>";
                                var elem_a = elem_a_left + firstP + secondP + "</a>";
                            var elem_td = elem_td_left + elem_a + "</div></td>";
                          var elem_table = elem_table_left + elem_td + "</tr></table>";
                        var close = "</li>";
                        
                        $("#output-ul").append(open + elem_table + close);
                        
                        $('#li-div' + index).width($('#lix' + index).width());
                        $("#div-td" + index).css({'background-color': '#cc3341'}); //#cef442
                        
                        //$("#div-td" + index).position().top = -10*$('#li-div' + index).position().top;
                        $("#div-td" + index).height($('#li-div' + index).height());
                        $("#div-td" + index).width('10px');
                        //$("#div-td" + index).hide();
                        
                        $('h4[id^="data"]').css({'color': '#000'});
                        $('h5[id^="data"]').css({'color': '#000'}); 
                      }
                   },
          // uh-oh ... something gone wrong
          error: function(jqXHR, textStatus, errorThrown)
                 {
                      alert("error: " + textStatus + " -- " + "incoming Text: " + errorThrown);
                 } 
               });        
            
       }
       else
       {
          $("#output-ul").append("<li style='text-align: center'><h1>Insert something to search</h1></li>");
       }        
  });    
});