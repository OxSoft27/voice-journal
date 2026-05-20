# Prompt Lengkap: Voice Journal App dengan AI Analysis

## 📱 Deskripsi Aplikasi

Buat aplikasi iOS Voice Journal menggunakan Expo/React Native yang memungkinkan user merekam journal harian dengan suara, lalu AI akan menganalisis mood dan sentiment secara otomatis.

## 🎯 Fitur Utama

1. **Home Screen**
   - Dashboard dengan statistik: total entries, streak harian, last mood
   - Tombol navigasi ke Record dan History
   - Info card tentang cara kerja aplikasi

2. **Record Screen**
   - Audio recording dengan visual feedback (pulse animation)
   - Timer untuk durasi recording
   - Start/Stop recording button
   - Processing indicator saat AI menganalisis
   - Auto-save ke local storage

3. **History Screen**
   - List semua journal entries (sorted by newest)
   - Expandable cards untuk melihat detail
   - Mood emoji dan sentiment badge
   - Transcription text
   - Keywords extraction
   - Delete functionality

4. **AI Analysis**
   - Speech-to-Text menggunakan Groq Whisper API (gratis)
   - Sentiment Analysis menggunakan Groq Llama 3.1 (gratis)
   - Mood detection (happy, sad, anxious, calm, excited, angry, neutral)
   - Keywords extraction

## 🛠️ Tech Stack

### Frontend
- **Framework**: Expo (React Native)
- **Navigation**: React Navigation (Stack Navigator)
- **Audio**: expo-av
- **Storage**: @react-native-async-storage/async-storage
- **HTTP Client**: axios
- **File System**: expo-file-system

### Backend
- **Platform**: Vercel Serverless Functions
- **Runtime**: Node.js
- **AI Provider**: Groq API (100% GRATIS)
  - Whisper Large V3 untuk Speech-to-Text
  - Llama 3.1 70B untuk Sentiment Analysis

### Deployment
- **Code Repository**: GitHub
- **Backend Hosting**: Vercel (gratis)
- **Frontend**: Expo Go (development) / EAS Build (production)

## 📂 Struktur Project

```
voice-journal/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Dashboard & stats
│   │   ├── RecordScreen.js        # Recording interface
│   │   └── HistoryScreen.js       # Journal history list
│   └── services/
│       └── aiService.js           # AI integration service
├── api/
│   ├── analyze.js                 # Vercel Function untuk AI analysis
│   └── package.json               # Backend dependencies
├── assets/                        # Icons & splash screen
├── App.js                         # Main app entry with navigation
├── package.json                   # Frontend dependencies
├── vercel.json                    # Vercel configuration
├── .gitignore                     # Git ignore file
├── .env.example                   # Environment variables template
├── README.md                      # Full documentation
└── TUTORIAL.md                    # Setup tutorial

```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
# Create Expo project
npx create-expo-app@latest voice-journal --template blank
cd voice-journal

# Install frontend dependencies
npm install expo-av axios @react-native-async-storage/async-storage expo-file-system
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context --legacy-peer-deps
```

### 2. Create Screens

**HomeScreen.js**: Dashboard dengan statistik journal entries
- Load stats dari AsyncStorage
- Calculate streak
- Display mood emoji
- Navigation buttons

**RecordScreen.js**: Recording interface
- Request microphone permission
- Start/stop recording dengan expo-av
- Visual feedback (pulse animation)
- Send audio ke backend untuk analysis
- Save result ke AsyncStorage

**HistoryScreen.js**: Journal history
- Load entries dari AsyncStorage
- Expandable cards
- Delete functionality
- Empty state

### 3. Create AI Service

**aiService.js**: Integration dengan backend
- Send audio (base64) ke backend API
- Handle response (transcription, mood, sentiment, keywords)
- Mock data untuk development mode

### 4. Create Backend API

**api/analyze.js**: Vercel Serverless Function
- Accept audio file (base64)
- Call Groq Whisper API untuk transcription
- Call Groq Llama 3.1 untuk sentiment analysis
- Return JSON response:
  ```json
  {
    "transcription": "...",
    "mood": "happy",
    "sentiment": 0.8,
    "keywords": ["work", "family", "health"]
  }
  ```

### 5. Vercel Configuration

**vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "GROQ_API_KEY": "@groq_api_key"
  }
}
```

### 6. Environment Variables

**Groq API Key**: Dapatkan gratis di https://console.groq.com

Set di Vercel:
```bash
vercel env add GROQ_API_KEY
```

Update frontend `aiService.js`:
```javascript
const BACKEND_URL = 'https://your-vercel-url.vercel.app';
```

## 🚀 Deployment Steps

### 1. Setup Git & GitHub

```bash
git init
git add .
git commit -m "Initial commit: Voice Journal app"
gh repo create voice-journal --public --source=. --remote=origin --push
```

### 2. Deploy Backend ke Vercel

**Via Web (Recommended)**:
1. Login ke https://vercel.com dengan GitHub
2. Import project `voice-journal`
3. Set environment variable `GROQ_API_KEY`
4. Deploy

**Via CLI**:
```bash
npm install -g vercel
vercel login
vercel
vercel env add GROQ_API_KEY
vercel --prod
```

### 3. Update Frontend dengan Backend URL

Edit `src/services/aiService.js`:
```javascript
const BACKEND_URL = 'https://voice-journal-xxx.vercel.app';
```

Commit & push:
```bash
git add src/services/aiService.js
git commit -m "Connect to backend"
git push
```

### 4. Run App

```bash
npm start
```

Pilih platform:
- `i` untuk iOS Simulator
- `a` untuk Android Emulator
- Scan QR code dengan Expo Go untuk device fisik

## 🎨 Design Guidelines

### Color Scheme
- Primary: `#6366f1` (indigo)
- Background: `#f5f5f5` (light gray)
- Success: `#10b981` (green)
- Error: `#ef4444` (red)
- Text: `#333333` (dark gray)

### Typography
- Title: 28px, bold
- Subtitle: 16px, regular
- Body: 14px, regular
- Small: 12px, regular

### Components
- Rounded corners: 12px
- Shadow: subtle (opacity 0.1)
- Padding: 16-20px
- Spacing: 12-16px between elements

## 🔒 Security & Privacy

- Audio recordings tersimpan **lokal** di device (AsyncStorage)
- Hanya transcription yang dikirim ke server
- Tidak ada tracking atau analytics
- Data tidak dibagikan ke pihak ketiga
- API key disimpan di environment variables (tidak di-commit ke Git)

## 💰 Cost Breakdown

**Total: $0/bulan** (100% GRATIS!)

- ✅ Groq API: Unlimited gratis
- ✅ Vercel: 100GB bandwidth/bulan gratis
- ✅ Expo: Gratis untuk development
- ✅ AsyncStorage: Gratis (local storage)
- ✅ GitHub: Gratis untuk public repository

## 🧪 Testing

### Development Mode
- Mock data otomatis digunakan jika backend belum setup
- Test recording tanpa AI analysis

### Production Mode
- Test dengan real Groq API
- Verify transcription accuracy
- Check sentiment analysis results

## 📝 Documentation Files

1. **README.md** - Full documentation (English)
2. **TUTORIAL.md** - Step-by-step setup (Bahasa Indonesia)
3. **VERCEL_SETUP.md** - Vercel deployment guide
4. **PROJECT_SUMMARY.md** - Project overview
5. **.env.example** - Environment variables template

## 🐛 Common Issues & Solutions

### "Failed to analyze voice journal"
- Cek backend URL di `aiService.js`
- Cek `GROQ_API_KEY` di Vercel environment variables
- Cek Vercel logs: `vercel logs`

### "Permission Required"
- iOS: Settings → Privacy → Microphone → Enable untuk Expo Go
- Android: App auto-request permission

### Backend Error 500
- Cek Groq API key valid
- Cek logs di Vercel dashboard
- Verify audio format supported (m4a, mp3, wav)

## 🎯 Success Criteria

✅ User dapat merekam voice journal (1-5 menit)
✅ AI menganalisis mood dan sentiment dengan akurat
✅ Transcription readable dan akurat
✅ Data tersimpan lokal dan persistent
✅ UI responsive dan user-friendly
✅ App berjalan di iOS dan Android
✅ Backend deployed dan accessible
✅ Total cost: $0

## 🚀 Next Steps (Optional Enhancements)

1. **Notifications** - Daily reminder untuk journal
2. **Mood Calendar** - Visual calendar dengan mood colors
3. **Insights Dashboard** - Weekly/monthly mood trends
4. **Export Data** - Export journal ke PDF/CSV
5. **Multi-language** - Support Bahasa Indonesia
6. **Voice Playback** - Play recorded audio
7. **Cloud Sync** - Optional cloud backup (Supabase/Firebase)
8. **Themes** - Dark mode support

---

## 📞 Support

Jika ada masalah:
1. Baca dokumentasi di README.md
2. Cek TUTORIAL.md untuk setup steps
3. Cek Vercel logs untuk backend errors
4. Verify Groq API key valid

**Selamat membuat aplikasi! 🎉**
