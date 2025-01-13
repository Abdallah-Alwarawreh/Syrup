# Syrup: The Open-Source Honey Alternative

[![Build Extension](https://github.com/Abdallah-Alwarawreh/Syrup/actions/workflows/build-extension.yml/badge.svg)](https://github.com/Abdallah-Alwarawreh/Syrup/actions/workflows/build-extension.yml) [![Discord](https://img.shields.io/discord/1322120002576453745?color=5865F2&label=Discord&logo=discord&logoColor=white)](https://dsc.gg/hexium)

Syrup is a lightweight, open-source browser extension designed to make finding and applying the best coupons effortless. Unlike traditional tools like Honey, Syrup prioritizes **transparency**, **user privacy**, and **ethical design** over profit-driven motives.

Please read [the privacy policy](https://joinsyrup.com/PrivacyPolicy).

You can help the project financially by becoming a Patreon member [here](https://www.patreon.com/c/HexiumDev/membership) or on [Ko-fi](https://ko-fi.com/HexiumDev).

---

## 🎥 Featured Video

Watch how and why Syrup was made!

<div align="center">  
  <a href="https://www.youtube.com/watch?v=uBy9rERgmlU">  
    <img src="imgs/thumbnail.png" alt="Honey Is A Scam... So I Made My Own">
    <img src="imgs/AvailableonYouTube-white-SVG.svg" alt="Watch on YouTube" style="position: absolute; bottom: 10px; right: 10px; width: 15%;">
  </a>  
</div>

---

## 🌟 Features

-   🔍 **Smart Coupon Finder**: Automatically scans for and applies the best coupons during checkout.
-   🌱 **Ethical & Transparent**: Open-source and free from hidden agendas or shady affiliate deals.
-   🔒 **Privacy-Focused**: No tracking, no data harvesting just savings.

---

## 💪 Installing

The Syrup extension is availabe to anyone using a Chromium or Firefox-based browser with WebExtension support!

[![Chrome download link](https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png)](https://chromewebstore.google.com/detail/syrup/odfgjmajnbkiabjnfiijllkihjpilfch)
[![Firefox download link](https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png)](https://addons.mozilla.org/en-US/firefox/addon/syrup)
...or manually as a [.crx-file](https://github.com/Abdallah-Alwarawreh/Syrup/releases/)

---

## 🚀 Building

0. **Prerequisites**: \
   [Node.js](https://nodejs.org/) and npm installed for development.
1. **Download the Extension**:  
   Clone or download the repo:

    ```bash
    git clone https://github.com/Abdallah-Alwarawreh/Syrup.git
    cd Extension-React
    ```

2. **Build the Extension**:  
   Install dependencies and build:

    ```bash
    npm install
    npm run build
    ```

3. **Add to Your Browser**:
    - Open your browser’s developer mode.
    - Load the `dist` folder as an unpacked extension.

---

## 🤝 Contributing

We welcome contributions to improve Syrup! Here’s how you can help:

1. Fork the repository.
2. Create a branch for your feature or bug fix:
    ```bash
    git checkout -b my-new-feature
    ```
3. Commit your changes and push the branch:
    ```bash
    git commit -m "Add my feature"
    git push origin my-new-feature
    ```
4. Open a Pull Request!

For major changes, please open an issue first to discuss what you’d like to contribute.

### Translating

You can also contribute by helping to translate Syrup! This is done through our [Crowdin](https://crowdin.com/project/syrup-extension) instance.

---

## 🚀 Backend / API

> ⚠️ Work in Progress! Feel free to contribute and shape the future of Syrup!

### Exchangeable Backend System

The backend system is designed to be fully exchangeable! You can:
- 🏠 Host existing backends yourself
- 🛠️ Write your own implementation
- 🔌 Use different providers
- ⚙️ Configure everything in the extension settings

### API Standard

The backend follows the Syrup API Standard (SAS). Check out our [backend documentation](https://github.com/Abdallah-Alwarawreh/Syrup/tree/main/backend/standard) for all the details! Found something that could be improved? Create an issue - we'd love to hear your thoughts!

### Current Implementation

The current backend is maintained by [@ImGajeed76](https://github.com/ImGajeed76). Check out the implementation here: [discountdb-api](https://github.com/ImGajeed76/discountdb-api)

Got questions? Feel free to:
- 💬 Contact @ImGajeed76 on Discord
- 📝 Open an issue in the [discountdb-api](https://github.com/ImGajeed76/discountdb-api) repo
- 🤝 Contribute to the project (and maybe leave a star 😉)

---

## 📚 Tech Stack

[Techstack](./techstack.md)

---

## ❤️ Acknowledgements

Special thanks to the amazing people who made Syrup possible:

-   **Nufshi** and **skyerush** for their support in creating the video.
-   **Taco** for incredible emotional support.
-   And for our lovely contributors:
    -   @abstra208 - UI, Safari Extension, Translation and Bug Fixes.
    -   @mvlwarekekw - Translation and Bug Fixes.
    -   @1A3Dev - UI, Safari Extension and Bug Fixes.
    -   @cranberry3148 - Auto Apply Coupons and Bug Fixes.
    -   @ImGajeed76 - API and Endpoints and his [backend (go star)](https://github.com/ImGajeed76/discountdb-api) we use
    -   @hammerill - Github Build Script.
    -   @chipseater - Redirection Handler in Website.
    -   @JxxIT - Bug Fixes.
    -   And to all other individuals who edited the README.

---

## 📄 License

Syrup is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this project.

---

## 🗨️ Join the Community

Have questions, ideas, or just want to connect? Join our [Discord Community](https://discord.com/invite/SxTjmsS2g9)!
