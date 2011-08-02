App.controllers.proxyDemo = function () {

	var API = {
		proxyList: [],
		proxyCountLbl: null,
		deleteProxyBtn: null,
		
		init: function() {},
		
		cleanup: function() {
			API.proxyList = [];
			API.proxyCountLbl = null;
			API.deleteProxyBtn = null;
		},	
		
		updateProxyCount: function() {
			API.proxyCountLbl.text = 'Proxy Count: ' + API.proxyList.length;
			API.deleteProxyBtn.enabled = API.proxyList.length > 0;
		},

		handleCreateProxy: function(e) {
			var proxy = App.devGuide.createLifeCycle ({
				a: 'Hello',
				b: 'World'
			});

			API.proxyList.push(proxy);

			API.updateProxyCount();
		},
		
		handleDeleteProxy: function(e) {
			API.proxyList.pop();
	
			API.updateProxyCount();
		},

		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates the proxy lifecycle. Press the \'Create Proxy\' button to create a new instance of the proxy. Press the \'Delete Proxy\' button to destroy an instance of the proxy. Lifecycle messages will be output to the console.',
				textAlign:'left',
				font:{ fontsize: 12 },
				top:10,
				right:10,
				left:10,
				color:'black',
				width:'auto',
				height:'auto'
			}));
	
			API.proxyCountLbl = Ti.UI.createLabel({
				text: '',
				top: 10,
				height: 'auto',
				width: 'auto',
				textAlign: 'left',
				color: 'black',
				font: { fontSize: 12 }
			});

			var createProxyBtn = Ti.UI.createButton({
				title: 'Create Proxy',
				top:10,
				width:150,
				height:60
			});

			API.deleteProxyBtn = Ti.UI.createButton({
				title: 'Delete Proxy',
				top:10,
				width:150,
				height:60
			});

			createProxyBtn.addEventListener('click', API.handleCreateProxy);
			API.deleteProxyBtn.addEventListener('click', API.handleDeleteProxy);

			win.add(createProxyBtn);
			win.add(API.deleteProxyBtn);
			win.add(API.proxyCountLbl);

			API.updateProxyCount();
		}
	};
	
	return API;
}