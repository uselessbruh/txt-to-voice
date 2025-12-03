// Get DOM elements
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const languageFilter = document.getElementById('languageFilter');
const rateControl = document.getElementById('rateControl');
const pitchControl = document.getElementById('pitchControl');
const volumeControl = document.getElementById('volumeControl');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');
const volumeValue = document.getElementById('volumeValue');
const charCount = document.getElementById('charCount');
const speakBtn = document.getElementById('speakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Initialize speech synthesis
const synth = window.speechSynthesis;
let voices = [];
let allVoices = [];
let currentUtterance = null;
let isPaused = false; // Track pause state manually

// Sample texts in different languages
const sampleTexts = {
    en: "Hello! This is a sample English text. Text to speech is amazing!",
    hi: "नमस्ते! यह हिंदी में एक नमूना पाठ है। टेक्स्ट टू स्पीच बहुत अच्छा है!",
    ta: "வணக்கம்! இது தமிழில் ஒரு மாதிரி உரை. உரையிலிருந்து பேச்சு அருமையானது!",
    te: "నమస్కారం! ఇది తెలుగులో ఒక నమూనా వచనం. టెక్స్ట్ టు స్పీచ్ అద్భుతమైనది!"
};

// Comprehensive Indian language codes (including all variations)
const indianLanguages = [
    'hi-IN', 'hi',           // Hindi
    'ta-IN', 'ta',           // Tamil
    'te-IN', 'te',           // Telugu
    'ml-IN', 'ml',           // Malayalam
    'bn-IN', 'bn',           // Bengali
    'mr-IN', 'mr',           // Marathi
    'gu-IN', 'gu',           // Gujarati
    'kn-IN', 'kn',           // Kannada
    'pa-IN', 'pa', 'pa-Guru-IN',  // Punjabi
    'en-IN',                 // Indian English
    'ur-IN', 'ur',           // Urdu
    'or-IN', 'or',           // Odia/Oriya
    'as-IN', 'as',           // Assamese
    'sa-IN', 'sa',           // Sanskrit
    'kok-IN', 'kok',         // Konkani
    'mai-IN', 'mai',         // Maithili
    'sd-IN', 'sd',           // Sindhi
    'ks-IN', 'ks',           // Kashmiri
    'ne-IN', 'ne',           // Nepali
    'doi-IN', 'doi',         // Dogri
    'mni-IN', 'mni',         // Manipuri
    'sat-IN', 'sat',         // Santali
    'bho-IN', 'bho'          // Bhojpuri
];

// Load available voices
function loadVoices() {
    allVoices = synth.getVoices();
    filterVoices();
}

// Filter voices based on language selection
function filterVoices() {
    const filter = languageFilter.value;
    voiceSelect.innerHTML = '';
    
    let filteredVoices = allVoices;
    
    if (filter === 'indian') {
        filteredVoices = allVoices.filter(voice => 
            indianLanguages.some(lang => {
                const langCode = lang.split('-')[0];
                return voice.lang.toLowerCase().includes(langCode.toLowerCase()) || 
                       voice.lang.toLowerCase() === lang.toLowerCase();
            })
        );
    } else if (filter !== 'all') {
        filteredVoices = allVoices.filter(voice => 
            voice.lang.toLowerCase().startsWith(filter.toLowerCase()) ||
            voice.lang.toLowerCase().includes(`-${filter.toLowerCase()}`)
        );
    }
    
    // Sort Indian voices first, then alphabetically
    filteredVoices.sort((a, b) => {
        const aIsIndian = indianLanguages.some(lang => {
            const langCode = lang.split('-')[0];
            return a.lang.toLowerCase().includes(langCode.toLowerCase()) || 
                   a.lang.toLowerCase() === lang.toLowerCase();
        });
        const bIsIndian = indianLanguages.some(lang => {
            const langCode = lang.split('-')[0];
            return b.lang.toLowerCase().includes(langCode.toLowerCase()) || 
                   b.lang.toLowerCase() === lang.toLowerCase();
        });
        if (aIsIndian && !bIsIndian) return -1;
        if (!aIsIndian && bIsIndian) return 1;
        return a.name.localeCompare(b.name);
    });
    
    filteredVoices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = allVoices.indexOf(voice);
        const flag = getLanguageFlag(voice.lang);
        option.textContent = `${flag} ${voice.name} (${voice.lang})`;
        
        // Highlight Indian voices
        const isIndian = indianLanguages.some(lang => {
            const langCode = lang.split('-')[0];
            return voice.lang.toLowerCase().includes(langCode.toLowerCase()) || 
                   voice.lang.toLowerCase() === lang.toLowerCase();
        });
        
        if (isIndian) {
            option.style.fontWeight = 'bold';
            option.style.color = '#FF9933';
        }
        
        voiceSelect.appendChild(option);
    });
    
    if (filteredVoices.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No voices available for this language';
        option.style.fontStyle = 'italic';
        option.style.color = '#999';
        voiceSelect.appendChild(option);
    } else {
        // Add info about voice count
        console.log(`Found ${filteredVoices.length} voice(s) for filter: ${filter}`);
    }
}

// Get flag emoji for language
function getLanguageFlag(lang) {
    const langLower = lang.toLowerCase();
    
    // Indian languages - all get Indian flag
    const indianLangCodes = ['hi', 'ta', 'te', 'ml', 'bn', 'mr', 'gu', 'kn', 'pa', 'ur', 'or', 'as', 'sa', 'kok', 'mai', 'sd', 'ks', 'ne', 'doi', 'mni', 'sat', 'bho'];
    
    for (let code of indianLangCodes) {
        if (langLower.startsWith(code) || langLower.includes(`-${code}`)) {
            return '🇮🇳';
        }
    }
    
    // Special check for en-IN (Indian English)
    if (langLower.includes('en-in') || langLower === 'en-in') {
        return '🇮🇳';
    }
    
    // Other common languages
    const flags = {
        'en-us': '🇺🇸', 'en-gb': '🇬🇧', 'en-au': '🇦🇺', 'en-ca': '🇨🇦',
        'es': '🇪🇸', 'fr': '🇫🇷', 'de': '🇩🇪', 'it': '🇮🇹',
        'ja': '🇯🇵', 'zh': '🇨🇳', 'ko': '🇰🇷', 'pt': '🇵🇹',
        'ru': '🇷🇺', 'ar': '🇸🇦', 'nl': '🇳🇱', 'sv': '🇸🇪',
        'pl': '🇵🇱', 'tr': '🇹🇷', 'th': '🇹🇭', 'vi': '🇻🇳'
    };
    
    for (let key in flags) {
        if (langLower.startsWith(key)) return flags[key];
    }
    
    return '🌐';
}

// Load voices on page load and when they change
loadVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}

// Language filter change
languageFilter.addEventListener('change', filterVoices);

// Update character count
textInput.addEventListener('input', () => {
    charCount.textContent = textInput.value.length;
});

// Update rate value display
rateControl.addEventListener('input', () => {
    rateValue.textContent = rateControl.value + 'x';
});

// Update pitch value display
pitchControl.addEventListener('input', () => {
    pitchValue.textContent = pitchControl.value + 'x';
});

// Update volume value display
volumeControl.addEventListener('input', () => {
    volumeValue.textContent = Math.round(volumeControl.value * 100) + '%';
});

// Sample text buttons
document.querySelectorAll('.sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        textInput.value = sampleTexts[lang];
        charCount.textContent = textInput.value.length;
        
        // Auto-select matching language filter
        languageFilter.value = lang;
        filterVoices();
    });
});

// Speak function
let progressInterval = null;
let estimatedDuration = 0;
let elapsed = 0;

function speak() {
    const text = textInput.value.trim();
    
    if (text === '') {
        alert('Please enter some text to convert to speech!');
        return;
    }
    
    // Check if voices are loaded
    if (!allVoices || allVoices.length === 0) {
        alert('Voices are still loading. Please wait a moment and try again.');
        return;
    }
    
    // If already speaking, stop first
    if (synth.speaking || isPaused) {
        console.log('Already speaking, stopping first...');
        synth.cancel();
        isPaused = false;
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        // Wait for complete stop
        setTimeout(() => {
            startSpeaking(text);
        }, 200);
        return;
    }
    
    startSpeaking(text);
}

function startSpeaking(text) {
    console.log('Starting speech...');
    
    // Create new utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Set selected voice
    const selectedVoiceIndex = parseInt(voiceSelect.value);
    if (!isNaN(selectedVoiceIndex) && allVoices[selectedVoiceIndex]) {
        currentUtterance.voice = allVoices[selectedVoiceIndex];
    }
    
    // Set rate, pitch, and volume
    currentUtterance.rate = parseFloat(rateControl.value) || 1;
    const pitchValue = parseFloat(pitchControl.value) || 1;
    currentUtterance.pitch = pitchValue < 0 ? 0 : (pitchValue > 2 ? 2 : pitchValue);
    currentUtterance.volume = parseFloat(volumeControl.value) || 1;
    
    // Calculate estimated duration
    estimatedDuration = (text.length / 10) * (1 / currentUtterance.rate) * 1000;
    elapsed = 0;
    
    // Event: Speech started
    currentUtterance.onstart = () => {
        console.log('Speech started event');
        isPaused = false;
        speakBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        resumeBtn.disabled = true;
        progressContainer.style.display = 'block';
        progressFill.style.width = '0%';
        progressText.textContent = 'Speaking...';
        
        // Start progress animation
        elapsed = 0;
        if (progressInterval) clearInterval(progressInterval);
        
        progressInterval = setInterval(() => {
            elapsed += 100;
            const progress = Math.min((elapsed / estimatedDuration) * 100, 99);
            progressFill.style.width = progress + '%';
        }, 100);
    };
    
    // Event: Speech ended normally
    currentUtterance.onend = () => {
        console.log('Speech ended event');
        isPaused = false;
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        speakBtn.disabled = false;
        pauseBtn.disabled = true;
        resumeBtn.disabled = true;
        stopBtn.disabled = true;
        progressFill.style.width = '100%';
        progressText.textContent = 'Completed!';
        setTimeout(() => {
            progressContainer.style.display = 'none';
            progressFill.style.width = '0%';
        }, 1500);
    };
    
    // Event: Speech error
    currentUtterance.onerror = (event) => {
        // Only handle real errors, not 'canceled' which is expected
        if (event.error === 'canceled' || event.error === 'interrupted') {
            console.log('Speech canceled/interrupted (normal)');
            isPaused = false;
            return;
        }
        
        console.error('Speech error:', event.error);
        isPaused = false;
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
        speakBtn.disabled = false;
        pauseBtn.disabled = true;
        resumeBtn.disabled = true;
        stopBtn.disabled = true;
        progressContainer.style.display = 'none';
        alert('Speech Error: ' + event.error);
    };
    
    // Event: Speech paused
    currentUtterance.onpause = () => {
        console.log('Speech paused event fired');
        isPaused = true;
    };
    
    // Event: Speech resumed
    currentUtterance.onresume = () => {
        console.log('Speech resumed event fired');
        isPaused = false;
    };
    
    // Start speaking
    console.log('Calling synth.speak()...');
    synth.speak(currentUtterance);
}

// Pause function
function pause() {
    console.log('Pause clicked - Speaking:', synth.speaking, 'isPaused:', isPaused);
    
    if (synth.speaking && !isPaused) {
        console.log('Pausing speech...');
        synth.pause();
        isPaused = true;
        
        // Update UI
        pauseBtn.disabled = true;
        resumeBtn.disabled = false;
        progressText.textContent = 'Paused';
        
        // Stop progress bar
        if (progressInterval) {
            console.log('Clearing progress interval');
            clearInterval(progressInterval);
            progressInterval = null;
        }
    } else {
        console.log('Cannot pause - not speaking or already paused');
    }
}

// Resume function
function resume() {
    console.log('Resume clicked - Speaking:', synth.speaking, 'isPaused:', isPaused);
    
    if (isPaused) {
        console.log('Resuming speech...');
        synth.resume();
        isPaused = false;
        
        // Update UI
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;
        progressText.textContent = 'Speaking...';
        
        // Restart progress bar from current position
        if (progressInterval) clearInterval(progressInterval);
        
        progressInterval = setInterval(() => {
            elapsed += 100;
            const progress = Math.min((elapsed / estimatedDuration) * 100, 99);
            progressFill.style.width = progress + '%';
        }, 100);
        
        console.log('Progress bar restarted');
    } else {
        console.log('Cannot resume - not paused. isPaused:', isPaused);
    }
}

// Stop function
function stop() {
    console.log('Stop requested - Speaking:', synth.speaking, 'isPaused:', isPaused);
    
    // Clear progress interval
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    
    // Cancel speech if active
    if (synth.speaking || isPaused) {
        synth.cancel();
        isPaused = false;
    }
    
    // Reset UI
    speakBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    stopBtn.disabled = true;
    progressContainer.style.display = 'none';
    progressFill.style.width = '0%';
    progressText.textContent = '';
}

// Clear function
function clear() {
    // Stop speech if running
    stop();
    
    // Clear text
    textInput.value = '';
    charCount.textContent = '0';
}

// Event listeners for buttons
speakBtn.addEventListener('click', speak);
pauseBtn.addEventListener('click', pause);
resumeBtn.addEventListener('click', resume);
stopBtn.addEventListener('click', stop);
clearBtn.addEventListener('click', clear);

// Allow Enter key to speak (with Ctrl)
textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        speak();
    }
});

// Debug: Log all available voices
function logAvailableVoices() {
    console.log('=== Available Voices ===');
    console.log(`Total voices: ${allVoices.length}`);
    
    const indianVoices = allVoices.filter(voice => 
        indianLanguages.some(lang => {
            const langCode = lang.split('-')[0];
            return voice.lang.toLowerCase().includes(langCode.toLowerCase()) || 
                   voice.lang.toLowerCase() === lang.toLowerCase();
        })
    );
    
    console.log(`Indian voices: ${indianVoices.length}`);
    
    // Group by language
    const voicesByLang = {};
    allVoices.forEach(voice => {
        if (!voicesByLang[voice.lang]) {
            voicesByLang[voice.lang] = [];
        }
        voicesByLang[voice.lang].push(voice.name);
    });
    
    console.log('Voices by language:', voicesByLang);
    console.log('Indian voices found:', indianVoices.map(v => `${v.name} (${v.lang})`));
}

// Initialize on load
window.addEventListener('load', () => {
    charCount.textContent = '0';
    // Set Indian language filter as default
    languageFilter.value = 'indian';
    filterVoices();
    
    // Log available voices for debugging
    setTimeout(() => {
        if (allVoices.length > 0) {
            logAvailableVoices();
        }
    }, 500);
});
