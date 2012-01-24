/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.moddevguide;

import java.util.HashMap;
import java.util.List;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollFunction;
import org.appcelerator.kroll.KrollPropertyChange;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.KrollProxyListener;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.titanium.util.TiConvert;

// The proxy is declared with the @Kroll.proxy annotation

@Kroll.proxy(creatableInModule = ModdevguideModule.class, propertyAccessors = { "title", "testValue", "arg1", "arg2", "value1", "value2" ,"value3", "value4", "value5" })
public class KrollDemoProxy extends LifeCycleProxy 
	implements KrollProxyListener 
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";
	
	// The JavaScript callbacks (KrollCallback objects)
	private KrollFunction successCallback = null;
	private KrollFunction cancelCallback = null;
	private KrollFunction requestDataCallback = null;
	
	public KrollDemoProxy() 
	{
		super();

		// Registering for Event Listeners is automatically done for KrollProxy subclasses.
	}

	// Helper Methods
	
	private void sendSuccessEvent(String message, String title)
	{
		if (successCallback != null) {
			HashMap<String, String> event = new HashMap<String, String>();
			event.put("message", message);
			event.put("title", title);
			
			// Fire an event directly to the specified listener (callback)
			successCallback.call(getKrollObject(), event);
		}
	}
	
	private void sendCancelEvent(String message, String title)
	{
		if (cancelCallback != null) {
			HashMap<String, String> event = new HashMap<String, String>();
			event.put("message", message);
			event.put("title", title);
			
			// Fire an event directly to the specified listener (callback)
			cancelCallback.call(getKrollObject(), event);
		}
	}

	// Public APIs (available in javascript)
	
	// The methods are exposed to javascript because of the @Kroll.method annotation
	
	@Kroll.method
	public void registerCallbacks(HashMap args)
	{
		Object callback;
		
		Log.d(LCAT,"[KROLLDEMO] registerCallbacks called");
		
		// Save the callback functions, verifying that they are of the correct type
		if (args.containsKey("success")) {
			callback = args.get("success");
			if (callback instanceof KrollFunction) {
				successCallback = (KrollFunction)callback;
			}
		}
		if (args.containsKey("cancel")) {
			callback = args.get("cancel");
			if (callback instanceof KrollFunction) {
				cancelCallback = (KrollFunction)callback;
			}
		}	
		if (args.containsKey("requestData")) {
			callback = args.get("requestData");
			if (callback instanceof KrollFunction) {
				requestDataCallback = (KrollFunction)callback;
			}
		}
		
		Log.d(LCAT,"[KROLLDEMO] Callbacks registered");
	}
	
	@Kroll.method
	public void requestDataWithCallback()
	{
		Log.w(LCAT,"[KROLLDEMO] requestDataWithCallback called");
		
		// The 'callSync' method of the KrollCallback object can be used to directly 
		// call the associated JavaScript function and get a return value.
		Log.e(LCAT,"[KROLLDEMO] requestDataWithCallback will not work with 1.8.0.1 until 1.8.1 is released! See TIMOB-6789.");
		//Object result = requestDataCallback.callSync(invocation, null);
		
		//Log.d(LCAT,"[KROLLDEMO] requestData callback returned " + result);
	}
	
	@Kroll.method
	public void signalCallbackWithSuccess(Boolean success)
	{
		Log.d(LCAT,"[KROLLDEMO] signalCallbackWithSuccess called");
		
		// Caller passes in a value indicating if this is a success call or
		// a cancel call.
		
		// Get the title from the properties of the module proxy object
		String title = TiConvert.toString(getProperty("title"));
		
		if (success) {
			sendSuccessEvent("Success", title);
		} else {
			sendCancelEvent("Cancel", title);
		}
		
		Log.d(LCAT,"[KROLLDEMO] Event fired");
	}
	
	@Kroll.method
	public void signalEvent()
	{
		Log.d(LCAT,"[KROLLDEMO] signalEvent called");
		
		// It is a good idea to check if there are listeners for the event that
		// is about to fired. There could be zero or multiple listeners for the
		// specified event.
		if (hasListeners("demoEvent")) {
			HashMap<String, Object> event = new HashMap<String, Object>();
			event.put("index",1);
			event.put("value",100);
			event.put("name","userEvent");
			
			fireEvent("demoEvent", event);
			
			Log.d(LCAT,"[KROLLDEMO] demoEvent fired");
		}
	}
	
	@Kroll.method
	public void callThisCallbackDirectly(HashMap args)
	{
		// By specifying an explicit argument type in the method declaration (rather
		// than a generic Object array), the argument type has already been validated
		
		Log.d(LCAT,"[KROLLDEMO] callThisCallbackDirectly called");
		
		KrollFunction callback = null;
		Object object = args.get("callback");
		if (object instanceof KrollFunction) {
			callback = (KrollFunction)object;
		}
		
		Object data = args.get("data");
		
		// Our callback will be passed 2 arguments: the value of the data property
		// from the dictionary passed in and a fixed string
		Object[] arrayOfValues = new Object[]{ data, "KrollDemo" };
		
		if (callback != null) {
			// The 'callSync' method of the KrollCallback object can be used to directly 
			// call the associated JavaScript function and get a return value. In this
			// instance there is no return value for the callback.
			callback.call(getKrollObject(), arrayOfValues);
			
			Log.d(LCAT,"[KROLLDEMO] callback was called");
		}
	}
	
	// Kroll Property Management
	
	@Kroll.setProperty
	public void setWatchPropertyChanges(boolean enabled) 
	{
		//
		// This method is the 'setter' method for the 'watchPropertyChanges' proxy property.
		// It is called whenever the JavaScript code sets the value of the 'watchPropertyChanges'
		// property.
		//
		// By setting the modelListener property of the proxy, the 'propertyChanged' method
		// will be called whenever a proxy property is updated. This is an alternative technique
		// to implementing individual setter methods if you just need to know when a proxy 
		// property has been updated in the set of properties that the proxy maintains.
		//
		// NOTE: The model listener is automatically set for a module. This is only required for a proxy
		//
		if (enabled) {
			setModelListener(this);
		} else {
			setModelListener(null);
		}

		// If you implement a setter, you should also manually store the property in
		// the properties for the proxy. This is done by calling the 'setProperty' method.
		// Otherwise, you can provide a getter by using the @Kroll.getProperty annotation
		setProperty("watchPropertyChanges", enabled, false);
	}

	// KrollProxyListener methods

	@Override
	public void listenerAdded(String type, int count, KrollProxy proxy) 
	{
		Log.d(LCAT, "[KROLLDEMO] listener added for type " + type);
	}
	
	@Override
	public void listenerRemoved(String type, int count, KrollProxy proxy) 
	{
		Log.d(LCAT, "[KROLLDEMO] listener removed for type " + type);
	}
	
	@Override
	public void processProperties(KrollDict dict) 
	{
		Log.d(LCAT, "[KROLLDEMO] processProperties " + dict);
	}
	
	@Override
	public void propertyChanged(String key, Object oldValue, Object newValue, KrollProxy proxy) 
	{
        // If the 'modelListener' property has been set for this proxy then this method is called
        // whenever a proxy property value is updated. Note that this method is called whenever the
        // setter is called, so it will get called even if the value of the property has not changed.

        if ((oldValue == newValue) ||
            ((oldValue != null) && oldValue.equals(newValue))) {
            return;
        }

		Log.d(LCAT, "[KROLLDEMO] Property " + key + "changed from " + oldValue + " to " + newValue);
		
		// If is a good idea to check if there are listeners for the event that
		// is about to fired. There could be zero or multiple listeners for the
		// specified event.
		if (hasListeners("propertyChange")) {
			HashMap<String, Object> event = new HashMap<String, Object>();
			event.put("property", key);
			event.put("oldValue",oldValue);
			event.put("newValue",newValue);
			
			fireEvent("propertyChange", event);
		}
	}
	
	@Override
	public void propertiesChanged(List<KrollPropertyChange> changes, KrollProxy proxy) 
	{
	
		Log.d(LCAT, "[KROLLDEMO] propertiesChanged");
		
		for (KrollPropertyChange change : changes) {
			propertyChanged(change.getName(), change.getOldValue(), change.getNewValue(), proxy);
		}
	}	
}