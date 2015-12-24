$(function(){
  var todotext = $('.new-todo').keypress(function(e){
  	var key = e.which; 
    if (key == 13) { 
    $('h1').append(todotext.val());
   }
  });
})