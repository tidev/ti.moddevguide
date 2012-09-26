/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiModdevguideMethodsDemoProxy.h"
#import "TiUtils.h"
#import "tiRect.h"
#import "tiPoint.h"
#import "tiBlob.h"

@implementation TiModdevguideMethodsDemoProxy

// These methods are exposed to javascript because of their method signatures

-(void)demoMethodNoReturn:(id)args
{
	// This method is an example of exposing a native method to JavaScript. Eventhough
	// the method signature has an 'args' parameter it is not required to pass
	// arguments from JavaScript to the method.
	
	NSLog(@"[METHODSDEMO] demoMethodNoReturn");
}

-(NSNumber*) demoMethodNumberInt:(id)args
{
	// This method is an example of exposing a native method that accepts 2
	// integer values as arguments and returns a number.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgOriginal = 0,
		kArgMultiplier,
		kArgCount
	};
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);
	
	NSLog(@"[METHODSDEMO] demoMethodNumberInt received %d arguments", kArgCount);
	
	// Use the TiUtils methods to get the values from the arguments
	NSInteger original = [TiUtils intValue:[args objectAtIndex:kArgOriginal] def:0];
	NSInteger multiplier = [TiUtils intValue:[args objectAtIndex:kArgMultiplier] def:0];
	
	NSInteger result = original * multiplier;
	
	NSLog(@"[METHODSDEMO] %d = %d * %d", result, original, multiplier);

	return NUMINT(result);
}

-(NSNumber*) demoMethodNumberFloat:(id)args
{
	// This method is an example of exposing a native method that accepts 2
	// floating point values as arguments and returns a number. 
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgOriginal = 0,
		kArgMultiplier,
		kArgCount
	};
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);
	
	NSLog(@"[METHODSDEMO] demoMethodNumberInt received %d arguments", kArgCount);
	
	// Use the TiUtils methods to get the values from the arguments
	float original = [TiUtils floatValue:[args objectAtIndex:kArgOriginal] def:0.0];
	float multiplier = [TiUtils floatValue:[args objectAtIndex:kArgMultiplier] def:0.0];
	
	float result = original * multiplier;
	
	NSLog(@"[METHODSDEMO] %f = %f * %f", result, original, multiplier);
	
	return NUMFLOAT(result);
}

-(NSString*) demoMethodString:(id)args
{
	// This method is an example of exposing a native method that accepts 3
	// arguments (2 string values and 1 integer value) and returns a string.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgFirstName = 0,
		kArgLastName,
		kArgAge,
		kArgCount
	};
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);
	
	NSLog(@"[METHODSDEMO] demoMethodString received %d arguments", kArgCount);
	
	// Use the TiUtils methods to get the values from the arguments
	NSString *firstName = [TiUtils stringValue:[args objectAtIndex:kArgFirstName]];
	NSString *lastName = [TiUtils stringValue:[args objectAtIndex:kArgLastName]];
	NSInteger age = [TiUtils intValue:[args objectAtIndex:kArgAge]];
					 
	NSString *result = [NSString stringWithFormat:@"User %@ %@ is %d years old", firstName, lastName, age];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(NSDictionary*) demoMethodDictionary:(id)args
{
	// This method is an example of exposing a native method that accepts an
	// array of values and returns a dictionary of those values.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	// The ENSURE_SINGLE_ARG macro will confirm that only 1 argument was passed
	// to the method and that it is of the specified type, and as a side-effect
	// will reassign 'args' to be the value of the first object in the argument array.
	ENSURE_SINGLE_ARG(args,NSArray);
	
	NSLog(@"[METHODSDEMO] demoMethodDictionary received 1 argument of type NSArray");
	
	NSMutableDictionary *result = [NSMutableDictionary dictionaryWithCapacity:[args count]];
	
	NSInteger index = 0;
	for (id arg in args) {
		[result setValue:arg forKey:[NSString stringWithFormat:@"Index%d", index++]];
	}
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(NSDate*) demoMethodDate:(id)args
{
	// This method is an example of exposing a native method that accepts a dictionary
	// argument and returns an NSDate object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	// The ENSURE_SINGLE_ARG macro will confirm that only 1 argument was passed
	// to the method and that it is of the specified type, and as a side-effect
	// will reassign 'args' to be the value of the first object in the argument array.
	ENSURE_SINGLE_ARG(args,NSDictionary);
	
	NSLog(@"[METHODSDEMO] demoMethodDate received 1 argument of type NSDictionary");
	
	// Use the TiUtils methods to get the values from the arguments
	NSInteger month = [TiUtils intValue:@"month" properties:args def:1];
	NSInteger day = [TiUtils intValue:@"day" properties:args def:1];
	NSInteger year = [TiUtils intValue:@"year" properties:args def:2000];
	
	NSDateComponents *comps = [[NSDateComponents alloc] init];
	[comps setMonth:month];
	[comps setDay:day];
	[comps setYear:year];
	NSCalendar *gregorian = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
	NSDate *result = [gregorian dateFromComponents:comps];
	[comps release];
	[gregorian release];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}


-(NSArray*) demoMethodArray:(id)args
{
	// This method is an example of exposing a native method that accepts a
	// dynamic list of arguments and returns an NSArray object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	// The ENSURE_TYPE_OR_NILL macro will confirm that if an argument is passed
	// it is of the specified type, but it also allows for no arguments to be passed.
	ENSURE_TYPE_OR_NIL(args,NSArray);
	
	NSLog(@"[METHODSDEMO] demoMethodArray received %d arguments", [args count]);
	
	// Create a new array from the argument array
	NSArray *result = [NSArray arrayWithArray:args];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(NSNull*) demoMethodNull:(id)args
{
	// This method is an example of exposing a native method that returns an
	// NSNull object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	NSLog(@"[METHODSDEMO] demoMethodNull called");
	
	NSNull *result = [NSNull null];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(TiFile*) demoMethodFile:(id)args
{
	// This method is an example of exposing a native method that accepts a
	// single string argument and returns a TiFile object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	// The ENSURE_SINGLE_ARG macro will confirm that only 1 argument was passed
	// to the method and that it is of the specified type, and as a side-effect
	// will reassign 'args' to be the value of the first object in the argument array.
	ENSURE_SINGLE_ARG(args,NSString);

	NSLog(@"[METHODSDEMO] demoMethodFile received 1 argument of type NSString");
	
	NSString *path = args;
	
	// NOTE: File paths may contain URL prefix as of release 1.7 of the SDK
	if ([path hasPrefix:@"file:/"]) {
		NSURL* url = [NSURL URLWithString:path];
		path = [url path];
	}
	
	TiFile *result = [[[TiFile alloc] initWithPath:path] autorelease];
	
	NSLog(@"[METHODSDEMO] Path: %@  Size: %d", result.path, result.size);
	
	return result;
}

-(TiBlob*) demoMethodBlob:(id)args
{
	// This method is an example of exposing a native method that returns a TiBlob
	// object containing a predefined blob of text.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	NSLog(@"METHODSDEMO] demoMethodBlob called");
	
	const char *utfString = [@"Hello World" UTF8String];
	
	NSData *data = [NSData dataWithBytes:utfString length:strlen(utfString)];
	
	TiBlob *result = [[[TiBlob alloc] initWithData:data mimetype:@"application/octet-stream"] autorelease];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(TiRect*) demoMethodRect:(id)args
{
	// This method is an example of exposing a native method that accepts 4
	// integer values as arguments and returns a TiRect object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgX = 0,
		kArgY,
		kArgWidth,
		kArgHeight,
		kArgCount
	};
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);
	
	NSLog(@"[METHODSDEMO] demoMethodRect received %d arguments", kArgCount);
	
	// Use the TiUtils methods to get the values from the arguments
	CGRect rect;
	rect.origin.x = [TiUtils intValue:[args objectAtIndex:kArgX]];
	rect.origin.y = [TiUtils intValue:[args objectAtIndex:kArgY]];
	rect.size.width = [TiUtils intValue:[args objectAtIndex:kArgWidth]];
	rect.size.height = [TiUtils intValue:[args objectAtIndex:kArgHeight]];
	
	TiRect *result = [[[TiRect alloc] init] autorelease];
	[result setRect:rect];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(TiPoint*) demoMethodPoint:(id)args
{
	// This method is an example of exposing a native method that accepts 2
	// integer values as arguments and returns a TiPoint object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgX = 0,
		kArgY,
		kArgCount
	};
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);
	
	NSLog(@"[METHODSDEMO] demoMethodPoint received %d arguments", kArgCount);
	
	// Use the TiUtils methods to get the values from the arguments
	CGPoint point;
	point.x = [TiUtils intValue:[args objectAtIndex:kArgX]];
	point.y = [TiUtils intValue:[args objectAtIndex:kArgY]];
	
	TiPoint *result = [[[TiPoint alloc] initWithPoint:point] autorelease];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}


-(NSDictionary*) demoMethodRange:(id)args
{
	// This method is an example of exposing a native method that accepts 2
	// integer values as arguments and returns a TiRange like object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgLocation = 0,
		kArgLength,
		kArgCount
	};
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);
	
	NSLog(@"[METHODSDEMO] demoMethodRange received %d arguments", kArgCount);
	
	// Use the TiUtils methods to get the values from the arguments
	NSRange range;
	range.location = [TiUtils intValue:[args objectAtIndex:kArgLocation]];
	range.length = [TiUtils intValue:[args objectAtIndex:kArgLength]];
	
	// TiRange has been removed from the sdk as of version 2.1.0
	// Instead of using TiRange, this method just returns a TiRange like dictionary.
	NSDictionary* result = [NSDictionary dictionaryWithObjectsAndKeys:NUMINT(range.location),@"location", 								 
		NUMINT(range.length),@"length", nil];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(TiColor*) demoMethodColor:(id)args
{
	// This method is an example of exposing a native method that accepts a
	// string containing a color value and returns a TiColor object.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	ENSURE_SINGLE_ARG(args,NSString);
	
	NSLog(@"[METHODSDEMO] demoMethodColor received 1 argument of type NSString");

	// Use the TiUtils methods to get the values from the arguments
	TiColor *result = [TiUtils colorValue:args];
	
	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

-(NSString*) demoMethodOptionalArgs:(id)args
{
	// This method is an example of exposing a native method that accepts 1 or 2
	// arguments (2 string values) and returns a string.
	// Arguments from JavaScript are passed to the native methods as an NSArray
	
	enum Args {
		kArgGreeting = 0,
        kArgCount,
        kArgName = kArgCount        // Optional
	};
	
	// The ENSURE_TYPE macro will confirm that if an argument is passed
	// it is of the specified type
    ENSURE_TYPE(args,NSArray);
	
	// Validate correct number of arguments
	ENSURE_ARG_COUNT(args, kArgCount);

	NSLog(@"[METHODSDEMO] demoMethodOptionalArgs received %d arguments", [args count]);
	
	// Use the TiUtils methods to get the values from the arguments
	NSString *greeting = [TiUtils stringValue:[args objectAtIndex:kArgGreeting]];
    NSString *name = ([args count] > kArgName) ? [TiUtils stringValue:[args objectAtIndex:kArgName]] : nil;
      
    NSString *result;
    if (name == nil) {
        result = [NSString stringWithFormat:@"%@!!", greeting];
    } else {
        result = [NSString stringWithFormat:@"%@, %@!", greeting, name];
    }

	NSLog(@"[METHODSDEMO] %@", result);
	
	return result;
}

@end
