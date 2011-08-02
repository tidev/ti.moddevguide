App.controllers.krollParametersDemo = function () {

	var API = {
		parametersDemo: null,
		
		init: function() {
			API.parametersDemo = App.devGuide.createParametersDemo();	
		},
		
		cleanup: function() {
			API.parametersDemo = null;
		},
		
		handlePickerSelection: function(e) {

			try {
				switch (e.row.typeid) {
					case 'string': 
						API.parametersDemo.analyzeParameters('Hello World');
						break;
					case 'integer':
						API.parametersDemo.analyzeParameters(100);
						break;
					case 'float':
						API.parametersDemo.analyzeParameters(10.7);
						break;
					case 'date':
						var myDate = new Date();
						myDate.setFullYear(2011);
						myDate.setMonth(7);
						myDate.setDate(4);
						API.parametersDemo.analyzeParameters(myDate);
						break;
					case 'null':
						API.parametersDemo.analyzeParameters(null);
						break;
					case 'dictionary':
						API.parametersDemo.analyzeParameters({ a:1, b:2 });
						break;
					case 'nested_dictionary':
					    var y = { a:1, b:2 };
						API.parametersDemo.analyzeParameters({ a:1, b:{ z:1 }, c:y });
						break;
					case 'number_array':
						API.parametersDemo.analyzeParameters([1,2,3]);
						break;
					case 'callback':
						API.parametersDemo.analyzeParameters(function() { Ti.API.Info('Test'); });
						break;
					case 'mixed':
						API.parametersDemo.analyzeParameters('Test', 10, 4.3, { title: 'Hello', subtitle: 'World' }, [ 'a', 3, 2.1 ] );
						break;
				}
				
				alert('Check console output for results of parameter analysis');
			} catch (e) {
				alert(e);
			}		
		},
		
		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates a variety of parameter types and how they are mapped to native types. Select a parameter type to analyze how they are received in the module. Parameter messages will be output to the console.',
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
				{title: 'String', typeid: 'string' },
				{title: 'Integer', typeid: 'integer' },
				{title: 'Float', typeid: 'float' },
				{title: 'Date', typeid: 'date' },
				{title: 'Null', typeid: 'null' },
				{title: 'Dictionary', typeid: 'dictionary' },
				{title: 'Nested Dictionary', typeid: 'nested_dictionary' },
				{title: 'Array of Numbers', typeid: 'number_array' },
				{title: 'Callback', typeid: 'callback' },
				{title: 'Mixed', typeid: 'mixed' }
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