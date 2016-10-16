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
	self.stringify = function(){
		var panels =[];
		concateInStringfyArray(self.panelManager.panels, panels);
		var ly=JSON.stringify({panels:panels});
		return ly;
	}
	
	var concateInStringfyArray = function(oldArray, newArray){
		for(var row=0;row<oldArray.length;row++){
			for(var column=0;column<oldArray[row].length;column++){
				/*if(oldArray[row][column] instanceof CompositePanel) {
					concateInStringfyArray(oldArray[row][column]);
				}*/
				newArray.push(oldArray[row][column].stringify());
			}
		}
	}
	
	
	
	
	self.registerPanelDropped = function (type, callback){
		
	}
}
