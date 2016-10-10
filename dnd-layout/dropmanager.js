function DropManager() {
	var self = this;
	self.panels = [];
	self.splitters = [];	
	self.dropPanel = function(dropOver){
		var panel = new Panel(self);
		panel.build();
		if(self.panels.length == 0) {
			dropOver.style.border = "1px solid";			
			panel.dropOver(dropOver, '100', '100');
			self.panels.push([panel]);
		}else {
			var panelId = dropOver.splitter.id.split(Constant.ID_SEPERATOR)[0];
			var direction =dropOver.splitter.id.split(Constant.ID_SEPERATOR)[1];
			dropContainer:
			for(var row =0; row< self.panels.length; row++) {
			
				for(var column = 0; column < self.panels[row].length; column++) {
					if(self.panels[row][column].id==panelId){
					var dropOverPanel = self.panels[row][column];
					var newPanelWidth = 100 / (self.panels[row].length + 1) ;
					var newPanelHeight = 100 / (numOfPanelsInColumn(column) + 1);
							if(direction == Constant.TOP) {
								addNewPanelInColumnTop(column, row,  panel);
								resizePanelsHeight(column, newPanelHeight);
								panel.dropBefore(dropOverPanel.getPanelParentContainer(),dropOverPanel.getParentDivWidthPercent() , newPanelHeight);
							}else if(direction == Constant.LEFT) {
								self.panels[row].splice(column, 0, panel);
								resizePanelsWidth(self.panels[row], newPanelWidth);
								panel.dropBefore(dropOverPanel.getPanelParentContainer(), newPanelWidth, dropOverPanel.getParentDivHeightPercent());
							}else if(direction == Constant.BOTTOM) {
								addNePanelInColumnBottom(column, row,panel);
								resizePanelsHeight(column, newPanelHeight);
								panel.dropAfter(dropOverPanel.getPanelParentContainer(), dropOverPanel.getParentDivWidthPercent() , newPanelHeight);
							} else if(direction == Constant.RIGHT) {
								self.panels[row].splice(column+1, 0, panel);
								resizePanelsWidth(self.panels[row], newPanelWidth);
								panel.dropAfter(dropOverPanel.getPanelParentContainer(), newPanelWidth, dropOverPanel.getParentDivHeightPercent());

							}
							
						
						break dropContainer;
					}
				}
			}
		}
	}
	
	var resizePanelsWidth = function(panels, newWidth){
		for(var row=0;row< panels.length; row++) {
			panels[row].setParentDivWidthPercent(newWidth);
		}
	}
	var resizePanelsHeight = function(panelColumn, newHeight){
		for(var row =0;row<self.panels.length;row++){
			for(var column=0; column< self.panels[row].length;column++){
				//if(column==panelColumn){
					self.panels[row][column].setParentDivHeightPercent(newHeight);
				//}
			}
		}
	}
	var addNewPanelInColumnTop = function(panelColumn, panelRow, newPanel){
		debugger;
		var oldPanel = undefined;
			for(var row = 0; row < self.panels.length; row++) {
				for(var column=0; column<self.panels[row].length; column++){
					if(panelColumn == column && panelRow == row){
						oldPanel = self.panels[row][column];
						self.panels[row][column] = newPanel;
					}
					if(oldPanel != undefined && column > panelColumn){
						oldPanel = self.panels[row][column];
						self.panels[row][column] = oldPanel;
					}
					
				}
			}
			if(oldPanel != undefined){
				self.panels[self.panels.length] = new Array();
				self.panels[self.panels.length-1][panelColumn] = oldPanel;
			}
	}
	
	var addNePanelInColumnBottom = function(panelColumn, panelRow, newPanel){
		
		debugger;
		var oldPanel = newPanel;
		for(var row=0; row<self.panels.length;row++){
			for(var column=0; column<self.panels[row].length; column++){
				if(panelRow+1 == row && column == panelColumn){
					oldPanel = self.panels[row][column];
					self.panels[row][column] = newPanel;
				}
				if(oldPanel != undefined && row> (panelRow+1)){
					    var tmpPanel = oldPanel;
						oldPanel = self.panels[row][column];
						self.panels[row][column] = tmpPanel;
				}
			}
		}
		
		if(oldPanel != undefined){
			self.panels[self.panels.length] = new Array();
			self.panels[self.panels.length-1][panelColumn] = oldPanel;
		}
	
	}
	
	var numOfPanelsInColumn = function(column){
		var num = 0;
		for(var i=0;i<self.panels.length;i++){
			if(self.panels[i].length>=column && self.panels[i][column] != undefined){
				num++;
			}
		}
		return num;
	}
	
	self.removePanel= function (panelId) {
		
	}
	self.movePanels = function (panel1, panel2) {
		
	}
	self.dragOver = function(element){
		if(self.panels.length == 0) {
			element.style.border = "3px dashed";
		}
	}
	self.dragLeave = function(element) {
		if(self.panels.length == 0) {
			element.style.border = "1px solid";
		}
	}
}