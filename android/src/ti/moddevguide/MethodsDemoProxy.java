/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */

package ti.moddevguide;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.titanium.TiBlob;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConvert;

import ti.modules.titanium.filesystem.FileProxy;

import android.graphics.PointF;
import android.graphics.RectF;

// The proxy is declared with the @Kroll.proxy annotation

@Kroll.proxy(creatableInModule = ModdevguideModule.class)
public class MethodsDemoProxy extends LifeCycleProxy {
	// Standard Debugging variables
	private static final String LCAT = "ModdevguideModule";

	public MethodsDemoProxy() {
		super();
	}

	// Public APIs (available in javascript)

	// The methods are exposed to javascript because of the @Kroll.method annotation.
	// Method signatures can be specified with the following properties:
	//
	// 1. The arguments can be declared as an Object[]. Specify this in the method
	// signature to handle a variable number of arguments or to support manual
	// type conversion of arguments.
	// public void myMethod(Object[] args);
	// 2. The arguments can be declared with explicit types. Specify this in the
	// method signature to have Kroll attempt to call with an exact match of
	// the parameter types.
	// public void myMethod(int firstArg, HashMap secondArg);

	@Kroll.method
	public void demoMethodNoReturn() {
		// This method is an example of exposing a native method to JavaScript.
		// The method signature does not declare any parameters.

		Log.d(LCAT, "[METHODSDEMO] demoMethodNoReturn");
	}

	@Kroll.method
	public int demoMethodNumberInt(Object[] args) {
		// This method is an example of exposing a native method that accepts 2
		// integer values as arguments and returns a number.
		// The method signature declares an array of objects, so it is necessary
		// to validate the number of arguments passed to the method.

		final int kArgOriginal = 0;
		final int kArgMultiplier = 1;
		final int kArgCount = 2;

		// Validate correct number of arguments
		if (args.length < kArgCount) {
			throw new IllegalArgumentException("At least 2 arguments required for method: original, multiplier");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodNumberInt received " + args.length + " arguments");

		// Use the TiConvert methods to get the values from the arguments
		int original = (args[kArgOriginal] != null) ? TiConvert.toInt(args[kArgOriginal]) : 0;
		int multiplier = (args[kArgMultiplier] != null) ? TiConvert.toInt(args[kArgMultiplier]) : 0;

		int result = original * multiplier;

		Log.d(LCAT, "[METHODSDEMO] " + result + " = " + original + " * " + multiplier);

		return result;
	}

	@Kroll.method
	public float demoMethodNumberFloat(Object[] args) {
		// This method is an example of exposing a native method that accepts 2
		// floating point values as arguments and returns a number.
		// The method signature declares an array of objects, so it is necessary
		// to validate the number of arguments passed to the method.

		final int kArgOriginal = 0;
		final int kArgMultiplier = 1;
		final int kArgCount = 2;

		// Validate correct number of arguments
		if (args.length < kArgCount) {
			throw new IllegalArgumentException("At least 2 arguments required for method: original, multiplier");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodNumberFloat received " + args.length + " arguments");

		// Use the TiConvert methods to get the values from the arguments
		float original = (args[kArgOriginal] != null) ? TiConvert.toFloat(args[kArgOriginal]) : 0;
		float multiplier = (args[kArgMultiplier] != null) ? TiConvert.toFloat(args[kArgMultiplier]) : 0;

		float result = original * multiplier;

		Log.d(LCAT, "[METHODSDEMO] " + result + " = " + original + " * " + multiplier);

		return result;
	}

	@Kroll.method
	public String demoMethodString(Object[] args) {
		// This method is an example of exposing a native method that accepts 3
		// arguments (2 string values and 1 integer value) and returns a string.
		// The method signature declares an array of objects, so it is necessary
		// to validate the number of arguments passed to the method.

		final int kArgFirstName = 0;
		final int kArgLastName = 1;
		final int kArgAge = 2;
		final int kArgCount = 3;

		// Validate correct number of arguments
		if (args.length < kArgCount) {
			throw new IllegalArgumentException("At least 3 arguments required for method: firstname, lastname, age");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodString received " + args.length + " arguments");

		// Use the TiConvert methods to get the values from the arguments
		String firstName = TiConvert.toString(args[kArgFirstName]);
		String lastName = TiConvert.toString(args[kArgLastName]);
		int age = (args[kArgAge] != null) ? TiConvert.toInt(args[kArgAge]) : 0;

		String result = "User " + firstName + " " + lastName + " is " + age + " years old";

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public HashMap demoMethodDictionary(Object args) {
		// This method is an example of exposing a native method that accepts an
		// array of values and returns a dictionary of those values.
		// Since the method only accepts one argument and the argument is an
		// array, it has been declared as an Object (rather than an Object[]). If
		// the argument is declared as an Object[] then the single argument (an array)
		// would be received as the Object[] argument. This declaration allows for
		// local validation of the array argument.

		// Validate type of argument
		if (!(args.getClass().isArray())) {
			throw new IllegalArgumentException("Argument must be an array");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodDictionary received 1 argument of type array");

		Object[] argArray = (Object[]) args;
		HashMap<String, Object> result = new HashMap<String, Object>(argArray.length);

		for (int index = 0; index < argArray.length; index++) {
			result.put("Index" + index, argArray[index]);
		}

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public Date demoMethodDate(HashMap args) {
		// This method is an example of exposing a native method that accepts a dictionary
		// argument and returns an Date object.

		Log.d(LCAT, "[METHODSDEMO] demoMethodDate received 1 argument of type HashMap");

		// Use the optInt methods to get the values from the dictionary
		KrollDict dict = new KrollDict(args);
		int month = dict.optInt("month", 1);
		int day = dict.optInt("day", 1);
		int year = dict.optInt("year", 2000);

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		// Note: Month is zero-based
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DAY_OF_MONTH, day);

		Date result = calendar.getTime();

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public Object[] demoMethodArray(Object[] args) {
		// This method is an example of exposing a native method that accepts a
		// dynamic list of arguments and returns an NSArray object.

		Log.d(LCAT, "[METHODSDEMO] demoMethodArray received " + args.length + " arguments");

		// Create a new array from the argument array
		Object[] result = new Object[args.length];
		System.arraycopy(args, 0, result, 0, args.length);

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public Object demoMethodNull() {
		// This method is an example of exposing a native method that returns an
		// NSNull object.

		Log.d(LCAT, "[METHODSDEMO] demoMethodNull called");

		Object result = null;

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public FileProxy demoMethodFile(String arg) {
		// This method is an example of exposing a native method that accepts a
		// single string argument and returns a TiFile object.

		Log.d(LCAT, "[METHODSDEMO] demoMethodFile received 1 argument of type String");

		FileProxy result = new FileProxy(getTiContext(), new String[] { arg });

		Log.d(LCAT, "[METHODSDEMO] Path: " + result.getNativePath() + " Size: " + result.getSize());

		return result;
	}

	@Kroll.method
	public TiBlob demoMethodBlob() {
		// This method is an example of exposing a native method that returns a TiBlob
		// object containing a predefined blob of text.

		Log.d(LCAT, "[METHODSDEMO] demoMethodBlob called");

		TiBlob result = TiBlob.blobFromString("Hello World");

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public HashMap demoMethodRect(Object[] args) {
		// This method is an example of exposing a native method that accepts 4
		// integer values as arguments and returns an equivalent TiRect object.
		// The method signature declares an array of objects, so it is necessary
		// to validate the number of arguments passed to the method.

		final int kArgX = 0;
		final int kArgY = 1;
		final int kArgWidth = 2;
		final int kArgHeight = 3;
		final int kArgCount = 4;

		// Validate correct number of arguments
		if (args.length < kArgCount) {
			throw new IllegalArgumentException("At least 4 arguments required for method: x, y, width, height");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodRect received " + args.length + " arguments");

		// Use the TiConvert methods to get the values from the arguments
		RectF rect = new RectF();
		rect.left = (args[kArgX] != null) ? TiConvert.toFloat(args[kArgX]) : 0;
		rect.top = (args[kArgY] != null) ? TiConvert.toFloat(args[kArgY]) : 0;
		rect.right = rect.left + ((args[kArgWidth] != null) ? TiConvert.toFloat(args[kArgWidth]) : 0);
		rect.bottom = rect.top + ((args[kArgHeight] != null) ? TiConvert.toFloat(args[kArgHeight]) : 0);

		HashMap<String, Float> result = new HashMap<String, Float>();
		result.put("x", rect.left);
		result.put("y", rect.top);
		result.put("width", rect.width());
		result.put("height", rect.height());

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public HashMap demoMethodPoint(Object[] args) {
		// This method is an example of exposing a native method that accepts 2
		// integer values as arguments and returns an equivalent TiPoint object.
		// The method signature declares an array of objects, so it is necessary
		// to validate the number of arguments passed to the method.

		final int kArgX = 0;
		final int kArgY = 1;
		final int kArgCount = 2;

		// Validate correct number of arguments
		if (args.length < kArgCount) {
			throw new IllegalArgumentException("At least 2 arguments required for method: x, y");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodPoint received " + args.length + " arguments");

		// Use the TiConvert methods to get the values from the arguments
		PointF point = new PointF();
		point.x = (args[kArgX] != null) ? TiConvert.toFloat(args[kArgX]) : 0;
		point.y = (args[kArgY] != null) ? TiConvert.toFloat(args[kArgY]) : 0;

		HashMap<String, Float> result = new HashMap<String, Float>();
		result.put("x", point.x);
		result.put("y", point.y);

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public HashMap demoMethodRange(Object[] args) {
		// This method is an example of exposing a native method that accepts 2
		// integer values as arguments and returns an equivalent TiRange object.
		// The method signature declares an array of objects, so it is necessary
		// to validate the number of arguments passed to the method.

		final int kArgLocation = 0;
		final int kArgLength = 1;
		final int kArgCount = 2;

		// Validate correct number of arguments
		if (args.length < kArgCount) {
			throw new IllegalArgumentException("At least 2 arguments required for method: location, length");
		}

		Log.d(LCAT, "[METHODSDEMO] demoMethodRange received " + args.length + " arguments");

		// Use the TiConvert methods to get the values from the arguments
		int location = (args[kArgLocation] != null) ? TiConvert.toInt(args[kArgLocation]) : 0;
		int length = (args[kArgLength] != null) ? TiConvert.toInt(args[kArgLength]) : 0;

		HashMap<String, Integer> result = new HashMap<String, Integer>();
		result.put("location", location);
		result.put("length", length);

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

	@Kroll.method
	public int demoMethodColor(String color) {
		// This method is an example of exposing a native method that accepts a
		// string containing a color value and returns an equivalent TiColor value.

		Log.d(LCAT, "[METHODSDEMO] demoMethodColor received 1 argument of type String");

		// Use the TiConvert methods to get the values from the arguments
		int result = TiConvert.toColor(color);

		Log.d(LCAT, "[METHODSDEMO] " + Integer.toHexString(result));

		return result;
	}

	@Kroll.method
	public String demoMethodOptionalArgs(String greeting, @Kroll.argument(optional = true) Object name) {
		// This method is an example of exposing a native method that accepts 1 or 2
		// arguments (2 string values) and returns a string.
		// The 'Kroll.argument(optional=true)' annotation declares that the argument is optional
		// yet allows Kroll to match to this method when either 1 or 2 arguments is specified
		// in the JavaScript method call.

		Log.d(LCAT, "[METHODSDEMO] demoMethodOptionalArgs received " + ((name == null) ? "1" : "2") + " arguments");

		String result = null;
		if (name == null) {
			result = greeting + "!!";
		} else if (name instanceof String) {
			result = greeting + ", " + (String) name + "!";
		}

		Log.d(LCAT, "[METHODSDEMO] " + result);

		return result;
	}

}