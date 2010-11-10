
function totalRatedTracks() {
  return Amarok.Collection.query("select count(*) from statistics where rating > 0;");
}

function totalTracks() {
  return Amarok.Collection.query("select count(*) from tracks;");
}

function displayCompletionDetails() {
  var rated = totalRatedTracks();
  var total = totalTracks();
  var percent = (rated / total) * 100;
  
  var message = rated + "/" + total + " tracks rated. ("+percent+"%)";
  
  Amarok.Window.Statusbar.shortMessage(message);
} 

Amarok.Engine.trackChanged.connect(function() {
  displayCompletionDetails();
});
