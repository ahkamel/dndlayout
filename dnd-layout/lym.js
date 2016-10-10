function LayoutManager(parent){
	var self = this;
	self.dropManager = new DropManager();
	var lymParent = parent;
	lymParent.style.border="1px solid";
	lymParent.ondragover = handleOnDragOver;
	lymParent.ondragleave = handleOnDragLeave;
	lymParent.ondrop = handleOnDrop;
	function handleOnDragOver(event) {
		event.preventDefault();
		self.dropManager.dragOver(lymParent);
		
		
	}
	
	function handleOnDragLeave(event) {
		event.preventDefault();
		self.dropManager.dragLeave(lymParent);
		
		
	}
	function handleOnDrop(event) {
		event.preventDefault();
		
		self.dropManager.dropPanel(lymParent);
		
		
		
	}
	self.addPanel = function (panelNeighborId) {
		var panel  = new Panel();
		panel.build();
		appendPanel(panel, panelNeighborId);
		
	}
	
	
	
	
	self.registerPanelDropped = function (type, callback){
		
	}
}
