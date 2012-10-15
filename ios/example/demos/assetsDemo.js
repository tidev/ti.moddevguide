// Private implementation details for commonJS module

var devGuide = null;
var	imageView = null;

function handleLoadModuleImage(e) {
	var image = devGuide.loadImageFromModule('module_image.png');
	if (image != null) {
		imageView.image = image;		
	}	
}

function handleLoadAppImage(e) {
	var image = devGuide.loadImageFromApplication('application_image.png');
	if (image != null) {
		imageView.image = image;
	}			
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Save the module object -- we'll need it later
	devGuide = modDevGuide;
}

exports.cleanup = function() {
	imageView = null;
	devGuide = null;
}

exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates the loading of assets from both the module and application. Some messages will be output to the console.',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));

	var moduleImageBtn = Ti.UI.createButton({
		title: 'Load Module Image',
		top:10,
		width:200,
		height:Ti.UI.SIZE || 'auto'
	});
	
	var appImageBtn = Ti.UI.createButton({
		title: 'Load Application Image',
		top:10,
		width:200,
		height:Ti.UI.SIZE || 'auto'
	});
	
	imageView = Ti.UI.createImageView({
		top:10,
		width:150,
		height:200
	});

	moduleImageBtn.addEventListener('click', handleLoadModuleImage);
	appImageBtn.addEventListener('click', handleLoadAppImage);
	
	win.add(moduleImageBtn);
	win.add(appImageBtn);
	win.add(imageView);
}
