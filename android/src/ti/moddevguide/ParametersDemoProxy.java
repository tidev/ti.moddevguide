/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.moddevguide;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollFunction;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiContext;
import org.appcelerator.kroll.common.Log;
import org.mozilla.javascript.Function;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.TimeZone;

// The proxy is declared with the @Kroll.proxy annotation

@Kroll.proxy(creatableInModule = ModdevguideModule.class)
public class ParametersDemoProxy extends LifeCycleProxy 
{
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";
	
	public ParametersDemoProxy() {
		super();
	}
	
	private void analyzeArgument(String prefix, Object arg)
	{
		if (arg == null) {
			Log.d(LCAT,prefix + "NULL");
		} else if (arg.getClass().isArray()) {
			Object objArray[] = (Object[])arg;
			Log.d(LCAT,prefix + "Array with " + objArray.length + " entries");
			int index = 0;
			for (Object obj : objArray) {
				Log.d(LCAT,prefix + "Index[" + index++ + "]");
				analyzeArgument(prefix + ".", obj);
			}
		} else if (arg instanceof HashMap) {
			HashMap kd = (HashMap)arg;
			Log.d(LCAT,prefix + "Dictionary with " + kd.size() + " entries");
			for (Object key : kd.keySet().toArray()) {
				Log.d(LCAT,prefix + "Key[" + key.toString() + "]");
				analyzeArgument(prefix + ".", kd.get(key));
			}
		} else if (arg instanceof String) {
			Log.d(LCAT,prefix + "String = " + (String)arg);
		} else if (arg instanceof Number) {
			Log.d(LCAT,prefix + "Number = " + (Number)arg);
		} else if (arg instanceof Date) {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			df.setTimeZone(TimeZone.getTimeZone("GMT"));
			Log.d(LCAT,prefix + "Date = " + df.format((Date)arg));
		} else if (arg instanceof KrollFunction) {
			Log.d(LCAT,prefix + "Callback");
		} else if (arg instanceof Function) {
			Log.d(LCAT,prefix + "Function");
		} else if (arg instanceof Boolean) {
			Log.d(LCAT,prefix + "Boolean = " + (Boolean)arg);
		} else {
			Log.d(LCAT,prefix + "Unknown class " + arg.getClass().getSimpleName());
		}
	}
	
	// Public APIs (available in javascript)
	
	// The methods are exposed to javascript because of the @Kroll.method annotation

	@Kroll.method
	public void analyzeParameters(Object[] args)
	{
		// This method analyzes the arguments that are passed to it and outputs the types and depth of the
		// parameters. This is a recursive method that steps into and out of the arguments in order to output
		// their types. A dot ('.') character is output as a prefix to indicate the depth of the argument
		// from its parent argument.
		// 
		// This analysis is useful to understand how arguments are passed from JavaScript into your native module.
		
		String prefix = "[PARAMETERSDEMO] ";
		
		Log.d(LCAT,prefix + "analyzeParameters called with " + args.length + " arguments");
		
		for (Object arg : args) {
			analyzeArgument(prefix, arg);
		}
	}
}