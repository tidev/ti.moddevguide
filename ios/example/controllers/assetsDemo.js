App.controllers.assetsDemo = function () {

	var API = {
		imageView: null,
		
		init: function() {},
		
		cleanup: function() {
			API.imageView = null;
		},
		
		handleLoadModuleImage: function(e) {
			var image = App.devGuide.loadImageFromModule('moduleImage.png');
			if (image != null) {
				API.imageView.image = image;		
			}	
		},
		
		handleLoadAppImage: function(e) {
			var image = App.devGuide.loadImageFromApplication('applicationImage.png');
			API.imageView.image= image;			
		},
		
		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates the loading of assets from both the module and application. Some messages will be output to the console.',
				textAlign:'left',
				font:{ fontsize: 12 },
				top:10,
				right:10,
				left:10,
				color:'black',
				width:'auto',
				height:'auto'
			}));
	
			var moduleImageBtn = Ti.UI.createButton({
				title: 'Load Module Image',
				top:10,
				width:200,
				height:40
			});
			
			var appImageBtn = Ti.UI.createButton({
				title: 'Load Application Image',
				top:10,
				width:200,
				height:40
			});
			
			API.imageView = Ti.UI.createImageView({
				top:10,
				width:150,
				height:200
			});

			moduleImageBtn.addEventListener('click', API.handleLoadModuleImage);
			appImageBtn.addEventListener('click', API.handleLoadAppImage);
			
			win.add(moduleImageBtn);
			win.add(appImageBtn);
			win.add(API.imageView);
		}
	};
	
	return API;
}