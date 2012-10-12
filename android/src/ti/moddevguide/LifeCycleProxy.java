/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.moddevguide;

import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.common.Log;

import android.app.Activity;

// The proxy is declared with the @Kroll.proxy annotation

@Kroll.proxy(creatableInModule = ModdevguideModule.class)
public class LifeCycleProxy extends KrollProxy 
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";
	
	// Unique Identifier variables
	private static int nextProxyId = 1;
	private int proxyId = 0;
	
	public LifeCycleProxy() 
	{
		super();
		
		// Generate a unique identifier so the user can see which proxy
		// instance is being created or destroyed (for demonstration purposes only).
		proxyId = nextProxyId++;
		
		// Each KrollProxy object has a unique proxy id
		Log.i(LCAT, "[PROXY LIFECYCLE EVENT] init with proxy id of " + proxyId);
	}
	
	// Handle creation options
	@Override
	public void handleCreationDict(KrollDict options) 
	{
		// This method is called from handleCreationArgs if there is at least one
		// argument specified for the proxy creation call and the first argument
		// is a KrollDict object.
		
		Log.d(LCAT, "PROXY LIFECYCLE EVENT] handleCreationDict " + options);

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

		Log.d(LCAT, "PROXY LIFECYCLE EVENT] handleCreationArgs ");
	
		for (int i = 0; i < args.length; i++) {
			Log.d(LCAT, "PROXY LIFECYCLE EVENT] args[" + i + "] " + args[i]);
		}

		// Calling the superclass method is required
		super.handleCreationArgs(createdInModule, args);
	}

	// Public APIs (available in javascript)
	
	// The methods are exposed to javascript because of the @Kroll.method annotation

	@Kroll.method
	public void close() 
	{
		Log.d(LCAT, "[PROXY LIFECYCLE EVENT] close called");
	}
	
}
