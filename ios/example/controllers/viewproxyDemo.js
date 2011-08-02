App.controllers.viewproxyDemo = function () {

	var API = {
		view: null,
		currentColor: '',
		
		init: function() {},
		
		cleanup: function() {
			API.view = null;
		},
		
		handleColorSelection: function(e) {
			if (API.currentColor == 'green') {
				API.view.color = 'red';
			} else {
				API.view.color = 'green';
			}
		},

		createColorSelector: function() {
			var colorBtn = Ti.UI.createButton({
				title: 'Change Color',
				top:10,
				width:150,
				height:40
			});
			colorBtn.addEventListener('click', API.handleColorSelection);	
			
			return colorBtn;
		},
		
		handleColorChange: function(e) {
			API.currentColor = e.color._name;
			
			alert('Color changed to ' + e.color._name);
		},
		
		toggleViewCreate : function(e) {
			if (API.view == null) {
				API.view = App.devGuide.createView({
					width:200,
					height:200,
					top:10,
					left:10,
					right:10,
					color: 'green',
					layout:'vertical'
				});
				
				API.view.add(API.createColorSelector());
				
				API.view.addEventListener('colorChange', API.handleColorChange);
				
				e.source.parent.add(API.view);
			} else {
				e.source.parent.remove(API.view);
				API.view = null;
			}
		
			// Toggle the button text
			e.source.title = (API.view == null) ? 'Create View' : 'Delete View';
		},
		
		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates the view proxy lifecycle. Press the \'Create View\' button to create a new instance of the view. Press the \'Delete View\' button to destroy the view. Lifecycle messages will be output to the console.',
				textAlign:'left',
				font:{ fontsize: 12 },
				top:10,
				right:10,
				left:10,
				color:'black',
				width:'auto',
				height:'auto'
			}));
	
			var toggleBtn = Ti.UI.createButton({
				title: 'Create View',
				top:10,
				width:150,
				height:60
			});
			
			toggleBtn.addEventListener('click', API.toggleViewCreate);
			
			win.add(toggleBtn);
		}
	};
	
	return API;
}