/**
  * Appcelerator Titanium Mobile
  * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
  * Licensed under the terms of the Apache Public License
  * Please see the LICENSE included with this distribution for details.
  *
  */

package ti.moddevguide;

import java.util.HashMap;

import org.appcelerator.titanium.view.TiCompositeLayout;
import org.appcelerator.titanium.view.TiUIView;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.titanium.proxy.TiViewProxy;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;
import android.view.View;

public class DemoView extends TiUIView 
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";
	
	private static final String PROPERTY_COLOR = "color";

	public DemoView(TiViewProxy proxy) 
	{
		super(proxy);
		
		Log.d(LCAT, "[VIEW LIFECYCLE EVENT] view");
		
		// Create the view as a TiCompositeLayout since our demo
		// will be adding children to the view.
		TiCompositeLayout view = new TiCompositeLayout(proxy.getActivity());
		
		// Set the view as the native view. You must set the native view
		// for your view to be rendered correctly.
		setNativeView(view);
	}
		
	// The view is automatically registered as a model listener when the view
	// is realized by the view proxy. That means that the processProperties
	// method will be called during creation and that propertiesChanged and 
	// propertyChanged will be called when properties are changed on the proxy.

	@Override
	public void processProperties(KrollDict props) 
	{
		super.processProperties(props);
		
		Log.d(LCAT,"[VIEW LIFECYCLE EVENT] processProperties " + props);

		// Check if the color is specified when the view was created
		if (props.containsKey(PROPERTY_COLOR)) {
			View square = (View)getNativeView();
			square.setBackgroundColor(TiConvert.toColor(props, PROPERTY_COLOR));			
			notifyOfColorChange(props.getString(PROPERTY_COLOR));
			square.invalidate();
		}
	}
	
	@Override
	public void propertyChanged(String key, Object oldValue, Object newValue, KrollProxy proxy)
	{
		// This method is called whenever a proxy property value is updated. Note that this 
		// method is only called if the new value is different than the current value.

		super.propertyChanged(key, oldValue, newValue, proxy);
		
		Log.d(LCAT,"[VIEW LIFECYCLE EVENT] propertyChanged: " + key + ' ' + oldValue + ' ' + newValue);
	}
	
	// Local helper method to fire the colorChange event
	private void notifyOfColorChange(String newColor)
	{
		// The event listeners for a view are actually attached to the view proxy.
		// You must reference 'proxy' to get the proxy for this view.
		
		Log.d(LCAT,"[VIEW LIFECYCLE EVENT] notifyOfColorChange");
		
		// It is a good idea to check if there are listeners for the event that
		// is about to be fired. There could be zero or multiple listeners for the
		// specified event.
		if (proxy.hasListeners("colorChange")) {
			HashMap<String, String> hm = new HashMap<String, String>();
			hm.put("color", newColor);
			proxy.fireEvent("colorChange", hm);
		}
	}
	
	// Setter method called by the proxy when the 'color' property is
	// set. This could also be handled in the propertyChanged handler.
	public void setColor(String color) 
	{
		Log.d(LCAT,"[VIEW LIFECYCLE EVENT] Property Set: setColor");
		
		// Use the TiConvert method to get the values from the arguments
		int newColor = TiConvert.toColor(color);
		View square = (View)getNativeView();
		square.setBackgroundColor(newColor);
		
		notifyOfColorChange(color);
	}
}
