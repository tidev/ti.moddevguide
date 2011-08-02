App.controllers.krollMethodsDemo = function () {

	var API = {
		methodsDemo: null,
		
		init: function() {
			API.methodsDemo = App.devGuide.createMethodsDemo();	
		},
		
		cleanup: function() {
			API.methodsDemo = null;
		},
		
		handlePickerSelection: function(e) {

			var result = null;
			try {
				switch (e.row.typeid) {
					case 'noreturn':
						API.methodsDemo.demoMethodNoReturn();
						break;
					case 'integer':
						result = API.methodsDemo.demoMethodNumberInt(5, 17);
						break;
					case 'float':
						result = API.methodsDemo.demoMethodNumberFloat(2.7, '18.2');
						break;
					case 'strings':
						result = API.methodsDemo.demoMethodString('Joe', 'Smith', 25);
						break;
					case 'dictionary':
						result = API.methodsDemo.demoMethodDictionary(['a', 'b', 'c', 'd', 'e', 'f']);
						Ti.API.info('Dictionary Result:');
						Ti.API.info(result);
						break;
					case 'date':
						result = API.methodsDemo.demoMethodDate({ month: 7, day: 4, year: 1776 });
						break;
					case 'rect':
						var rect = API.methodsDemo.demoMethodRect(10,10,100,200);
						result = 'x: ' + rect.x + ' y: ' + rect.y + ' width: ' + rect.width + ' height: ' + rect.height;
						break;
					case 'point':
						var point = API.methodsDemo.demoMethodPoint(25,40);
						result = 'x: ' + point.x + ' y: ' + point.y;
						break;
					case 'range':
						var range = API.methodsDemo.demoMethodRange(10,100);
						result = 'Location: ' + range.location + ' Length: ' + range.length;
						break;
					case 'color':
						result = API.methodsDemo.demoMethodColor('green');
						break;
					case 'array':
						result = API.methodsDemo.demoMethodArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
						break;
					case 'file':
						var t = Ti.Filesystem.createTempFile();
						var file = API.methodsDemo.demoMethodFile(t.nativePath);
						result = 'File with path: ' + file.path;
						t.deleteFile();
					    break;
					case 'blob':
						var blob = API.methodsDemo.demoMethodBlob();
						result = 'Blob with text: ' + blob.text;
					    break;
					case 'null':
						result = API.methodsDemo.demoMethodNull();
						break;
				}
				
				alert('Method returned:\n' + result);
			} catch (e) {
				alert(e);
			}
		},
		
		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates how to use methods and return values in your module. Select a method type to call into the module. Some callback messages will be output to the console.',
				textAlign:'left',
				font:{ fontsize: 12 },
				top:10,
				right:10,
				left:10,
				color:'black',
				width:'auto',
				height:'auto'
			}));
			
			var data = [
				{title: 'No return', typeid: 'noreturn' },
				{title: 'Integer', typeid: 'integer' },
				{title: 'Float', typeid: 'float' },
				{title: 'Strings', typeid: 'strings' },
				{title: 'Date', typeid: 'date' },
				{title: 'Rect', typeid: 'rect' },
				{title: 'Point', typeid: 'point' },
				{title: 'Range', typeid: 'range' },
				{title: 'Color', typeid: 'color' },
				{title: 'Dictionary', typeid: 'dictionary' },
				{title: 'Array', typeid: 'array' },
				{title: 'File', typeid: 'file' },
				{title: 'Blob', typeid: 'blob' },
				{title: 'Null', typeid: 'null' }
			];
			
			var picker = Ti.UI.createPicker({
				top:20
			});
			picker.add(data);
			picker.selectionIndicator = true;
			picker.setSelectedRow(0,-1,false);
	
			picker.addEventListener('change', API.handlePickerSelection);
			
			win.add(picker);
		}
	};
	
	return API;
}