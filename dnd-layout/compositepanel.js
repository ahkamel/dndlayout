function CompositePanel(){

	 var self = this;
	 self.id;
	 self.panels = [];
	 var parentDivWidthPercent = "0";
	 var parentDivHeightPercent = "0";
	 self.parentDiv=document.createElement('div');
	 var panelStyle="position:relative;float:left;";
	 self.parentDiv.style.cssText+=';'+ panelStyle;
	 self.compositePanel = null;
	 self.init = function(fromPanel){
	 		var randomId = Util.generateRandomNumber();
			self.id=randomId;
			self.setParentDivWidthPercent(fromPanel.getParentDivWidthPercent());
			self.setParentDivHeightPercent(fromPanel.getParentDivHeightPercent());
			self.parentDiv.id=self.id+Constant.ID_SEPERATOR+Constant.COMPOSITE;
			self.panels.push([fromPanel]);
			fromPanel.parentDiv.parentNode.insertBefore(self.parentDiv, fromPanel.parentDiv);
			self.parentDiv.appendChild(fromPanel.parentDiv);
			fromPanel.setParentDivWidthPercent(100);
			fromPanel.setParentDivHeightPercent(50);
			fromPanel.compositePanel = self;
	 }
 
 	
	 self.dropAfter = function(referenceNode, panel,direction) {
		 panel.compositePanel=self;
		 panel.setParentDivWidthPercent(100);
		 panel.setParentDivHeightPercent(50);
		 referenceNode.parentNode.insertBefore(panel.parentDiv, referenceNode.nextSibling);
	}
	self.dropBefore = function(referenceNode, panel,direction) {
		panel.compositePanel=self;
		panel.setParentDivWidthPercent(100);
		panel.setParentDivHeightPercent(50);
		referenceNode.parentNode.insertBefore(panel.parentDiv, referenceNode);
	}
 	 
 	self.getParentDivWidthPercent = function(){
		return parentDivWidthPercent;
	}
	
	self.setParentDivWidthPercent = function(divWidth){
		parentDivWidthPercent = divWidth;
		self.parentDiv.style.cssText+=';'+"width:"+divWidth+"%";
	}
	self.getParentDivHeightPercent = function(){
		return parentDivHeightPercent;
	}
	
	self.setParentDivHeightPercent = function(divHeight) {
		parentDivHeightPercent = divHeight;
		self.parentDiv.style.cssText+=';'+"height:"+divHeight+"%";
	}
	self.getParentDiv = function() {
		return self.parentDiv;
	}
 
 
}