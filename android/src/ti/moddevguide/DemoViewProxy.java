/**
  * Appcelerator Titanium Mobile
  * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
  * Licensed under the terms of the Apache Public License
  * Please see the LICENSE included with this distribution for details.
  *
  */

package ti.moddevguide;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.common.AsyncResult;
import org.appcelerator.kroll.common.TiMessenger;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiContext;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.view.TiUIView;
import org.appcelerator.titanium.proxy.TiViewProxy;

import android.app.Activity;
import android.os.Handler;
import android.os.Message;

// The proxy is declared with the @Kroll.proxy annotation

@Kroll.proxy(creatableInModule = ModdevguideModule.class)
public class DemoViewProxy extends TiViewProxy 
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";

	public DemoViewProxy() {
		super();
		
		Log.d(LCAT, "[VIEWPROXY LIFECYCLE EVENT] init");
	}
	
	@Override
	public TiUIView createView(Activity activity) 
	{
		// This method is called when the view needs to be created. This is
		// a required method for a TiViewProxy subclass.
		
		DemoView view = new DemoView(this);
		view.getLayoutParams().autoFillsHeight = true;
		view.getLayoutParams().autoFillsWidth = true;
		
		return view;
	}

	// Handle creation options
	@Override
	public void handleCreationDict(KrollDict options) 
	{
		// This method is called from handleCreationArgs if there is at least
		// argument specified for the proxy creation call and the first argument
		// is a KrollDict object.

		Log.d(LCAT, "VIEWPROXY LIFECYCLE EVENT] handleCreationDict " + options);

		// Calling the superclass method ensures that the properties specified
		// in the dictionary are properly set on the proxy object.
		super.handleCreationDict(options);
	}

	public void handleCreationArgs(KrollModule createdInModule, Object[] args) 
	{
		// This method is one of the initializers for the proxy class. The arguments
		// for the create call are passed as an array of objects. If your proxy 
		// simply needs to handle a single KrollDict argument, use handleCreationDict.
		// The superclass method calls the handleCreationDict if the first argument
		// to the create method is a dictionary object.

		Log.d(LCAT, "VIEWPROXY LIFECYCLE EVENT] handleCreationArgs ");
	
		for (int i = 0; i < args.length; i++) {
			Log.d(LCAT, "VIEWPROXY LIFECYCLE EVENT] args[" + i + "] " + args[i]);
		}

		super.handleCreationArgs(createdInModule, args);
	}
	
	// Proxy properties are forwarded to the view in the propertyChanged
	// notification. If the property update needs to occur on the UI thread
	// then create the setProperty method in the proxy and forward to the view.

	private static final int MSG_SET_COLOR = 70000;
	
	@Kroll.setProperty(retain=false)
	public void setColor(final String color) 
	{
		Log.d(LCAT,"[VIEWPROXY LIFECYCLE EVENT] Property Set: setColor");
		
		// Get the view object from the proxy and set the color
		if (view != null) {
			if (!TiApplication.isUIThread()) {
				TiMessenger.sendBlockingMainMessage(new Handler(TiMessenger.getMainMessenger().getLooper(), new Handler.Callback() {
					public boolean handleMessage(Message msg) {
						switch (msg.what) {
							case MSG_SET_COLOR: {
								AsyncResult result = (AsyncResult) msg.obj;
								DemoView demoView = (DemoView)view;
								demoView.setColor(color);
								result.setResult(null);
								return true;
							}
						}
						return false;
					}
				}).obtainMessage(MSG_SET_COLOR), color);
			} else {
				DemoView demoView = (DemoView)view;
				demoView.setColor(color);
			}
		}
		
		// Call setProperty if you want the property set on the proxy and
		// to signal the propertyChanged notification
		setProperty("color", color, true);
	}

}
