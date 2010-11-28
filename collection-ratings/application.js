
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
  
  if(Config.getUseNotify()) {
    Notifications.send("Rating Progress", message)
  } else {
    Amarok.Window.Statusbar.longMessage(message);
  }
} 

Options = new OptionsDialog(this);

Amarok.Window.addSettingsMenu( "config_collection_rating_stats", "Configure Collection Rating Script", "");

Amarok.Window.SettingsMenu.config_collection_rating_stats["triggered()"]
  .connect(function() { Options.show(); });

Amarok.Engine.trackChanged.connect(function() {
  displayCompletionDetails();
});
