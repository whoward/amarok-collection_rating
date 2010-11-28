/**
 * @fileoverview
 * 
 * @requires Class
 * @requires MVCObject
 * @requires Amarok
 */
 
/*global Configuration: true, Class: false, MVCObject: false, Amarok: false */
/*jslint white: false, nomen: false, onevar: false */
 
/**
 * @constructor
 */
Configuration = function() {
  // call the "super" method on the MVC Object class
  MVCObject.call(this);
  
  // define the attributes this MVC object uses
  this._makeBooleanAttribute("UseNotify", true);
  
  // Deserialize the data from the Amarok configuration
  this.deserialize();
  
  // set us up as a listener for these value changes
  this.addAttributeObserver(this, "UseNotify");
};

/**
 * Mix the MVC object helper into this class
 */
Class.mixin(Configuration, MVCObject);

/**
 * @private
 */
Configuration.prototype.serialize = function() {
  for(var name in this._attributes) {
    if(this._attributes.hasOwnProperty(name)) {
      var value = this._attributeValues[name];
      
      if(value) { this.serializeAttribute(name, value); } 
    }
  }
};

/**
 * @private
 */
Configuration.prototype.deserialize = function() {
  for(var name in this._attributes) {
    if(this._attributes.hasOwnProperty(name)) {
      this._attributeValues[name] = this.deserializeAttribute(name); 
    }
  }
};

/**
 * @private
 */
Configuration.prototype.deserializeAttribute = function(name) {
  var attr = this._attributes[name];
  
  var serializedValue = Amarok.Script.readConfig(name, "");
  
  if(!serializedValue) { return null; }
  
  switch(attr.type) {
    case "boolean":
      return (serializedValue === "true");
      
    case "string":
      return serializedValue;
      
    case "integer":
      return parseInt(serializedValue, 10);
      
    case "float":
      return parseFloat(serializedValue);
  }
};

/**
 * @private
 */
Configuration.prototype.serializeAttribute = function(name, value) {
  var attr = this._attributes[name];
  
  switch(attr.type) {
    case "boolean":
      return value + "";
      
    case "string":
      return value;
      
    case "integer":
      return value + "";
      
    case "float":
      return value + "";
  }  
};


/**
 * @private
 */
Configuration.prototype.attributeValueDidChange = function(attribute) {
  this.serialize();
};

/**
 * @private
 */
Configuration.prototype._makeBooleanAttribute = function() {
  this._makeAttribute.apply(this, arguments);
  this._attributes[arguments[0]].type = "boolean";
};

/**
 * @private
 */
Configuration.prototype._makeStringAttribute = function() {
  this._makeAttribute.apply(this, arguments);
  this._attributes[arguments[0]].type = "string";  
};

/**
 * @private
 */
Configuration.prototype._makeIntegerAttribute = function() {
  this._makeAttribute.apply(this, arguments);
  this._attributes[arguments[0]].type = "integer";
};

/**
 * @private
 */
Configuration.prototype._makeFloatAttribute = function() {
  this._makeAttribute.apply(this, arguments);
  this._attributes[arguments[0]].type = "float";
};
