// Private implementation details for commonJS module

var devGuide = null;
var	view = null;
var	currentColor = '';
		
function handleColorSelection(e) {
	view.color = (currentColor == 'green') ? 'red' : 'green';
}

function createColorSelector() {
	var colorBtn = Ti.UI.createButton({
		title: 'Change Color',
		top:10,
		width:150,
		height:40
	});
	
	colorBtn.addEventListener('click', handleColorSelection);

	return colorBtn;
}
		
function handleColorChange(e) {
	if (Ti.Platform.name == 'android') {
		currentColor = e.color;
	} else {
		currentColor = e.color._name;
	}
	
	alert('Color changed to ' + currentColor);
}
		
function toggleViewCreate(e) {
	if (view == null) {
		view = devGuide.createDemoView({
			width:200,
			height:200,
			top:10,
			color: 'green',
			layout:'vertical'
		});
		
		view.add(createColorSelector());
		
		view.addEventListener('colorChange', handleColorChange);
		
		e.source.parent.add(view);
	} else {
		e.source.parent.remove(view);
		view = null;
	}

	// Toggle the button text
	e.source.title = (view == null) ? 'Create View' : 'Delete View';
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Save the module object -- we'll need it later
	devGuide = modDevGuide;
}

exports.cleanup = function() {
	view = null;
	currentColor = '';
	devGuide = null;
}
		
exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates the view proxy lifecycle. Press the \'Create View\' button to create a new instance of the view. Press the \'Delete View\' button to destroy the view. Lifecycle messages will be output to the console.',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));

	var toggleBtn = Ti.UI.createButton({
		title: 'Create View',
		top:10,
		width:150,
		height:60
	});
	
	toggleBtn.addEventListener('click', toggleViewCreate);
	
	win.add(toggleBtn);
}
