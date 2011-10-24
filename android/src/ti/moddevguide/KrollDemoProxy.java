/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.moddevguide;

import java.util.List;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollInvocation;
import org.appcelerator.kroll.KrollPropertyChange;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.KrollProxyListener;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiContext;
import org.appcelerator.titanium.kroll.KrollCallback;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;

// The proxy is declared with the @Kroll.proxy annotation

@Kroll.proxy(creatableInModule = ModdevguideModule.class)
public class KrollDemoProxy extends LifeCycleProxy 
	implements KrollProxyListener 
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";
	
	// The JavaScript callbacks (KrollCallback objects)
	private KrollCallback successCallback = null;
	private KrollCallback cancelCallback = null;
	private KrollCallback requestDataCallback = null;
	
	public KrollDemoProxy(TiContext tiContext) 
	{
		super(tiContext);

		// Registering for Event Listeners is not automatically done for KrollProxy subclasses.
		// Register for the event change notifications if interested in receiving the 
		// listenerAdded and listenerRemoved notifications.
		eventManager.addOnEventChangeListener(this);
	}

	// Helper Methods
	
	private void sendSuccessEvent(String message, String title)
	{
		if (successCallback != null) {
			KrollDict event = new KrollDict();
			event.put("message", message);
			event.put("title", title);
			
			// Fire an event directly to the specified listener (callback)
			fireSingleEvent("success", successCallback, event, true);
		}
	}
	
	private void sendCancelEvent(String message, String title)
	{
		if (cancelCallback != null) {
			KrollDict event = new KrollDict();
			event.put("message", message);
			event.put("title", title);
			
			// Fire an event directly to the specified listener (callback)
			fireSingleEvent("cancel", cancelCallback, event, true);
		}
	}

	// Public APIs (available in javascript)
	
	// The methods are exposed to javascript because of the @Kroll.method annotation
	
	@Kroll.method
	public void registerCallbacks(KrollInvocation invocation, KrollDict args)
	{
		Object callback;
		
		Log.d(LCAT,"[KROLLDEMO] registerCallbacks called");
		
		// Save the callback functions, verifying that they are of the correct type
		if (args.containsKey("success")) {
			callback = args.get("success");
			if (callback instanceof KrollCallback) {
				successCallback = (KrollCallback)callback;
			}
		}
		if (args.containsKey("cancel")) {
			callback = args.get("cancel");
			if (callback instanceof KrollCallback) {
				cancelCallback = (KrollCallback)callback;
			}
		}	
		if (args.containsKey("requestData")) {
			callback = args.get("requestData");
			if (callback instanceof KrollCallback) {
				requestDataCallback = (KrollCallback)callback;
			}
		}
		
		Log.d(LCAT,"[KROLLDEMO] Callbacks registered");
	}
	
	@Kroll.method
	public void requestDataWithCallback(KrollInvocation invocation)
	{
		Log.d(LCAT,"[KROLLDEMO] requestDataWithCallback called");
		
		// The 'callSync' method of the KrollCallback object can be used to directly 
		// call the associated JavaScript function and get a return value.
		Object result = requestDataCallback.callSync(invocation, null);
		
		Log.d(LCAT,"[KROLLDEMO] requestData callback returned " + result);
	}
	
	@Kroll.method(runOnUiThread=true)
	public void signalCallbackWithSuccess(KrollInvocation invocation, Boolean success)
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
	
	@Kroll.method(runOnUiThread=true)
	public void signalEvent(KrollInvocation invocation)
	{
		Log.d(LCAT,"[KROLLDEMO] signalEvent called");
		
		// It is a good idea to check if there are listeners for the event that
		// is about to fired. There could be zero or multiple listeners for the
		// specified event.
		if (hasListeners("demoEvent")) {
			KrollDict event = new KrollDict();
			event.put("index",1);
			event.put("value",100);
			event.put("name","userEvent");
			
			fireEvent("demoEvent", event);
			
			Log.d(LCAT,"[KROLLDEMO] demoEvent fired");
		}
	}
	
	@Kroll.method
	public void callThisCallbackDirectly(KrollInvocation invocation, KrollDict args)
	{
		// By specifying an explicit argument type in the method declaration (rather
		// than a generic Object array), the argument type has already been validated
		
		Log.d(LCAT,"[KROLLDEMO] callThisCallbackDirectly called");
		
		KrollCallback callback = null;
		Object object = args.get("callback");
		if (object instanceof KrollCallback) {
			callback = (KrollCallback)object;
		}
		
		Object data = args.get("data");
		
		// Our callback will be passed 2 arguments: the value of the data property
		// from the dictionary passed in and a fixed string
		Object[] arrayOfValues = new Object[]{ data, "KrollDemo" };
		
		if (callback != null) {
			// The 'callSync' method of the KrollCallback object can be used to directly 
			// call the associated JavaScript function and get a return value. In this
			// instance there is no return value for the callback.
			callback.callSync(invocation, arrayOfValues);
			
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
		// whenever a proxy property value is updated. Note that this method is only called if the
		// new value is different than the current value.

		Log.d(LCAT, "[KROLLDEMO] Property " + key + "changed from " + oldValue + " to " + newValue);
		
		// If is a good idea to check if there are listeners for the event that
		// is about to fired. There could be zero or multiple listeners for the
		// specified event.
		if (hasListeners("propertyChange")) {
			KrollDict event = new KrollDict();
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