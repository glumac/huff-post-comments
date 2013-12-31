// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .



// App Credentials
// These credentials give you access to the Pusher API. For more information check the documentation on how to use these.

// app_id = '62647'
// Access Tokens

// If a token becomes compromised, you can create a new key/secret pair. You will be able to delete the old token when you've updated your app.

// key = '9d4e5561ac51999f4b63'
// secret = '33202a03df3f190569c3'




//     var pusher = new Pusher('9d4e5561ac51999f4b63');
//     var channel = pusher.subscribe('test_channel');
//     channel.bind('my_event', function(data) {
//       alert(data.message);
//     });
//   </script>
// </head>



//   // Pusher - initialize
//   var play_all_event = new CustomEvent("play_all");
//   var pusher = new Pusher('9d4e5561ac51999f4b63');
//   var channel = pusher.subscribe('test_channel');
//   var callback = function(data) {};

//   // Pusher - When a user joins adds images to other users' screens 
//   channel.bind('my_event', function(data) {
//     var key = "just_added";
//     if ($('#pianos li').length === 0 || $("li:last").attr("class").search(key) === -1) {
//       $("#pianos").append('<li class = "piano selected"><img class="satie" src = "satie2.png" width="175px"></li>');
//       }
//     channel.unbind('my_event', callback);
//     $(".just_added").removeClass('just_added');
//     $(".just_added").unbind("search");
//   });

//   // Pusher - Plays track 
//   channel.bind('play_all', function(data, track) {
//     playFile(track);
//     channel.unbind('play_all', callback);
//   });