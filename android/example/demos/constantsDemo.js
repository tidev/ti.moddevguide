// Private implementation details for commonJS module

var devGuide = null;

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Save the module object -- we'll need it later
	devGuide = modDevGuide;
}

exports.cleanup = function() {
	devGuide = null;
}
		
exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates the accessing of constants defined by a module (or proxy)',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));

	// Declare list of values to display. Each item references a constant defined
	// by the module.
	var constants = [
		{ title: 'Integer: ', value: devGuide.DEMO_INTEGER },
		{ title: 'String: ', value: devGuide.DEMO_STRING },
		{ title: 'Boolean: ', value: devGuide.DEMO_BOOLEAN }
	];
	
	var cnt = constants.length;
	for (var index = 0; index < cnt; index++) {
		var view = Ti.UI.createView({
			layout:'horizontal',
			width:'100%',
			height:'30',
			top:10,
			left:10
		});

		view.add(Ti.UI.createLabel({
			text:constants[index].title,
			textAlign:'left',
			font:{ fontsize: 12, fontWeight: 'bold' },
			color:'black',
			width:Ti.UI.SIZE || 'auto',
			height:30
		}));

		view.add(Ti.UI.createLabel({
			text:constants[index].value,
			textAlign:'left',
			font:{ fontsize: 12 },
			color:'black',
			width:Ti.UI.SIZE || 'auto',
			height:30
		}));
	
		win.add(view);
	}
}
