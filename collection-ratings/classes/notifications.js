

Notifications = new Object();

Notifications.send = function(title, message) {
  if(Environment.isGnome()) {
    QProcess.execute('notify-send "'+title+'" "'+message+'"');
  } 
  if(Environment.isKDE()) {
    QProcess.execute('knotify4 --title "'+title+'" "'+message+'"');
  }
}
