function PanelManager() {
	var self = this;
	self.panels = [];
	self.splitters = [];	
	self.addPanel = function(dropOver){
		var panel = new Panel(self);
		panel.build();
		if(self.panels.length == 0) {
			dropOver.style.border = "1px solid";			
			panel.dropOver(dropOver, '100', '100');
			self.panels.push([panel]);
		}else {
			var panelId = dropOver.splitter.id.split(Constant.ID_SEPERATOR)[0];
			var direction =dropOver.splitter.id.split(Constant.ID_SEPERATOR)[1];
			findPanelAndAdd(panelId, direction, self.panels, panel);
		}
	}
	
	self.deletePanel=function(panelId){
		
		deletePanel(panelId, self.panels);
		
	}
	
	var deletePanel = function(panelId,panelsList){
		for(var row=0;row<panelsList.length;row++){
			for(var column=0; column< panelsList[row].length; column++){
				if(panelsList[row][column] instanceof  CompositePanel){
					deletePanel(panelId, panelsList[row][column].panels);
				}
				
				if(panelsList[row][column].id == panelId){
					var removedPanel = document.getElementById(panelId+Constant.ID_SEPERATOR+Constant.PANEL_PARENT);
					removedPanel.parentNode.removeChild(removedPanel);
					if(panelsList[row].length == 1) {
						debugger;
						var deletedPanel = panelsList[row][column];
						panelsList.splice(row, 1);
						if(deletedPanel.compositePanel && deletedPanel.compositePanel.panels.length == 0){
							deletedPanel.compositePanel.getParentDiv().parentNode.removeChild(deletedPanel.compositePanel.getParentDiv());
							
							findCompositeAndRemove(deletedPanel.compositePanel, deletedPanel.compositePanel.compositePanel);
						} else {
							var newHeight = 100/panelsList.length;
							resizePanelsHeight(panelsList, newHeight);
						}
					} else {
						panelsList[row].splice(column, 1);
						var newWidth = 100/panelsList[row].length;
						resizePanelsWidth(panelsList[row], newWidth);
					}
					return;
				}
			}
		}
	}
	
	var findCompositeAndRemove=function(composite, compositeParentList) {
		
		for(var row=0;row<compositeParentList.length;row++){
			for(var column=0;column<compositeParentList[row].length; column++){
				if(compositeParentList[row][column].id==composite.id){
					compositeParentList[row].splice(column, 1);
					var newWidth = 100/compositeParentList[row].length;
					resizePanelsWidth(compositeParentList[row], newWidth);
				}
			}
		}
	}
	
	var findPanelAndAdd = function(panelId, direction, panelsList, panel) {
			for(var row =0; row< panelsList.length; row++) {
				for(var column = 0; column < panelsList[row].length; column++) {
					if(panelsList[row][column] instanceof  CompositePanel){
						panel.compositePanel=panelsList[row][column];
						findPanelAndAdd(panelId, direction, panelsList[row][column].panels, panel);
					}
					
					if(panelsList[row][column].id==panelId){
						var dropOverPanel = panelsList[row][column];
						var newPanelWidth = 100 / (panelsList[row].length + 1) ;
						var newPanelHeight = 100 / (numOfPanelsInColumn(panelsList, column) + 1);
								if(direction == Constant.TOP) {
									if(panelsList[row].length>1){
										var compositePanel = new CompositePanel();
										compositePanel.init(dropOverPanel);
										compositePanel.compositePanel = panelsList;
										compositePanel.dropBefore(dropOverPanel.getPanelParentContainer(), panel, direction);
										panelsList[row][column]=compositePanel;
										compositePanel.panels.splice(0, 0, [panel]);
									} else {
										addNewRowTop(panelsList, row,  panel);
										resizePanelsHeight(panelsList, newPanelHeight);
										panel.dropBefore(dropOverPanel.getPanelParentContainer(),dropOverPanel.getParentDivWidthPercent() , newPanelHeight);
									}
								}else if(direction == Constant.LEFT) {
									panelsList[row].splice(column, 0, panel);
									resizePanelsWidth(panelsList[row], newPanelWidth);
									panel.dropBefore(dropOverPanel.getPanelParentContainer(), newPanelWidth, dropOverPanel.getParentDivHeightPercent());
								}else if(direction == Constant.BOTTOM) {
									if(panelsList[row].length>1){
										var compositePanel = new CompositePanel();
										compositePanel.init(dropOverPanel);
										compositePanel.compositePanel = panelsList;
										compositePanel.dropAfter(dropOverPanel.getPanelParentContainer(), panel, direction);
										panelsList[row][column]=compositePanel;
										compositePanel.panels.splice(1, 0, [panel]);
									} else {
										addNewRowBottom(panelsList, row,panel);
										resizePanelsHeight(panelsList, newPanelHeight);
										panel.dropAfter(dropOverPanel.getPanelParentContainer(), dropOverPanel.getParentDivWidthPercent() , newPanelHeight);
									}
								} else if(direction == Constant.RIGHT) {
									panelsList[row].splice(column+1, 0, panel);
									resizePanelsWidth(panelsList[row], newPanelWidth);
									panel.dropAfter(dropOverPanel.getPanelParentContainer(), newPanelWidth, dropOverPanel.getParentDivHeightPercent());
								}
							return;
					}
				}
			}
	}
	
	var resizePanelsWidth = function(panels, newWidth){
		for(var row=0;row< panels.length; row++) {
			panels[row].setParentDivWidthPercent(newWidth);
		}
	}
	var resizePanelsHeight = function(panelsList, newHeight){
		for(var row =0;row<panelsList.length;row++){
			for(var column=0; column< panelsList[row].length;column++){
				panelsList[row][column].setParentDivHeightPercent(newHeight);
			}
		}
	}
	var addNewRowTop = function(panelsList,  panelRow, newPanel){
		panelsList.splice(panelRow, 0, [newPanel]);
	}
	
	var addNewRowBottom = function(panelsList, panelRow, newPanel){
		panelsList.splice(panelRow+1, 0, [newPanel]);
	}
	
	var numOfPanelsInColumn = function(panelsList, column){
		var num = 0;
		for(var i=0;i<panelsList.length;i++){
			if(panelsList[i].length>=column && panelsList[i][column] != undefined){
				num++;
			}
		}
		return num;
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