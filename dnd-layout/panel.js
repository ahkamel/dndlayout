function Panel(dropManager){
	var self = this;
	self.dropManager = dropManager;
	self.container = document.createElement('div');
	self.parentDiv = document.createElement('div');
	//Width and Height should be dyanmic calculated
	var parentDivWidthPercent = "100";
	var parentDivHeightPercent = "100";
	var panelParentStyle="position:relative;float:left;";
	self.parentDiv.style.cssText+=';'+ panelParentStyle;
	
	self.container.style.cssText+=';'+"position:absolute;top:10px;left:10px;right:10px;bottom:10px;background: lightgreen;"
	self.id = null;
	self.build = function() {
		var timeStamp = new Date().getTime();
		self.id=timeStamp;
		self.container.id=timeStamp+Constant.ID_SEPERATOR+Constant.CONTAINER;
		self.container.innerHTML = "<div>"+timeStamp+"</div>";
		self.parentDiv.id=timeStamp+Constant.ID_SEPERATOR+Constant.PANEL_PARENT;
		var rightSplitter = new ComonentSplitter(dropManager,timeStamp, Constant.RIGHT);
		var leftSplitter = new ComonentSplitter(dropManager,timeStamp, Constant.LEFT);
		var topSplitter = new ComonentSplitter(dropManager,timeStamp, Constant.TOP);
		var bottomSplitter = new ComonentSplitter(dropManager,timeStamp, Constant.BOTTOM);
		
		self.parentDiv.appendChild(topSplitter.getSplitter());
		self.parentDiv.appendChild(leftSplitter.getSplitter());
		self.parentDiv.appendChild(self.container);	
		self.parentDiv.appendChild(rightSplitter.getSplitter());
		self.parentDiv.appendChild(bottomSplitter.getSplitter());
	}
	
	self.getPanelContainer = function(){
		return self.container;
	}
	
	self.getPanelParentContainer = function(){
		return self.parentDiv;
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
	
	self.dropOver = function(referenceNode, parentWidth, parentHeight) {
		self.setParentDivWidthPercent(parentWidth);
		self.setParentDivHeightPercent(parentHeight);
		referenceNode.appendChild(self.parentDiv);
	}
	self.dropAfter = function(referenceNode, parentWidth, parentHeight) {
		self.setParentDivWidthPercent(parentWidth);
		self.setParentDivHeightPercent(parentHeight);
		referenceNode.parentNode.insertBefore(self.parentDiv, referenceNode.nextSibling);
	}
	self.dropBefore = function(referenceNode, parentWidth,parentHeight) {
		self.setParentDivWidthPercent(parentWidth);
		self.setParentDivHeightPercent(parentHeight);
		referenceNode.parentNode.insertBefore(self.parentDiv, referenceNode);
	}
	self.dropTop = function(referenceNode, parentWidth, parentHeight) {
		
	}
	self.dropBottom = function(referenceNode, parentWidth, parentHeight) {
		
	}
}