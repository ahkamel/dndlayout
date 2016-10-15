function LayoutManager(parent){
	var self = this;
	self.panelManager = new PanelManager();
	var lymParent = parent;
	lymParent.style.border="1px solid";
	lymParent.ondragover = handleOnDragOver;
	lymParent.ondragleave = handleOnDragLeave;
	lymParent.ondrop = handleOnDrop;
	function handleOnDragOver(event) {
		event.preventDefault();
		self.panelManager.dragOver(lymParent);
		
		
	}
	
	function handleOnDragLeave(event) {
		event.preventDefault();
		self.panelManager.dragLeave(lymParent);
		
		
	}
	function handleOnDrop(event) {
		event.preventDefault();
		
		self.panelManager.addPanel(lymParent);
		
		
		
	}
	self.addPanel = function (panelNeighborId) {
		var panel  = new Panel();
		panel.build();
		appendPanel(panel, panelNeighborId);
		
	}
	
	
	
	
	self.registerPanelDropped = function (type, callback){
		
	}
}
