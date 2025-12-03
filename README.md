# 🎙️ Text to Voice Converter

A modern, feature-rich web application that converts text to speech with extensive support for Indian and international languages. Built with vanilla JavaScript and the Web Speech API.

<p align="center">
  <img src="audio.png" alt="Text to Voice Converter" width="100"/>
</p>

## ✨ Features

- 🇮🇳 **Multi-language Support**: Comprehensive support for Indian languages including Hindi, Tamil, Telugu, Malayalam, Bengali, Marathi, Gujarati, Kannada, Punjabi, and more
- 🌍 **International Languages**: Support for English, Spanish, French, German, Chinese, Japanese, and many others
- 🎛️ **Advanced Controls**: 
  - Adjustable speech speed (0.1x to 2x)
  - Pitch control (-1 to 3)
  - Volume control (0% to 100%)
- ⏯️ **Full Playback Controls**: Play, Pause, Resume, Stop, and Clear
- 📊 **Visual Progress Bar**: Real-time progress indicator during speech playback
- 📝 **Character Counter**: Track text length as you type
- 🎤 **Smart Voice Filtering**: Filter voices by language or region
- 🎨 **Modern UI**: Beautiful gradient design with Indian flag colors
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⌨️ **Keyboard Shortcuts**: Press `Ctrl + Enter` to speak
- 🔄 **Sample Text Buttons**: Quick sample texts in multiple Indian languages

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Safari, or Firefox)
- No installation or build process required!

### Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/txt-to-voice.git
   ```

2. Navigate to the project folder:
   ```bash
   cd txt-to-voice
   ```

3. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with" your preferred browser, or
   - Use a local server (optional):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

4. Start converting text to speech!

## 📖 Usage

1. **Enter Text**: Type or paste your text into the text area
2. **Select Language**: Choose your preferred language from the filter dropdown
3. **Choose Voice**: Select a specific voice from the available options
4. **Adjust Settings** (optional):
   - Speed: Control how fast the speech is
   - Pitch: Adjust the tone of the voice
   - Volume: Set the audio level
5. **Click Speak**: Press the Speak button or use `Ctrl + Enter`
6. **Control Playback**: Use Pause, Resume, Stop, or Clear buttons as needed

### Sample Texts

Click any of the sample buttons to load pre-written text in:
- English
- Hindi (हिंदी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)

## 🗂️ Project Structure

```
txt-to-voice/
├── index.html          # Main HTML file
├── style.css           # Styles and design
├── script.js           # JavaScript functionality
├── audio.png           # Logo image
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Core functionality and interactivity
- **Web Speech API**: Browser-native text-to-speech synthesis
- **Google Fonts**: Poppins font family

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance and voice selection |
| Edge | ✅ Full | Excellent Indian language support |
| Safari | ✅ Full | Good support on macOS and iOS |
| Firefox | ⚠️ Partial | Limited voice selection |

## 🎯 Supported Languages

### Indian Languages
- Hindi (हिंदी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Malayalam (മലയാളം)
- Bengali (বাংলা)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Punjabi (ਪੰਜਾਬੀ)
- Urdu (اردو)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)
- Sanskrit (संस्कृत)
- Konkani (कोंकणी)
- Nepali (नेपाली)
- Indian English

### International Languages
- English (US, UK, AU, CA)
- Spanish
- French
- German
- Chinese
- Japanese
- And many more!

*Note: Available voices depend on your operating system and browser.*

## 💡 Tips

- **Best Browser**: Chrome or Edge provide the most voices and best quality
- **Indian Voices**: Windows 10/11 has built-in Indian language voices
- **Voice Quality**: Some voices may sound more natural than others
- **Long Text**: The app handles long text, but may pause on very large inputs
- **Offline**: Once loaded, works offline (voices are system-provided)

## 🐛 Known Issues

- Some browsers have limited voice selection
- Pause/Resume may not work perfectly in all browsers
- Voice quality varies by operating system

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created with ❤️ for Indian voices and multilingual support

## 🙏 Acknowledgments

- Web Speech API for making browser-based TTS possible
- Google Fonts for the beautiful Poppins font
- The open-source community for inspiration and support

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure your browser supports the Web Speech API
3. Try a different browser or voice
4. Open an issue on GitHub

---

**Made with ❤️ for Indian voices | Works best in Chrome, Edge & Safari**
