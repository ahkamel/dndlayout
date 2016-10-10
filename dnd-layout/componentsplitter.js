function ComonentSplitter(dropManager,idPrefix, idSuffix){
	var self = this;
	self.dropManager = dropManager;
	self.splitter = document.createElement('div');
	self.splitter.id=idPrefix+Constant.ID_SEPERATOR+idSuffix;
	self.splitter.ondragenter = handleDragEnter;
	self.splitter.ondragleave = handleDragLeave;
	self.splitter.ondrop = handleOnDrop;
	// background: green;
	var leftStyle = "position:absolute;top:10px;left:0;bottom:10px;width: 10px;";
	//background: gold;
	var rightStyle = "position:absolute;top:10px;right:0;bottom:10px;width: 10px;";
	//background: red;
	var topStyle = "top:0;height: 10px;width: 100%;";
	//background: purple;
	var bottomStyle = " position:absolute;bottom:0;width: 100%;height: 10px;";
	if(idSuffix == Constant.RIGHT) {
		self.splitter.style.cssText+=';'+ rightStyle;
	} else if (idSuffix == Constant.LEFT) {
		self.splitter.style.cssText+=';'+ leftStyle;
	}else if (idSuffix == Constant.TOP) {
		self.splitter.style.cssText+=';'+ topStyle;
	}else  {
		self.splitter.style.cssText+=';'+ bottomStyle;
	}
	
	function handleOnDrop(event) {
		event.preventDefault();
		self.splitter.style.background="";
		self.dropManager.dropPanel(self);
		event.stopPropagation();
	}
	function handleDragEnter(event) {
		event.preventDefault();
		self.splitter.style.background="blue";
	}
	
	function handleDragLeave(event) {
		event.preventDefault();
		self.splitter.style.background="";
	}
	 self.getSplitter = function(){
		 return self.splitter;
	 }
	
	
}