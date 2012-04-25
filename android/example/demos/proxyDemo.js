// Private implementation details for commonJS module

var devGuide = null;
var	proxyList = [];
var proxyCountLbl = null;
var deleteProxyBtn = null;
		
function updateProxyCount() {
	proxyCountLbl.text = 'Proxy Count: ' + proxyList.length;
	deleteProxyBtn.enabled = proxyList.length > 0;
}

function handleCreateProxy(e) {
	var proxy = devGuide.createLifeCycle ({
		a: 'Hello',
		b: 'World'
	});

	proxyList.push(proxy);

	updateProxyCount();
}
		
function handleDeleteProxy(e) {
	var proxy = proxyList.pop();
	
	// Call proxy for any necessary cleanup
	proxy.close();

	updateProxyCount();
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Save the module object -- we'll need it later
	devGuide = modDevGuide;
}

exports.cleanup = function() {
	proxyList = [];
	proxyCountLbl = null;
	deleteProxyBtn = null;
	devGuide = null;
}

exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates the proxy lifecycle. Press the \'Create Proxy\' button to create a new instance of the proxy. Press the \'Delete Proxy\' button to destroy an instance of the proxy. Lifecycle messages will be output to the console.',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));

	proxyCountLbl = Ti.UI.createLabel({
		text: '',
		top: 10,
		height: Ti.UI.SIZE || 'auto',
		width: Ti.UI.SIZE || 'auto',
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

	deleteProxyBtn = Ti.UI.createButton({
		title: 'Delete Proxy',
		top:10,
		width:150,
		height:60
	});

	createProxyBtn.addEventListener('click', handleCreateProxy);
	deleteProxyBtn.addEventListener('click', handleDeleteProxy);

	win.add(createProxyBtn);
	win.add(deleteProxyBtn);
	win.add(proxyCountLbl);

	updateProxyCount();
}
