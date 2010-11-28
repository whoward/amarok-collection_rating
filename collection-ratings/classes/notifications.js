

Notifications = new Object();

Notifications.send = function(title, message) {
  QProcess.execute('notify-send "'+title+'" "'+message+'"');
}
