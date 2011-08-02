App.controllers.krollCallbacksAndEventsDemo = function () {

	var API = {
		krolldemo: null,
		
		init: function() {
			API.krolldemo = App.devGuide.createKrollDemo();
			
			// This calls the 'registerCallbacks' method in the module which retains and stores
			// the KrollCallback functions for use later on.
			API.krolldemo.registerCallbacks({
			    success: API.successCallback,
				cancel: API.cancelCallback,
				requestData: API.requestDataCallback
			});

			// Set up an event listener for a module event
			API.krolldemo.addEventListener('demoEvent', API.demoEventHandler);
		},
		
		cleanup: function() {
			API.krolldemo = null;
		},
		
		successCallback: function(e) {
			alert("Success: " + e.title + "\nMessage: " + e.message);
		},
		
		cancelCallback: function(e) {
			alert("Cancel: " + e.title + "\nMessage: " + e.message);
		},
		
		directCallback: function(arg1, arg2) {
		    Ti.API.info('Direct callback\n' + arg1 + '\n' + arg2);
		},
		
		requestDataCallback: function(e) {
			Ti.API.info('Callback request for data');
			return 100;
		},
		
		demoEventHandler: function(e) {
			alert('Demo Event\nindex: ' + e.index + '\nvalue: ' + e.value + '\nname: ' + e.name);
		},
		
		handleSignalSuccess: function(e) {
		    // This sets the 'title' property of the module object
			API.krolldemo.title = 'Successful';
			
			// This calls the 'signalCallbackWithSuccess' method in the module which fires a success event
			// notification to the registered callback method    
			API.krolldemo.signalCallbackWithSuccess(true);
		},
			
		handleSignalCancelled: function(e) {
		    // This sets the 'title' property of the module object
			API.krolldemo.title = 'Cancelled';
			
			// This calls the 'signalCallbackWithSuccess' method in the module which fires a cancel event
			// notification to the registered callback method
			API.krolldemo.signalCallbackWithSuccess(false);
		},
			
		handleCallbackDirectly: function(e) {
		    // This calls the 'callThisCallbackDirectly' method in the module which calls the 
		    // callback immediately, passing 2 arguments to the callback function.
			API.krolldemo.callThisCallbackDirectly({
			    callback: API.directCallback,
				data: "Hello World"
			});
			
			alert('Check console output for results');
		},
			
		handleSignalEvent: function(e) {
			// This calls the 'signalEventWithNoArgs' method in the module which posts a 'demoEvent'
			// event to all registered listeners
			API.krolldemo.signalEvent();
		},
			
		handleRequestData: function(e) {
			// This calls the 'requestDataWithCallback' method in the module which immediately calls
			// back to the registered requestDataCallback function to retrieve data
		    API.krolldemo.requestDataWithCallback();
		    
			alert('Check console output for results');
		},

		create: function(win) {			
			win.add(Ti.UI.createLabel({
				text:'This demonstrates how to use callbacks and events in your module and how to call from your module back into JavaScript. Some callback messages will be output to the console.',
				textAlign:'left',
				font:{ fontsize: 12 },
				top:10,
				right:10,
				left:10,
				color:'black',
				width:'auto',
				height:'auto'
			}));
	
			var btn1 = Ti.UI.createButton({
			    title:'Success Event',
				width:200,
				height:40,
				top:20
			});
			
			var btn2 = Ti.UI.createButton({
			    title:'Cancel Event',
				width:200,
				height:40,
				top:20
			});

			var btn3 = Ti.UI.createButton({
			    title:'Direct Callback',
				width:200,
				height:40,
				top:20
			});

			var btn4 = Ti.UI.createButton({
			    title:'Demo Event',
				width:200,
				height:40,
				top:20
			});

			var btn5 = Ti.UI.createButton({
			    title:'Request Data',
				width:200,
				height:40,
				top:20
			});

			btn1.addEventListener('click', API.handleSignalSuccess);
			btn2.addEventListener('click', API.handleSignalCancelled);
			btn3.addEventListener('click', API.handleCallbackDirectly);
			btn4.addEventListener('click', API.handleSignalEvent);
			btn5.addEventListener('click', API.handleRequestData);

			win.add(btn1);
			win.add(btn2);
			win.add(btn3);
			win.add(btn4);
			win.add(btn5);
		}
	};
	
	return API;
}