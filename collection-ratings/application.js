
function totalRatedTracks() {
  return parseInt(Amarok.Collection.query("select count(*) from statistics where rating > 0;")[0]);
}

function totalTracks() {
  return parseInt(Amarok.Collection.query("select count(*) from tracks;")[0]);
}

function percentCompleted() {
  var rated = totalRatedTracks();
  var total = totalTracks();
  
  Logger.log(sprintf("collection statistics: %d rated, %d total", rated, total));
  
  if(total === 0) {
    Logger.log("collection is 0% rated"); 
    return 0;
  }
  if(total === rated) {
    Logger.log("collection is 100% rated")
    return 100;
  }
  
  return (rated / total) * 100;  
};

function displayCompletionDetails() {
  var percent = percentCompleted();
  
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
