var App = {
	controllers: {},
	demos: [
		{	title: 'Module Loading',		section: 'Life Cycle',			name: 'moduleDemo'	},
		{	title: 'Proxy Loading',			section: 'Life Cycle',			name: 'proxyDemo'	},
		{	title: 'View Proxy Loading',	section: 'Life Cycle',			name: 'viewproxyDemo'	},
		{	title: 'Properties',			section: 'Kroll',				name: 'krollPropertiesDemo'	},
		{	title: 'Methods',				section: 'Kroll',				name: 'krollMethodsDemo'	},
		{	title: 'Parameters',			section: 'Kroll',				name: 'krollParametersDemo'	},
		{	title: 'Callbacks & Events',	section: 'Kroll',				name: 'krollCallbacksAndEventsDemo'	},
		{	title: 'Assets',				section: 'Miscellaneous',		name: 'assetsDemo'	}
	],
	devGuide: null,

	loadObject: function(type, name, params) {
		if (App[type] == null) {
			Ti.API.warn('Trying to load an object that does not exist in the App namespace');
			return false;
		} else if (App[type][name] == null) {
			Ti.include(type.toLowerCase() + '/' + name + '.js');
			Ti.API.info(type + ' ' + name + ' loaded');
			return new App[type][name](params);
		} else {
			Ti.API.info(type + ' ' + name + ' already loaded');
			return new App[type][name](params);
		}
	},
	
	loadModule: function() {
		if (App.devGuide == null) {
			App.devGuide = require('ti.moddevguide');
			Ti.API.info("module is => " + App.devGuide);
		}
	},
	
	unloadModule: function() {
		App.devGuide = null;
	}
};

Ti.include(
	'ui.js'
);

App.win = App.UI.createAppWindow();
App.win.open();