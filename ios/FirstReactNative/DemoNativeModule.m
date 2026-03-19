#import "DemoNativeModule.h"
#import <React/RCTLog.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreLocation/CoreLocation.h>

@interface DemoNativeModule() <CLLocationManagerDelegate>
@property (nonatomic, strong) CLLocationManager *locationManager;
@property (nonatomic, copy) RCTPromiseResolveBlock pendingLocationResolve;
@property (nonatomic, copy) RCTPromiseRejectBlock pendingLocationReject;
@end

@implementation DemoNativeModule

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

RCT_EXPORT_METHOD(getDeviceInfo:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  @try {
    UIDevice *device = [UIDevice currentDevice];
    NSDictionary *info = @{
      @"deviceName": device.name ?: @"Unknown",
      @"systemName": device.systemName ?: @"Unknown",
      @"osVersion": device.systemVersion ?: @"Unknown"
    };
    resolve(info);
  } @catch (NSException *exception) {
    reject(@"get_device_info_error", exception.reason, nil);
  }
}

RCT_EXPORT_METHOD(requestCameraPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  if (status == AVAuthorizationStatusAuthorized) {
    resolve(@"granted");
    return;
  }

  if (status == AVAuthorizationStatusDenied || status == AVAuthorizationStatusRestricted) {
    resolve(@"denied");
    return;
  }

  [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
    if (granted) {
      resolve(@"granted");
    } else {
      resolve(@"denied");
    }
  }];
}

RCT_EXPORT_METHOD(requestLocationPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  CLAuthorizationStatus status = CLLocationManager.authorizationStatus;

  if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    resolve(@"granted");
    return;
  }

  if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
    resolve(@"denied");
    return;
  }

  self.pendingLocationResolve = resolve;
  self.pendingLocationReject = reject;
  if (!self.locationManager) {
    self.locationManager = [[CLLocationManager alloc] init];
    self.locationManager.delegate = self;
  }
  [self.locationManager requestWhenInUseAuthorization];
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
  if (!self.pendingLocationResolve) {
    return;
  }

  if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    self.pendingLocationResolve(@"granted");
  } else if (status == kCLAuthorizationStatusDenied || status == kCLAuthorizationStatusRestricted) {
    self.pendingLocationResolve(@"denied");
  } else {
    self.pendingLocationResolve(@"undetermined");
  }

  self.pendingLocationResolve = nil;
  self.pendingLocationReject = nil;
}

@end
