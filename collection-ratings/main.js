/**
 * This script serves to bootstrap the plugin defined in application.js
 * 
 * It will provide a plugin-wide error handler and let the user know if the
 * plugin is running in development mode.
 * 
 * Author: William Howard
 */

// load all qt bindings the plugin will use.
Importer.loadQtBinding("qt.core");

// preload the class class because its foundation
Importer.include("framework/class.js")

// preload the environment class so we can autoload classes
Importer.include("framework/environment.js");

// preload the error extension, since we might have an error loading core extensions
Importer.include("core_extensions/error+amarok.js");

try {
  Environment.autoload("core_extensions");
  Environment.autoload("classes");
  Environment.autoload("lib");
  
  Config = new Configuration();
  
  if(Environment.isDevelopmentMode()) {
    Amarok.Window.Statusbar.longMessage("the collection ratings plugin is currently running in development mode");
  }
  
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