/**
 * @fileoverview
 */
 
/**
 * @constructor
 */
OptionsDialog = function(parent) {
  this.widget = new QWidget(parent);
  this.widget.windowTitle = "Configuration - Collection Ratings Plugin"
  
  this.useNotify = new QCheckBox();
  this.useNotify.text = "Use KNotify";
  
  this.useNotify.setChecked(Config.getUseNotify());
  
  this.layout = new QVBoxLayout(this.widget);
  this.layout.addWidget(this.useNotify, 0, 1);
  
  var self = this;
  
  this.useNotify.stateChanged.connect(function() { 
    Config.setUseNotify(self.useNotify.checked);
  });
};

OptionsDialog.prototype.show = function() {
  this.widget.show();
};

OptionsDialog.prototype.hide = function() {
  this.widget.hide();
};
