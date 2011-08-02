/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiModdevguideParametersDemoProxy.h"

#import "TiUtils.h"

@implementation TiModdevguideParametersDemoProxy

-(id)analyzeParameters:(id)args
{
	// This method analyzes the arguments that are passed to it and outputs the types and depth of the
	// parameters. This is a recursive method that steps into and out of the arguments in order to output
	// their types. A dot ('.') character is output as a prefix to indicate the depth of the argument
	// from its parent argument.
	// 
	// This analysis is useful to understand how arguments are passed from JavaScript into your native module.
	
	static int level = 0;
	
	NSString* prefix = [@"[PARAMETERSDEMO] " stringByPaddingToLength:level+17 withString:@"." startingAtIndex:0];
	
	level++;
	
	if ([args isKindOfClass:[NSArray class]]) {
		NSLog(@"%@Array with %d entries", prefix, [args count]);
		int index = 0;
		for (id obj in (NSArray*)args) {
			NSLog(@"%@Index[%d]", prefix, index++);
			[self analyzeParameters:obj];
		}
	} else if ([args isKindOfClass:[NSDictionary class]]) {
		NSLog(@"%@Dictionary with %d entries", prefix, [args count]);
		for (id key in args) {
			NSLog(@"%@Key[%@]", prefix, key);
			[self analyzeParameters:[args objectForKey:key]]; 
		}
	} else if ([args isKindOfClass:[NSString class]]) {
		NSLog(@"%@String = %@", prefix, args);
	} else if ([args isKindOfClass:[NSNumber class]]) {
		NSLog(@"%@Number = %@", prefix, [args stringValue]);
	} else if ([args isKindOfClass:[NSNull class]]) {
		NSLog(@"%@NULL", prefix);
	} else if ([args isKindOfClass:[NSDate class]]) {
		NSLog(@"%@Date = %@", prefix, args);
	} else if ([args isKindOfClass:[KrollCallback class]]) {
		NSLog(@"%@Callback = %@", prefix, args);
	} else {
		NSLog(@"%@Unknown class %@", prefix, [args class]);
	}
	
	level--;
	
	return nil;
}

@end
