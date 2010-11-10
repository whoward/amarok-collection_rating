
Environment = new Object();

/**
 * This somewhat hackish method determines if the plugin is currently in
 * debug mode.  When developing I create a symlink from the Amarok scripts
 * folder to my source directory.
 * 
 * A better way of telling would probably be to inspect the plugin's version
 * number - any version ending in "b" would indicate debug mode.
 */
Environment.isDevelopmentMode = function() {
  return (new QFileInfo(Amarok.Info.scriptPath())).isSymLink();
}
