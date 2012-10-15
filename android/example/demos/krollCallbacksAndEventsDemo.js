// Private implementation details for commonJS module

var krollDemo = null;

function successCallback(e) {
	alert("Success: " + e.title + "\nMessage: " + e.message);
}

function cancelCallback(e) {
	alert("Cancel: " + e.title + "\nMessage: " + e.message);
}

function directCallback(arg1, arg2) {
	Ti.API.info('Direct callback\n' + arg1 + '\n' + arg2);
}

function requestDataCallback(e) {
	Ti.API.info('Callback request for data');
	return 100;
}

function demoEventHandler(e) {
	alert('Demo Event\nindex: ' + e.index + '\nvalue: ' + e.value + '\nname: ' + e.name);
}

function handleSignalSuccess(e) {
	// This sets the 'title' property of the module object
	krollDemo.title = 'Successful';
	
	// This calls the 'signalCallbackWithSuccess' method in the module which fires a success event
	// notification to the registered callback method    
	krollDemo.signalCallbackWithSuccess(true);
}
	
function handleSignalCancelled(e) {
	// This sets the 'title' property of the module object
	krollDemo.title = 'Cancelled';
	
	// This calls the 'signalCallbackWithSuccess' method in the module which fires a cancel event
	// notification to the registered callback method
	krollDemo.signalCallbackWithSuccess(false);
}
	
function handleCallbackDirectly(e) {
	// This calls the 'callThisCallbackDirectly' method in the module which calls the 
	// callback immediately, passing 2 arguments to the callback function.
	krollDemo.callThisCallbackDirectly({
		callback: directCallback,
		data: "Hello World"
	});
	
	alert('Check console output for results');
}
	
function handleSignalEvent(e) {
	// This calls the 'signalEvent' method in the module which posts a 'demoEvent'
	// event to all registered listeners
	krollDemo.signalEvent();
}
	
function handleRequestData(e) {
	// This calls the 'requestDataWithCallback' method in the module which immediately calls
	// back to the registered requestDataCallback function to retrieve data
	krollDemo.requestDataWithCallback();
	
	alert('Check console output for results');
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Create the proxy
	krollDemo = modDevGuide.createKrollDemo();
	
	// This calls the 'registerCallbacks' method in the module which retains and stores
	// the KrollCallback functions for use later on.
	krollDemo.registerCallbacks({
		success: successCallback,
		cancel: cancelCallback,
		requestData: requestDataCallback
	});

	// Set up an event listener for a module event
	krollDemo.addEventListener('demoEvent', demoEventHandler);
}

exports.cleanup = function() {
	// Release the proxy
	krollDemo = null;
}

exports.create = function(win) {	
	win.add(Ti.UI.createLabel({
		text:'This demonstrates how to use callbacks and events in your module and how to call from your module back into JavaScript. Some callback messages will be output to the console.',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));

	var btn1 = Ti.UI.createButton({
		title:'Success Event',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});
	
	var btn2 = Ti.UI.createButton({
		title:'Cancel Event',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});

	var btn3 = Ti.UI.createButton({
		title:'Direct Callback',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});

	var btn4 = Ti.UI.createButton({
		title:'Demo Event',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});

	var btn5 = Ti.UI.createButton({
		title:'Request Data',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});

	btn1.addEventListener('click', handleSignalSuccess);
	btn2.addEventListener('click', handleSignalCancelled);
	btn3.addEventListener('click', handleCallbackDirectly);
	btn4.addEventListener('click', handleSignalEvent);
	btn5.addEventListener('click', handleRequestData);

	win.add(btn1);
	win.add(btn2);
	win.add(btn3);
	win.add(btn4);
	win.add(btn5);
}
