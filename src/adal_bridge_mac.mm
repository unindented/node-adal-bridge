#include "adal_bridge.h"

#import <ADAL/ADAL.h>
#import <AppKit/AppKit.h>
#import <Foundation/Foundation.h>

@interface AppDelegate : NSObject <NSApplicationDelegate>

@property(readonly) NSString *token;
@property(readonly) NSString *error;

- (void)getToken;
- (void)terminateGracefully:(id)sender;
- (void)applicationWillFinishLaunching:(NSNotification *)notification;

@end

@implementation AppDelegate

- (void)getToken {
  ADAuthenticationError *error = nil;
  ADAuthenticationContext *authContext = [ADAuthenticationContext
      authenticationContextWithAuthority:@"https://login.windows.net/common"
                                   error:&error];

  [authContext
      acquireTokenWithResource:@"https://officeapps.live.com"
                      clientId:@"d3590ed6-52b3-4102-aeff-aad2292ab01c"
                   redirectUri:[NSURL URLWithString:@"urn:ietf:wg:oauth:2.0:oob"]
                promptBehavior:AD_PROMPT_ALWAYS
                        userId:nil
          extraQueryParameters:nil
               completionBlock:^(ADAuthenticationResult *result) {
                 if (AD_SUCCEEDED != result.status) {
                   _error = result.error.errorDetails;
                 } else {
                   _token = result.accessToken;
                 }
                 [self terminateGracefully:nil];
               }];
}

- (void)terminateGracefully:(id)sender {
  [NSApp stop:nil];

  // `[NSApp run]` doesn't notice that `[NSApp stop:]` was called until some
  // other event comes along, so we post a dummy one.
  NSEvent *event = [NSEvent
      otherEventWithType:NSApplicationDefined // NSEventTypeApplicationDefined
                location:NSMakePoint(0, 0)
           modifierFlags:0
               timestamp:0.0
            windowNumber:0
                 context:nil
                 subtype:0
                   data1:0
                   data2:0];
  [NSApp postEvent:event atStart:YES];
}

- (void)applicationWillFinishLaunching:(NSNotification *)notification {
  id appMenu = [[NSMenu new] autorelease];
  id appName = [[NSProcessInfo processInfo] processName];
  id quitTitle = [@"Quit " stringByAppendingString:appName];
  id quitMenuItem =
      [[[NSMenuItem alloc] initWithTitle:quitTitle
                                  action:@selector(terminateGracefully:)
                           keyEquivalent:@"q"] autorelease];
  [appMenu addItem:quitMenuItem];

  id appMenuItem = [[NSMenuItem new] autorelease];
  [appMenuItem setSubmenu:appMenu];

  id menubar = [[NSMenu new] autorelease];
  [menubar addItem:appMenuItem];
  [NSApp setMainMenu:menubar];

  [self getToken];
}

@end

namespace ADALBridge {

std::string GetToken() {
  [NSAutoreleasePool new];
  [NSApplication sharedApplication];

  id delegate = [AppDelegate new];
  [NSApp setDelegate:delegate];
  [NSApp setActivationPolicy:NSApplicationActivationPolicyRegular];
  [NSApp activateIgnoringOtherApps:YES];
  [NSApp run];

  return std::string([[delegate token] UTF8String]);
}

std::string GetTokenForUser(const std::string &userId) {
  NSLog(@"Get token for user %s", userId.c_str());

  return nil;
}

} // namespace ADALBridge
