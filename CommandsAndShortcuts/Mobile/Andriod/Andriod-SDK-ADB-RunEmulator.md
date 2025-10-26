# Step 0: Launch the emulator

First & Foremost - start the emulator:

Powershell Command

```powersheel
 Start-Process emulator -ArgumentList "-avd Medium_Phone_API_36.0"
```

Medium_Phone_API_36.0 - This is the name of the emulator which I created through Andriod Studio.
You can do so by going to device manager.

What adb install does:

- ✅ Installs the APK to the emulator
- ❌ Does NOT launch the app automatically

To install AND launch, use this PowerShell command:

adb install -r "app\build\outputs\apk\debug\app-debug.apk" ; adb shell am start -n
com.deepak.timesheet/.MainActivity

Or as separate commands:

# Step 1: Install

adb install -r "app\build\outputs\apk\debug\app-debug.apk"

# Step 2: Launch

adb shell am start -n com.deepak.timesheet/.MainActivity

Explanation of flags:

- -r: Reinstall (keeps existing data, replaces the app)
- am start -n: Activity Manager - start activity by component name
- com.deepak.timesheet/.MainActivity: Package name and main activity

One-liner for full rebuild, install, and launch:

```
./gradlew assembleDebug ; adb install -r "app\build\outputs\apk\debug\app-debug.apk" ; adb shell am start -n com.deepak.timesheet/.MainActivity
```

This will:

1. Build the APK
2. Install it to the emulator
3. Launch the app automatically
