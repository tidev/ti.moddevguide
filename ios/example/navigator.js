// Declare the list of demos and their associated commonJS module names
var demos = [
	{	mod: null, title: 'Proxy Loading',			section: 'Life Cycle',			name: 'proxyDemo' },
	{	mod: null, title: 'View Proxy Loading',	section: 'Life Cycle',			name: 'viewproxyDemo'	},
	{	mod: null, title: 'Properties',			section: 'Kroll',				name: 'krollPropertiesDemo'	},
	{	mod: null, title: 'Methods',				section: 'Kroll',				name: 'krollMethodsDemo'	},
	{	mod: null, title: 'Parameters',			section: 'Kroll',				name: 'krollParametersDemo'	},
	{	mod: null, title: 'Callbacks & Events',	section: 'Kroll',				name: 'krollCallbacksAndEventsDemo'	},
	{	mod: null, title: 'Assets',				section: 'Miscellaneous',		name: 'assetsDemo'	},
	{	mod: null, title: 'Constants',				section: 'Miscellaneous',		name: 'constantsDemo' }
];

var devGuide = null;
var tab = null;
var currentDemo = null;

function createDemoTableView() {
	var sections = [];
	var cnt = demos.length;
	
	for (var index = 0; index < cnt; index++) {
		if ((index == 0) || (demos[index].section != demos[index-1].section)) {
			sections.push(Ti.UI.createTableViewSection({
				headerTitle: demos[index].section
			}));
		}
						
		row = Ti.UI.createTableViewRow({
			title: demos[index].title,
			hasChild: true
		});
		
		sections[sections.length - 1].add(row);
	}
	
	var tableView = Ti.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		data: sections
	});
	
	tableView.addEventListener('click', function(e) {
		exports.openDemo(demos[e.index]);
	});
	
	return tableView;
}

exports.start = function(modDevGuide) {
	// Save the module object -- we'll need it later
	devGuide = modDevGuide;

	var win = Ti.UI.createWindow({
		title: 'Module Development Guide',
		backgroundColor: 'white',
		tabBarHidden: true
	});
	
	win.add(createDemoTableView());
	
	if (Ti.Platform.name == 'android') {
		win.exitOnClose = true;
	} else {
		var tabGroup = Ti.UI.createTabGroup();
		win.tabBarHidden = true;
		tab = Ti.UI.createTab({
			title: win.title,
			window: win
		});
		tabGroup.addTab(tab);
		tabGroup.open();
	}
	
	// Open the application window
	win.open();
}

exports.openDemo = function(demo) {
	var win = Ti.UI.createWindow({
		title: demo.title,
		backgroundColor: 'white',
		layout: 'vertical'
	});
	
	// Load the commonJS module for the first time
	currentDemo = (demo.mod == null) ? require('demos/' + demo.name) : demo.mod;
	
	// Perform page initialization
	currentDemo.initialize(devGuide);
	
	// Create the controls for the window
	currentDemo.create(win);
	
	// Handle page cleanup
	win.addEventListener('close', function() {
		currentDemo.cleanup();
		currentDemo = null;
	});

	if (Ti.Platform.name == 'android') {
		win.open({ modal: true, animated: true });
	} else {
		tab.open(win, { animated: true });
	}
}
