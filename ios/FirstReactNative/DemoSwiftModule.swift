import Foundation
import AVFoundation
import CoreLocation
import React

@objc(DemoSwiftModule)
class DemoSwiftModule: NSObject, RCTBridgeModule {
  var locationManager: CLLocationManager?
  var pendingLocationResolve: RCTPromiseResolveBlock?
  var pendingLocationReject: RCTPromiseRejectBlock?

  static func moduleName() -> String! {
    return "DemoSwiftModule"
  }

  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(getDeviceInfo:rejecter:)
  func getDeviceInfo(resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let device = UIDevice.current
    let info: [String: Any] = [
      "deviceName": device.name,
      "systemName": device.systemName,
      "osVersion": device.systemVersion
    ]
    resolve(info)
  }

  @objc(requestCameraPermission:rejecter:)
  func requestCameraPermission(resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let status = AVCaptureDevice.authorizationStatus(for: .video)
    if status == .authorized {
      resolve("granted")
      return
    }

    if status == .denied || status == .restricted {
      resolve("denied")
      return
    }

    AVCaptureDevice.requestAccess(for: .video) { granted in
      resolve(granted ? "granted" : "denied")
    }
  }

  @objc(requestLocationPermission:rejecter:)
  func requestLocationPermission(resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let status = CLLocationManager.authorizationStatus()
    if status == .authorizedAlways || status == .authorizedWhenInUse {
      resolve("granted")
      return
    }
    if status == .denied || status == .restricted {
      resolve("denied")
      return
    }

    pendingLocationResolve = resolve
    pendingLocationReject = reject

    if locationManager == nil {
      locationManager = CLLocationManager()
      locationManager?.delegate = self
    }
    locationManager?.requestWhenInUseAuthorization()
  }
}

extension DemoSwiftModule: CLLocationManagerDelegate {
  func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    guard let resolve = pendingLocationResolve else { return }

    if status == .authorizedAlways || status == .authorizedWhenInUse {
      resolve("granted")
    } else if status == .denied || status == .restricted {
      resolve("denied")
    } else {
      resolve("undetermined")
    }

    pendingLocationResolve = nil
    pendingLocationReject = nil
  }
}
