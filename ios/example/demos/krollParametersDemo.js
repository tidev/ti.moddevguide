// Private implementation details for commonJS module

var parametersDemo = null;

function handlePickerSelection(e) {
	try {
		switch (e.row.typeid) {
			case 'select':
				return;
			case 'string': 
				parametersDemo.analyzeParameters('Hello World');
				break;
			case 'integer':
				parametersDemo.analyzeParameters(100);
				break;
			case 'float':
				parametersDemo.analyzeParameters(10.7);
				break;
			case 'date':
				var myDate = new Date();
				myDate.setFullYear(2011);
				myDate.setMonth(7);
				myDate.setDate(4);
				parametersDemo.analyzeParameters(myDate);
				break;
			case 'null':
				parametersDemo.analyzeParameters(null);
				break;
			case 'dictionary':
				parametersDemo.analyzeParameters({ a:1, b:2 });
				break;
			case 'nested_dictionary':
				var y = { a:1, b:2 };
				parametersDemo.analyzeParameters({ a:1, b:{ z:1 }, c:y });
				break;
			case 'number_array':
				parametersDemo.analyzeParameters([1,2,3]);
				break;
			case 'callback':
				parametersDemo.analyzeParameters(function() { Ti.API.Info('Test'); });
				break;
			case 'mixed':
				parametersDemo.analyzeParameters('Test', 10, 4.3, { title: 'Hello', subtitle: 'World' }, [ 'a', 3, 2.1 ] );
				break;
		}
		
		alert('Check console output for results of parameter analysis');
	} catch (e) {
		alert(e);
	}		
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Create the proxy
	parametersDemo = modDevGuide.createParametersDemo();	
}

exports.cleanup = function() {
	// Release the proxy
	parametersDemo = null;
}

exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates a variety of parameter types and how they are mapped to native types. Select a parameter type to analyze how they are received in the module. Parameter messages will be output to the console.',
		textAlign:'left',
		font:{ fontsize: 12 },
		top:10,
		right:10,
		left:10,
		color:'black',
		width:Ti.UI.SIZE || 'auto',
		height:Ti.UI.SIZE || 'auto'
	}));
	
	var data = [];
	data.push(Ti.UI.createPickerRow({title: 'Select a type', typeid: 'select' }));
	data.push(Ti.UI.createPickerRow({title: 'String', typeid: 'string' }));
	data.push(Ti.UI.createPickerRow({title: 'Integer', typeid: 'integer' }));
	data.push(Ti.UI.createPickerRow({title: 'Float', typeid: 'float' }));
	data.push(Ti.UI.createPickerRow({title: 'Date', typeid: 'date' }));
	data.push(Ti.UI.createPickerRow({title: 'Null', typeid: 'null' }));
	data.push(Ti.UI.createPickerRow({title: 'Dictionary', typeid: 'dictionary' }));
	data.push(Ti.UI.createPickerRow({title: 'Nested Dictionary', typeid: 'nested_dictionary' }));
	data.push(Ti.UI.createPickerRow({title: 'Array of Numbers', typeid: 'number_array' }));
	data.push(Ti.UI.createPickerRow({title: 'Callback', typeid: 'callback' }));
	data.push(Ti.UI.createPickerRow({title: 'Mixed', typeid: 'mixed' }));
	
	var picker = Ti.UI.createPicker({
		top:20,
		width:300,
		type:Ti.UI.PICKER_TYPE_PLAIN
	});
	picker.add(data);
	picker.selectionIndicator = true;

	picker.addEventListener('change', handlePickerSelection);
	
	win.add(picker);
}
