function PanelTitle(panelId, panelManager){
	var self = this;
	self.panelId = panelId;
	var titleStyle = "margin-left:10px;margin-right:10px;top:10;height: 20px;background-color:#d3d3d3;box-shadow: 2px 2px 2px #888888;";
	self.title = document.createElement('div');
	self.title.style.cssText+=';'+ titleStyle;
	var closeButtonStyle ="position: relative;float: right;background: gray;color: white;"
	self.closeButton = document.createElement("button");
	self.closeButton.innerHTML="x";
	self.closeButton.style.cssText+=';'+ closeButtonStyle;
	self.closeButton.onclick = function(){
		panelManager.deletePanel(self.panelId);
	}
	self.title.appendChild(self.closeButton);
	self.getTitle=function(){
		return self.title;
	}
	

}