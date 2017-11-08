jQuery(function($){
    $('#search-button').click(function(){
        var inputLength = document.getElementById('search-input').value.length;
        var icon = document.getElementById('search-button').innerHTML;
        // if submit form is empty, toggle open/close and green/red
        if (inputLength === 0) {
          $('#search-input').toggleClass('search-input-open');
          $('#search-button').toggleClass('form-search-red');
          // toggle the button icon between a magnifying glass/X
          if (icon === '⌕') {
            document.getElementById('search-button').innerHTML = '&#120;';
          } else {
            document.getElementById('search-button').innerHTML = '⌕';
          }
        // if the form is not empty, clear it.  This is only possible when the form is open.
        }  else {
          $('#search-input').val('');
        } // close inputLength if statement
    })  // close click function
    
    // submit input for ajax get request when pressing enter
    $('#search-form').keydown(function(e){
      var key = e.which;
      if (key == 13) { // the ASCII code for enter is 13
        if ($('#search-input').val() == '') {
          alert('Form is empty.');
          e.preventDefault();
        } else {
              // the GET request
              var userSearch = $('#search-input').val();
              $.getJSON( "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + userSearch + "&namespace=0&limit=10&callback=?", function( data ) {
                  $('body').css('justify-content','flex-start'); 
                  $('#main-div').css('margin-top', '1em');
                  // deletes previous results from the page before showing new results
                  $('#results-container').empty();
                  // the iteration number is equal to the total search results, 10 is the limit
                  for (i = 0; i < data[1].length; i++) {
                      // makes div for each result, adds the title and intro text results
                      var $div = $('<a target="_blank" href="' + data[3][i] + '"' + '<div class="grow">' + '<span style="font-size: 1.8em";>' + data[1][i] + '</br></span>' + data[2][i] + '</div>' + '</a>').appendTo('#results-container');
                      // gives id to each div for css styling
                      $div.attr('id','result-' + i);
                                       }
                  // ensures bottom margin for the last result
                  $('#results-container').children().last().css('margin-bottom', '2em');
                   
              });

              e.preventDefault(); // stops form from submitting and refreshing page
        }
      }
    });
  
})