## How to build Safari Extension

-   Ensure you have Xcode installed (this requires you to have a device running macOS)

---

## 🚀 Installation

1. **Download the Extension**:
   Clone or download the repo: `git clone https://github.com/Abdallah-Alwarawreh/Syrup.git`

2. Open the `Extension-Safari` directory and run `Syrup.xcodeproj`

## 🚀 Installation (Locally Only)

3. Ensure at the top of Xcode you see `Syrup (macOS)`

4. On the left sidebar select Syrup

5. Go to the `Signing & Capabilities` tab and you should see 4 "targets" on the left side

    - Go through each of the targets and set the `Team` as your Apple ID's "Personal Team" and `Signing Certificate` to `Development`

6. Click the play button at the top left and it should build and open the macOS app

7. If you would like to use the extension on iOS:
    - [iPhone] Open the settings app then go into Privacy & Security > Developer Mode and ensure it is enabled
    - Connect your iPhone to your macOS device via USB
    - [macOS] At the top of Xcode switch "Syrup (macOS)" to "Syrup (iOS)"
    - [macOS] Wait for it to install the required files to the phone (you can check the status by going to Product > Destination > Manage Run Destinations)
    - [macOS] Once it has finished ensure the selected device (shown next to where it says "Syrup (iOS)") is your iPhone and not a simulator device then click the play button at the top left and it should build the iOS app on your device
        - [iPhone] If it doesn't open and instead shows a popup titled "Untrusted Developer" go to Settings > General > VPN & Device Management > YOUR APPLE EMAIL > Trust then open the app
    - [iPhone] Open safari and click the button on the left of the url bar
    - [iPhone] Go into Manage Extensions and ensure Syrup is enabled

## 🚀 Installation (To Publish)

3. Ensure at the top of Xcode you see `Syrup (macOS)`

4. On the menu bar click `Product` then `Archive`

5. Once the `Archives` menu shows up click the `Distribute App` option on the right

6. The only option that works without a paid apple developer account is `Custom` > `Copy App` however I'm unsure if that would work if you share the `Syrup.app` to other people since it wouldn't be signed for them.
