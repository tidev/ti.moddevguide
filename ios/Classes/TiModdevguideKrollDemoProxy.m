/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiModdevguideKrollDemoProxy.h"
#import "TiUtils.h"
#import <libkern/OSAtomic.h>

@implementation TiModdevguideKrollDemoProxy

-(void)_destroy
{	
	// Make sure to release the callback objects
	RELEASE_TO_NIL(successCallback);
	RELEASE_TO_NIL(cancelCallback);
	RELEASE_TO_NIL(requestDataCallback);
	
	[super _destroy];
}

#pragma Helper Methods

-(void)sendSuccessEvent:(id)message withTitle:(NSString*)title
{
	if (successCallback != nil){	
		NSMutableDictionary *event = [NSMutableDictionary dictionary];
		[event setObject:message forKey:@"message"];
		[event setObject:title forKey:@"title"];
		
		// Fire an event directly to the specified listener (callback)
		[self _fireEventToListener:@"success" withObject:event listener:successCallback thisObject:nil];
	}
}

-(void)sendCancelEvent:(id)message withTitle:(NSString*)title
{
	if (cancelCallback != nil){
		NSMutableDictionary *event = [NSMutableDictionary dictionary];
		[event setObject:message forKey:@"message"];
		[event setObject:title forKey:@"title"];
		
		// Fire an event directly to the specified listener (callback)
		[self _fireEventToListener:@"cancel" withObject:event listener:cancelCallback thisObject:nil];
	}
}

#pragma Public APIs (available in javascript)

// These methods are exposed to javascript because of their method signatures

-(void)registerCallbacks:(id)args
{
	ENSURE_SINGLE_ARG(args,NSDictionary);
	
	NSLog(@"[KROLLDEMO] registerCallbacks called");
	
	// Save the callback functions and retain them
	successCallback = [[args objectForKey:@"success"] retain];
	cancelCallback = [[args objectForKey:@"cancel"] retain];
	requestDataCallback = [[args objectForKey:@"requestData"] retain];
	
	NSLog(@"[KROLLDEMO] Callbacks registered");
}

-(void)requestDataWithCallback:(id)args
{
	NSLog(@"[KROLLDEMO] requestDataWithCallback called");
	
	// The 'call' method of the KrollCallback object can be used to directly 
	// call the associated JavaScript function and get a return value.
	id result = [requestDataCallback call:args thisObject:nil];
	
	NSLog(@"[KROLLDEMO] requestData callback returned %@", result);
}

-(void)signalCallbackWithSuccess:(id)args
{
	ENSURE_UI_THREAD(signalCallbackWithSuccess,args);

	NSLog(@"[KROLLDEMO] signalCallbackWithSuccess called");
	
	// Caller can pass in a value indicating if this is a success call or
	// a cancel call. Default is 'NO'.
	BOOL success = [TiUtils boolValue:[args objectAtIndex:0] def:NO];
	
	// Get the title from the properties of the module proxy object
	NSString *title = [self valueForUndefinedKey:@"title"];
	
	if (success){
		[self sendSuccessEvent:@"Success" withTitle:title];
	} else {
		[self sendCancelEvent:@"Cancel" withTitle:title];
	}
	
	NSLog(@"[KROLLDEMO] Event fired");
}

-(void)signalEvent:(id)args
{
	ENSURE_UI_THREAD(signalEvent,args);
	
	NSLog(@"[KROLLDEMO] signalEvent called");
	
	// If is a good idea to check if there are listeners for the event that
	// is about to fired. There could be zero or multiple listeners for the
	// specified event.
	if ([self _hasListeners:@"demoEvent"]) {
		NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
							   NUMINT(1),@"index",
							   NUMINT(100),@"value",
							   @"userEvent",@"name",
							   nil
							   ];
		[self fireEvent:@"demoEvent" withObject:event];
		
		NSLog(@"[KROLLDEMO] demoEvent fired");
	}
}

-(void)callThisCallbackDirectly:(id)args
{
	ENSURE_UI_THREAD(callThisCallbackDirectly,args);
	
	// This macro ensures that there is only one argument and that the argument
	// is of type NSDictionary. It also has the side-effect of re-assigning the
	// 'args' variable to the NSDictionary object.
	ENSURE_SINGLE_ARG(args,NSDictionary);
	
	NSLog(@"[KROLLDEMO] callThisCallbackDirectly called");
	
	KrollCallback* callback = [args objectForKey:@"callback"];
	id data = [args objectForKey:@"data"];
	
	// Our callback will be passed 2 arguments: the value of the data property
	// from the dictionary passed in and a fixed string
	NSArray* arrayOfValues = [NSArray arrayWithObjects: data, @"KrollDemo", nil];
	
	if (callback){
		// The 'call' method of the KrollCallback object can be used to directly 
		// call the associated JavaScript function and get a return value. In this
		// instance there is no return value for the callback.
		[callback call:arrayOfValues thisObject:nil];
		
		NSLog(@"[KROLLDEMO] callback was called");
	}
}

#pragma Kroll Property Management

-(void)setWatchPropertyChanges:(id)value
{
	// This method is the 'setter' method for the 'watchPropertyChanges' proxy property.
	// It is called whenever the JavaScript code sets the value of the 'watchPropertyChanges'
	// property.
	//
	// By setting the modelDelegate property of the proxy, the 'propertyChanged' method
	// will be called whenever a proxy property is updated. This is an alternative technique
	// to implementing individual setter methods if you just need to know when a proxy 
	// property has been updated in the set of properties that the proxy maintains.
	
	BOOL enabled = [TiUtils boolValue:value];
	if (enabled) {
		self.modelDelegate = self;
	} else {
		self.modelDelegate = nil;
	}
	
	// If you implement a setter, you should also manually store the property yourself in
	// the dynprops for the proxy. This is done by calling the 'replaceValu' method.
	[self replaceValue:value forKey:@"watchPropertyChanges" notification:NO];
}

-(void)propertyChanged:(NSString*)key oldValue:(id)oldValue newValue:(id)newValue proxy:(TiProxy*)proxy
{
	// If the 'modelDelegate' property has been set for this proxy then this method is called
	// whenever a proxy property value is updated. Note that this method is called whenever the
	// setter is called, so it will get called even if the value of the property has not changed.
	
	if ([oldValue isEqual:newValue]) {
		// Value didn't really change
		return;
	}
	
	NSLog(@"[KROLLDEMO] Property %@ changed from %@ to %@", key, oldValue, newValue);
	
	// If is a good idea to check if there are listeners for the event that
	// is about to fired. There could be zero or multiple listeners for the
	// specified event.
	if ([self _hasListeners:@"propertyChange"]) {	
		NSDictionary *event = [NSDictionary dictionaryWithObjectsAndKeys:
							   key, @"property",
							   oldValue == nil ? [NSNull null] : oldValue, @"oldValue",
							   newValue == nil ? [NSNull null] : newValue, @"newValue",
							   nil
							   ];
		[self fireEvent:@"propertyChange" withObject:event];
	}
}


@end
