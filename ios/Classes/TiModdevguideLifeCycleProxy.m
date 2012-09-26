/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiModdevguideLifeCycleProxy.h"

#import "TiUtils.h"

static int nextProxyId = 1;

@implementation TiModdevguideLifeCycleProxy

-(id)init
{
	// This is the designated initializer method and will always be called
	// when the proxy is created.
	
	// Generate a unique identifier so the user can see which proxy
	// instance is being created or destroyed (for demonstration purposes only).
	proxyId = nextProxyId++;
	
	NSLog(@"[PROXY LIFECYCLE EVENT] init with proxy id of %d", proxyId);
	
	return [super init];
}

-(void)_destroy
{
	// This method is called from the dealloc method and is good place to
	// release any objects and memory that have been allocated for the proxy.
	
	NSLog(@"[PROXY LIFECYCLE EVENT] _destroy proxy with id %d", proxyId);
	
	[super _destroy];
}

-(void)dealloc
{
	// This method is called when the proxy is being deallocated. The superclass
	// method calls the _destroy method.
	
	NSLog(@"[PROXY LIFECYCLE EVENT] dealloc proxy with id %d", proxyId);
	
	[super dealloc];
}

-(id)_initWithPageContext:(id<TiEvaluator>)context
{
	// This method is one of the initializers for the proxy class. If the
	// proxy is created without arguments then this initializer will be called.
	// This method is also called from the other _initWithPageContext method.
	// The superclass method calls the init and _configure methods.
	
	NSLog(@"[PROXY LIFECYCLE EVENT] _initWithPageContext (no arguments)");
	
	return [super _initWithPageContext:context];
}

-(id)_initWithPageContext:(id<TiEvaluator>)context_ args:(NSArray*)args
{
	// This method is one of the initializers for the proxy class. If the
	// proxy is created with arguments then this initializer will be called.
	// The superclass method calls the _initWithPageContext method without
	// arguments.

	NSLog(@"[PROXY LIFECYCLE EVENT] _initWithPageContext %@", args);
	
	return [super _initWithPageContext:context_ args:args];
}

-(void)_configure
{
	// This method is called from _initWithPageContext to allow for
	// custom configuration of the module before startup. The superclass
	// method calls the startup method.

	NSLog(@"[PROXY LIFECYCLE EVENT] _configure");
	
	[super _configure];
}

-(void)_initWithProperties:(NSDictionary *)properties
{
	// This method is called from _initWithPageContext if arguments have been
	// used to create the proxy. It is called after the initializers have completed
	// and is a good point to process arguments that have been passed to the
	// proxy create method since most of the initialization has been completed
	// at this point.

	NSLog(@"[PROXY LIFECYCLE EVENT] _initWithProperties %@", properties);
	
	[super _initWithProperties:properties];
}

-(void)close:(id)args
{
    // Provide for API parity with Android 
}

@end
