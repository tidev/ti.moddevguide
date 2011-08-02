App.UI = (function(){
	function createAppWindow() {
		
		var tabGroup = Ti.UI.createTabGroup();
		
		var win = createDemoWindow();
		
		App.UI.tab = Ti.UI.createTab({
			title: 'Module Development Guide',
			window: win
		});
		
		tabGroup.addTab(App.UI.tab);
		
		return tabGroup;
	};
	
	function createDemoWindow() {
		var win = Ti.UI.createWindow({
			title: 'Module Development Guide',
			backgroundColor: 'white',
			tabBarHidden: true
		});
		
		win.add(createDemoTableView());
		
		return win;	
	};
	
	function createDemoTableView() {
		var sections = [];
		var cnt = App.demos.length;
		
		for (var index = 0; index < cnt; index++) {
			if ((index == 0) || (App.demos[index].section != App.demos[index-1].section)) {
				sections.push(Ti.UI.createTableViewSection({
					headerTitle: App.demos[index].section
				}));
			}
							
			row = Ti.UI.createTableViewRow({
				title: App.demos[index].title,
				hasChild: true
			});
			
			sections[sections.length - 1].add(row);
		}
		
		var tableView = Ti.UI.createTableView({
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			data: sections
		});
		
		tableView.addEventListener('click', openDemoWindow);
		
		return tableView;
	};
	
	function openDemoWindow(e) {
		var demoWindow = Ti.UI.createWindow({
			title: e.rowData.title,
			backgroundColor: 'white',
			layout: 'vertical'
		});
		
		var demo = App.loadObject('controllers', App.demos[e.index].name, {});

		// Ensure that the module development guide module is loaded before initialization		
		App.loadModule();
		
		// Register our event listener so we can call the cleanup function
		demoWindow.addEventListener('close', demo.cleanup);
		
		// Call the init method of the demo object
		demo.init();
		
		// Now create the window and let it do its thing
		demo.create(demoWindow);

		App.UI.tab.open(demoWindow,
			{ animated: true }
		);
	};
	
	return {
		createAppWindow: createAppWindow
	};
})();
