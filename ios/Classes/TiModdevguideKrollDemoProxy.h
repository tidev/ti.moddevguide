/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2012 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiModdevguideLifeCycleProxy.h"

// NOTE: This proxy subclasses the TiModdevguideLifeCycleProxy to demonstrate the
// lifecycle of a proxy. This would normally subclass TiProxy

@interface TiModdevguideKrollDemoProxy : TiModdevguideLifeCycleProxy <TiProxyDelegate>
{
@private
	// The JavaScript callbacks (KrollCallback objects)
	KrollCallback *successCallback;
	KrollCallback *cancelCallback;
	KrollCallback *requestDataCallback;
}

@end

