// Private implementation details for commonJS module

var methodsDemo = null;

function handlePickerSelection(e) {
	var result = null;
	try {
		switch (e.row.typeid) {
		    case 'select':
			    return;
			case 'noreturn':
				methodsDemo.demoMethodNoReturn();
				break;
			case 'integer':
				result = methodsDemo.demoMethodNumberInt(5, 17);
				break;
			case 'float':
				result = methodsDemo.demoMethodNumberFloat(2.7, '18.2');
				break;
			case 'strings':
				result = methodsDemo.demoMethodString('Joe', 'Smith', 25);
				break;
			case 'dictionary':
				result = methodsDemo.demoMethodDictionary(['a', 'b', 'c', 'd', 'e', 'f']);
				Ti.API.info('Dictionary Result:');
				Ti.API.info(result);
				break;
			case 'date':
				result = methodsDemo.demoMethodDate({ month: 7, day: 4, year: 1776 });
				break;
			case 'rect':
				var rect = methodsDemo.demoMethodRect(10,10,100,200);
				result = 'x: ' + rect.x + ' y: ' + rect.y + ' width: ' + rect.width + ' height: ' + rect.height;
				break;
			case 'point':
				var point = methodsDemo.demoMethodPoint(25,40);
				result = 'x: ' + point.x + ' y: ' + point.y;
				break;
			case 'range':
				var range = methodsDemo.demoMethodRange(10,100);
				result = 'Location: ' + range.location + ' Length: ' + range.length;
				break;
			case 'color':
				result = methodsDemo.demoMethodColor('green');
				if (Ti.Platform.name == 'android') {
				    // Convert to hex string for display
					var u = 0xFFFFFFFF + result + 1;
					result = "0x" + u.toString(16).toUpperCase();
				}
				break;
			case 'array':
				result = methodsDemo.demoMethodArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
				break;
			case 'file':
				var t = Ti.Filesystem.createTempFile();
				var file = methodsDemo.demoMethodFile(t.nativePath);
				if (Ti.Platform.name == 'android') {
					result = 'File with path: ' + file.nativePath;
				} else {
					result = 'File with path: ' + file.path;
				}
				t.deleteFile();
				break;
			case 'blob':
				var blob = methodsDemo.demoMethodBlob();
				result = 'Blob with text: ' + blob.text;
				break;
			case 'null':
				result = methodsDemo.demoMethodNull();
				break;
			case 'optional':
				result = methodsDemo.demoMethodOptionalArgs('Welcome');
				alert('Method returned:\n' + result);
				result = methodsDemo.demoMethodOptionalArgs('Hello', 'World');
				break;
		}
		
		alert('Method returned:\n' + result);
	} catch (e) {
		alert(e);
	}
}

// Public implementation details for commonJS module

exports.initialize = function(modDevGuide) {
	// Create the proxy
	methodsDemo = modDevGuide.createMethodsDemo();
}

exports.cleanup = function() {
	// Release the proxy
	methodsDemo = null;
}

exports.create = function(win) {
	win.add(Ti.UI.createLabel({
		text:'This demonstrates how to use methods and return values in your module. Select a method type to call into the module. Some callback messages will be output to the console.',
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
	data.push(Ti.UI.createPickerRow({title: 'No return', typeid: 'noreturn' }));
	data.push(Ti.UI.createPickerRow({title: 'Integer', typeid: 'integer' }));
	data.push(Ti.UI.createPickerRow({title: 'Float', typeid: 'float' }));
	data.push(Ti.UI.createPickerRow({title: 'Strings', typeid: 'strings' }));
	data.push(Ti.UI.createPickerRow({title: 'Date', typeid: 'date' }));
	data.push(Ti.UI.createPickerRow({title: 'Rect', typeid: 'rect' }));
	data.push(Ti.UI.createPickerRow({title: 'Point', typeid: 'point' }));
	data.push(Ti.UI.createPickerRow({title: 'Range', typeid: 'range' }));
	data.push(Ti.UI.createPickerRow({title: 'Color', typeid: 'color' }));
	data.push(Ti.UI.createPickerRow({title: 'Dictionary', typeid: 'dictionary' }));
	data.push(Ti.UI.createPickerRow({title: 'Array', typeid: 'array' }));
	data.push(Ti.UI.createPickerRow({title: 'File', typeid: 'file' }));
	data.push(Ti.UI.createPickerRow({title: 'Blob', typeid: 'blob' }));
	data.push(Ti.UI.createPickerRow({title: 'Null', typeid: 'null' }));
	data.push(Ti.UI.createPickerRow({title: 'Optional Args', typeid: 'optional' }));
		
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
