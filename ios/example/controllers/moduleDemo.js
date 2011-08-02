App.controllers.moduleDemo = function () {
	
	var API = {
		init: function() {},
		
		cleanup: function() {},

		toggleModuleLoad : function(e) {
			if (App.devGuide == null) {
				App.loadModule();
			} else {
				App.unloadModule();
			}
		
			// Toggle the button text
			e.source.title = (App.devGuide == null) ? 'Load Module' : 'Unload Module';
		},
		
		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates the module loading and unloading lifecycle. Press the button to load and unload the module. Lifecycle messages will be output to the console.',
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
				title: (App.devGuide == null) ? 'Load Module' : 'Unload Module',
				top:20,
				width:150,
				height:60
		    });
	
			toggleBtn.addEventListener('click', API.toggleModuleLoad);
		
			win.add(toggleBtn);
		}
	};
	
	return API;
}