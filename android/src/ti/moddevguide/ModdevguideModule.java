/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.moddevguide;

import java.io.IOException;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiBlob;
import org.appcelerator.titanium.io.TiBaseFile;
import org.appcelerator.titanium.io.TiFileFactory;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.titanium.util.TiRHelper;
import org.appcelerator.titanium.util.TiRHelper.ResourceNotFoundException;
import org.appcelerator.titanium.util.TiUIHelper;
import android.app.Activity;
import android.graphics.Bitmap;

// The module is declared with the @Kroll.module annotation

@Kroll.module(name="Moddevguide", id="ti.moddevguide")
public class ModdevguideModule extends KrollModule
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";

	// Constants can be made available to the JavaScript using the following notations
	@Kroll.constant public static final int DEMO_INTEGER = 50;
	@Kroll.constant public static final String DEMO_STRING = "Hello World";
	
	// [TIMOB-6819] WARNING: ON V8, Boolean constants don't appear to be working yet!
	@Kroll.constant public static final Boolean DEMO_BOOLEAN = true;
	
	// Module initialization
	
	// Use the '@Kroll.onAppCreate' annotation to declare a method to be called
	// when the application object is created. This is optional and is only 
	// required if you have any application specific initialization.
	//
	// NOTE: This feature is available in Titanium SDK version 1.7.3 and newer
	
	@Kroll.onAppCreate
	public static void onAppCreate(TiApplication app) 
	{
		// This method is called during application startup. It is only called once and
		// is called before your module is actually loaded. Use this method to perform
		// process specific initialization -- for example, starting a service that is 
		// required by the module.
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] onAppCreate notification");
	}
	
	public ModdevguideModule() 
	{
		super();
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] constructor");
		
		// Lifecycle event registration is automatically done in the KrollModule constructor,
		// so there is no need to register to receive the lifecycle events.
	}
	
	// Lifecycle
	
	// NOTES:
	//
	// 1. Modules are created in the root context
	// 2. Using navBarHidden (or fullscreen or modal) causes the window, when opened, to run in a new Android Activity. 
	// 3. The root context/activity will be stopped when a new activity is launched
	// 4. Lifecycle notifications will NOT be received while the root activity is stopped.

	@Override
	public void onStart(Activity activity) 
	{
		// This method is called when the module is loaded and the root context is started
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] start");
		
		super.onStart(activity);
	}
	
	@Override
	public void onStop(Activity activity) 
	{
		// This method is called when the root context is stopped 
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] stop");
		
		super.onStop(activity);
	}
	
	@Override
	public void onPause(Activity activity) 
	{
		// This method is called when the root context is being suspended
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] pause");
		
		super.onPause(activity);
	}
	
	@Override
	public void onResume(Activity activity) 
	{		
		// This method is called when the root context is being resumed
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] resume");	
		
		super.onResume(activity);
	}
	
	@Override
	public void onDestroy(Activity activity) 
	{
		// This method is called when the root context is being destroyed
		
		Log.d(LCAT, "[MODULE LIFECYCLE EVENT] destroy");
		
		super.onDestroy(activity);
	}
	
	// Assets Demo Methods
	
	private int getIdOfModuleAsset(String assetName, String typeWithDot)
	{
		// Use this to locate resources in the R.java file (e.g. platform/android/res/drawable)
		// In case the caller passes in the asset name with the extension, strip it off
		// Prefix the asset name with type
		
		int dot = assetName.lastIndexOf(".");
		String resourceName = typeWithDot + ((dot > 0) ? assetName.substring(0, dot) : assetName);
	
		int result = 0;
		try {
			result = TiRHelper.getApplicationResource(resourceName);
		} catch (ResourceNotFoundException e) {
			Log.d(LCAT, "[ASSETSDEMO] EXCEPTION -- RESOURCE NOT FOUND");
		}

		return result;
	}
	
	private String getPathToApplicationAsset(String assetName)
	{
		// The url for an application asset can be created by resolving the specified
		// path with the proxy context. This locates a resource relative to the 
		// application resources folder
		
		String result = resolveUrl(null, assetName);
		
		return result;
	}
	
	// Public APIs (available in javascript)
	
	// The methods are exposed to javascript because of the @Kroll.method annotation

	@Kroll.method
	public TiBlob loadImageFromModule(String imageName)
	{
		Log.d(LCAT, "[ASSETSDEMO] loadImageFromModule " + imageName);
		
		TiBlob result = null;
		
		int bitmapID = getIdOfModuleAsset(imageName, "drawable.");
		Bitmap bitmap = TiUIHelper.getResourceBitmap(bitmapID);
		
		// The bitmap must be converted to a TiBlob before returning
		result = TiBlob.blobFromImage(bitmap);
		
		Log.d(LCAT, "[ASSETSDEMO] " + result);

		return result;
	}
	
	@Kroll.method
	public TiBlob loadImageFromApplication(String imageName)
	{
		Log.d(LCAT, "[ASSETSDEMO] loadImageFromApplication " + imageName);
		
		TiBlob result = null;
		try {
			// Load the image from the application assets
			String url = getPathToApplicationAsset(imageName);
			TiBaseFile file = TiFileFactory.createTitaniumFile(new String[] { url }, false);
			Bitmap bitmap = TiUIHelper.createBitmap(file.getInputStream());
			
			// The bitmap must be converted to a TiBlob before returning
			result = TiBlob.blobFromImage(bitmap);
		} catch (IOException e) {
			Log.e(LCAT,"[ASSETSDEMO] EXCEPTION - IO");
		}
		
		Log.d(LCAT,"[ASSETSDEMO] " + result);
		
		return result;
	}
}
