/**
 * This script serves to bootstrap the plugin defined in application.js
 * 
 * It will provide a plugin-wide error handler and let the user know if the
 * plugin is running in development mode.
 * 
 * Author: William Howard
 */

Importer.loadQtBinding("qt.core");

Importer.include("class/environment.js");
Importer.include("class/configuration.js");
Importer.include("core_extensions/error+amarok.js");

Config = Configuration.deserialize();

if(Environment.isDevelopmentMode()) {
  Amarok.Window.Statusbar.longMessage("this plugin is currently running in development mode");
}

try {
  Importer.include("application.js");
} catch(e) {
  // if for some reason the raised object wasn't an error
  // then wrap it in an error and proceed (it was probably a string)
  var exception = (e instanceof Error) ? e : new Error(e);
  
  // if in development mode display the error immediately, otherwise just log it
  if(Environment.isDevelopmentMode())
    exception.displayWithAmarok();
  else
    Amarok.debug(exception.stringifyForLog());
}