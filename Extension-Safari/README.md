## How to build Safari Extension

-   Ensure you have Xcode installed (this requires you to have a device running macOS)

---

## 🚀 Installation

1. **Download the Extension**:
   Clone or download the repo: `git clone https://github.com/Abdallah-Alwarawreh/Syrup.git`

2. Open the `Extension-Safari` directory and run `Syrup.xcodeproj`

3. Ensure at the top of Xcode you see `Syrup (macOS)`

4. On the menu bar click `Product` then `Archive`

5. Once the `Archives` menu shows up click the `Distribute App` option on the right.

6. Select `Custom` > `Copy App` and select the `build` directory

7. Click export and you should see the `Syrup.app` within a directory in the `build` directory

## Development

If you would like to quickly test the extension during development, instead of archiving it you can do the first 3 steps above then skip to the following:

4. Click the play button at the top left of Xcode, it will automatically run the app which will load the extension.
