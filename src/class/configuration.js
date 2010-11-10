
/**
 * Creates a new configuration class instance.  To get the user's actual
 * configuration, you should use the class method Configuraiton.deserialize()
 * 
 * Otherwise, creates configuration from the given data.
 */
Configuration = function(data) {
  //TODO: MVC this up
  for(key in data) this[key] = data[key];
};

/**
 * Deserializes the configuration from Amarok's serialized configuration 
 * options.  If no options were present, default values are applied.
 */
Configuration.deserialize = function() {
  function fetchBoolean(key) { 
    return Amarok.Script.readConfig(key, "false") == "true";
  }
  
  var data = new Object();
  
  return new Configuration(data);
};

/**
 * Serializes the current state of the configuration data to Amarok
 */
Configuration.prototype.serialize = function() {
  function writeBoolean(key, val) {
    return Amarok.Script.writeConfig(key, val ? "true" : "false");
  }
  
};

/**
 * Displays the current configuration in an alert box
 */
Configuration.prototype.display = function() {
  var message = "Collection Ratings Plugin Configuration";
  
  for(key in this) {
    if(typeof this[key] == "function")
      continue;
      
    message += "\n    " + key + ": " + this[key];
  }

  Amarok.alert(message);
}
