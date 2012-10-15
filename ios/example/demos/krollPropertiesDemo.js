// Private implementation details for commonJS module

var krollDemo = null;
		
function handlePropertyChangesSwitch(e) {
	krollDemo.watchPropertyChanges = e.value;
}

function handleSetPropertyValue(e) {
	krollDemo.testValue = e.source.value;
}

function handleGetPropertyValue(e) {
	alert('Current property value is ' + krollDemo.testValue);
}

function handleBatchUpdate(e) {
	krollDemo.value1 = (krollDemo.value1 | 0) + 5;
	krollDemo.value2 = { name: 'Hello', value: 'World' };
	krollDemo.value3 = !(krollDemo.value3 | false);
	krollDemo.value4 = 'This is a test';	
}

function handlePropertyChangeNotification(e) {
	var result = 'Property ' + e.property + ' changed\nOldValue: ' + e.oldValue + '\nNewValue: ' + e.newValue;
	alert(result);
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Create the proxy
	krollDemo = modDevGuide.createKrollDemo({ arg1: "Hello", arg2: "World" });	
	
	krollDemo.addEventListener('propertyChange', handlePropertyChangeNotification);	
	krollDemo.watchPropertyChanges = true;
}

exports.cleanup = function() {
	krollDemo = null;
}

exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates proxy properties and how to get / set their values as well as process property change notifications. Some messages will be output to the console.',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));
	
	var view1 = Ti.UI.createView({
		layout:'horizontal',
		width:'100%',
		height:Ti.UI.SIZE || 'auto',
		top:10,
		left:10
	});
	
	view1.add(Ti.UI.createLabel({
		text:'Property Changes:',
		textAlign:'left',
		font:{ fontsize: 12 },
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));
	
	var switchPropertyChanges = Ti.UI.createSwitch({
		value:krollDemo.watchPropertyChanges,
		left:10,
		top:0
	});
	view1.add(switchPropertyChanges);
	
	var view2= Ti.UI.createView({
		layout:'horizontal',
		width:'100%',
		height:Ti.UI.SIZE || 'auto',
		top:20,
		left:10
	})
	
	view2.add(Ti.UI.createLabel({
		text:'Test Value:',
		textAlign:'left',
		font:{ fontsize: 12 },
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));
	
	var valueField = Ti.UI.createTextField({
		hintText:'Enter a value',
		font:{ fontsize: 12 },
		color:'black',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		left:10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	view2.add(valueField);
	
	var valueBtn = Ti.UI.createButton({
		title:'Get Value',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});
	
	var batchUpdateBtn = Ti.UI.createButton({
		title:'Update Multiple Properties',
		width:200,
		height:Ti.UI.SIZE || 'auto',
		top:20
	});
	
	switchPropertyChanges.addEventListener('change', handlePropertyChangesSwitch);
	valueField.addEventListener('return', handleSetPropertyValue);
	valueBtn.addEventListener('click', handleGetPropertyValue);
	batchUpdateBtn.addEventListener('click', handleBatchUpdate);
	
	win.add(view1);
	win.add(view2);
	win.add(valueBtn);
	win.add(batchUpdateBtn);
}
