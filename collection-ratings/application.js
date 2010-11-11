
function totalRatedTracks() {
  return parseInt(Amarok.Collection.query("select count(*) from statistics where rating > 0;")[0]);
}

function totalTracks() {
  return parseInt(Amarok.Collection.query("select count(*) from tracks;")[0]);
}

function displayCompletionDetails() {
  var rated = totalRatedTracks();
  var total = totalTracks();
  var percent = (rated / total) * 100;
  
  var message = sprintf("%d / %d tracks rated. (%3.2f%%)", rated, total, percent);
  
  Amarok.Window.Statusbar.shortMessage(message);
  Notifications.send("Rating Progress", message)
} 

Amarok.Engine.trackChanged.connect(function() {
  displayCompletionDetails();
});
