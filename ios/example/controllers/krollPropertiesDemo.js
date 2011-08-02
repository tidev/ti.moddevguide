App.controllers.krollPropertiesDemo = function () {

	var API = {
		krolldemo: null,
		
		init: function() {
			API.krolldemo = App.devGuide.createKrollDemo();	
			
			API.krolldemo.addEventListener('propertyChange', API.handlePropertyChangeNotification);	
			API.krolldemo.watchPropertyChanges = true;
		},
		
		cleanup: function() {
			API.krolldemo = null;
		},
		
		handlePropertyChangesSwitch: function(e) {
			API.krolldemo.watchPropertyChanges = e.value;
		},
		
		handleSetPropertyValue: function(e) {
			API.krolldemo.testValue = e.source.value;
		},
		
		handleGetPropertyValue: function(e) {
			alert('Current property value is ' + API.krolldemo.testValue);
		},
		
		handleBatchUpdate: function(e) {
			API.krolldemo.value1 = (API.krolldemo.value1 | 0) + 5;
			API.krolldemo.value2 = { name: 'Hello', value: 'World' };
			API.krolldemo.value3 = !(API.krolldemo.value3 | false);
			API.krolldemo.value4 = 'This is a test';	
		},
		
		handlePropertyChangeNotification: function(e) {
			var result = 'Property ' + e.property + ' changed\nOldValue: ' + e.oldValue + '\nNewValue: ' + e.newValue;
			alert(result);
		},
		
		create: function(win) {
			win.add(Ti.UI.createLabel({
				text:'This demonstrates proxy properties and how to get / set their values as well as process property change notifications. Some messages will be output to the console.',
				textAlign:'left',
				font:{ fontsize: 12 },
				top:10,
				right:10,
				left:10,
				color:'black',
				width:'auto',
				height:'auto'
			}));
			
			var view1 = Ti.UI.createView({
				layout:'horizontal',
				width:'100%',
				height:'30',
				top:10,
				left:10
			});
			
			view1.add(Ti.UI.createLabel({
				text:'Property Changes:',
				textAlign:'left',
				font:{ fontsize: 12 },
				color:'black',
				width:'auto',
				height:'auto',
				top:4
			}));
			
			var switchPropertyChanges = Ti.UI.createSwitch({
				value:API.krolldemo.watchPropertyChanges,
				left:10,
				top:0
			});
			view1.add(switchPropertyChanges);
			
			var view2= Ti.UI.createView({
				layout:'horizontal',
				width:'100%',
				height:'30',
				top:20,
				left:10
			})
			
			view2.add(Ti.UI.createLabel({
				text:'Test Value:',
				textAlign:'left',
				font:{ fontsize: 12 },
				color:'black',
				width:'auto',
				height:'auto',
				top:4
			}));
			
			var valueField = Ti.UI.createTextField({
				hintText:'Enter a value',
				font:{ fontsize: 12 },
				color:'black',
				width:100,
				height:'24',
				left:10,
				borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			view2.add(valueField);
			
			var valueBtn = Ti.UI.createButton({
			    title:'Get Value',
				width:200,
				height:40,
				top:20
			});
			
			var batchUpdateBtn = Ti.UI.createButton({
				title:'Update Multiple Properties',
				width:200,
				height:40,
				top:20
			});
			
			switchPropertyChanges.addEventListener('change', API.handlePropertyChangesSwitch);
			valueField.addEventListener('return', API.handleSetPropertyValue);
			valueBtn.addEventListener('click', API.handleGetPropertyValue);
			batchUpdateBtn.addEventListener('click', API.handleBatchUpdate);
			
			win.add(view1);
			win.add(view2);
			win.add(valueBtn);
			win.add(batchUpdateBtn);
		}
	};
	
	return API;
}