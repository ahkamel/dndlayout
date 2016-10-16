function Panel(panelManager){
	var self = this;
	self.panelManager = panelManager;
	self.container = document.createElement('div');
	self.parentDiv = document.createElement('div');
	//Width and Height should be dyanmic calculated
	var parentDivWidthPercent = "100";
	var parentDivHeightPercent = "100";
	var panelParentStyle="position:relative;float:left;overfollow:auto;";
	self.parentDiv.style.cssText+=';'+ panelParentStyle;
	self.container.style.cssText+=';'+"position:absolute;top:30px;left:10px;right:10px;bottom:10px;background: #f6f6f6;box-shadow: 2px 2px 2px #888888;"
	self.id = null;
	self.compositePanel = null;
	self.build = function() {
		var randomId = Util.generateRandomNumber();
		self.id=randomId;
		self.container.id=randomId+Constant.ID_SEPERATOR+Constant.CONTAINER;
		self.container.innerHTML = "<div>"+randomId+"</div>";
		self.parentDiv.id=randomId+Constant.ID_SEPERATOR+Constant.PANEL_PARENT;
		var rightSplitter = new ComonentSplitter(panelManager,randomId, Constant.RIGHT);
		var leftSplitter = new ComonentSplitter(panelManager,randomId, Constant.LEFT);
		var topSplitter = new ComonentSplitter(panelManager,randomId, Constant.TOP);
		var bottomSplitter = new ComonentSplitter(panelManager,randomId, Constant.BOTTOM);
		var panelTitle = new PanelTitle(self.id, panelManager);
		self.parentDiv.appendChild(topSplitter.getSplitter());
		self.parentDiv.appendChild(panelTitle.getTitle());
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
	self.stringify = function(){
		return {pId:self.id,pWidth:self.getParentDivWidthPercent(),pHeight:self.getParentDivHeightPercent()};
	}
}