# Voice Journal App - AI Mental Wellness Tracker

Aplikasi iOS untuk tracking mental wellness melalui voice journal dengan AI analysis.

## 🎯 Fitur

- 🎙️ **Voice Recording** - Rekam journal harian dengan suara
- 🤖 **AI Analysis** - Analisis mood dan sentiment otomatis
- 📊 **Mood Tracking** - Lihat pola emosi dari waktu ke waktu
- 📝 **Transcription** - Konversi suara ke teks otomatis
- 🔒 **Privacy First** - Data tersimpan lokal di device

## 🚀 Tech Stack

- **Frontend**: React Native (Expo)
- **Backend**: Vercel Serverless Functions
- **AI**: Groq API (100% GRATIS)
  - Whisper Large V3 untuk Speech-to-Text
  - Llama 3.1 70B untuk Sentiment Analysis
- **Storage**: AsyncStorage (local)

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator atau device fisik
- Akun Vercel (gratis)
- Groq API Key (gratis)

## 🔑 Setup API Key (GRATIS)

### 1. Dapatkan Groq API Key

1. Buka https://console.groq.com
2. Sign up dengan email (GRATIS, tidak perlu kartu kredit)
3. Setelah login, klik **"API Keys"** di sidebar
4. Klik **"Create API Key"**
5. Copy API key yang muncul (format: `gsk_...`)

**PENTING**: Simpan API key ini, kita akan pakai nanti!

### 2. Setup Backend (Vercel)

#### Install Vercel CLI

```bash
npm install -g vercel
```

#### Login ke Vercel

```bash
vercel login
```

#### Deploy Backend

```bash
cd voice-journal
vercel
```

Ikuti prompt:
- Set up and deploy? **Y**
- Which scope? Pilih akun Anda
- Link to existing project? **N**
- Project name? **voice-journal** (atau nama lain)
- Directory? **.** (current directory)
- Override settings? **N**

#### Set Environment Variable

Setelah deploy, set Groq API key:

```bash
vercel env add GROQ_API_KEY
```

Paste API key Groq yang tadi Anda copy, lalu pilih:
- Production? **Y**
- Preview? **Y**
- Development? **Y**

#### Deploy Ulang dengan Environment Variable

```bash
vercel --prod
```

Setelah selesai, Anda akan dapat URL seperti:
```
https://voice-journal-xxx.vercel.app
```

**Copy URL ini!**

### 3. Update Frontend dengan Backend URL

Edit file `src/services/aiService.js`:

```javascript
// Ganti baris ini:
const BACKEND_URL = 'YOUR_BACKEND_URL_HERE';

// Dengan URL Vercel Anda:
const BACKEND_URL = 'https://voice-journal-xxx.vercel.app';
```

## 🏃 Cara Menjalankan

### Development Mode (dengan Mock Data)

```bash
cd voice-journal
npm start
```

Pilih:
- **i** untuk iOS Simulator
- **a** untuk Android Emulator
- Scan QR code dengan Expo Go app untuk device fisik

### Production Mode (dengan Real AI)

Setelah setup backend selesai:

```bash
npm start
```

App akan otomatis menggunakan backend Vercel untuk AI analysis.

## 📱 Cara Pakai

1. **Home Screen** - Lihat statistik journal Anda
2. **Record Journal** - Tap tombol "Record Journal"
3. **Mulai Rekam** - Bicara tentang hari Anda (1-5 menit)
4. **Stop & Save** - AI akan analisis mood dan sentiment
5. **View History** - Lihat semua journal entries

## 🧪 Testing

### Test dengan Mock Data (tanpa backend)

App sudah include mock data untuk testing. Cukup jalankan:

```bash
npm start
```

Mock data akan otomatis digunakan jika backend belum di-setup.

### Test dengan Real AI

Setelah setup backend, app akan otomatis menggunakan Groq API.

## 💰 Biaya

**SEMUANYA GRATIS!** 🎉

- ✅ Groq API: GRATIS unlimited (speech-to-text + AI analysis)
- ✅ Vercel Hosting: GRATIS (100GB bandwidth/bulan)
- ✅ Expo: GRATIS untuk development
- ✅ AsyncStorage: GRATIS (local storage)

**Total: $0/bulan** sampai Anda punya ribuan user!

## 🔒 Privacy & Security

- ✅ Audio recordings tersimpan **lokal** di device
- ✅ Hanya transcription yang dikirim ke server
- ✅ Tidak ada tracking atau analytics
- ✅ Data tidak dibagikan ke pihak ketiga

## 🐛 Troubleshooting

### Error: "Failed to analyze voice journal"

**Solusi:**
1. Cek apakah backend sudah di-deploy
2. Cek apakah `BACKEND_URL` di `aiService.js` sudah benar
3. Cek apakah `GROQ_API_KEY` sudah di-set di Vercel

### Error: "Permission Required"

**Solusi:**
- iOS: Settings → Privacy → Microphone → Enable untuk Expo Go
- Android: App akan auto-request permission

### Backend tidak jalan

**Solusi:**
```bash
# Cek logs
vercel logs

# Re-deploy
vercel --prod
```

## 📦 Build untuk Production

### iOS (TestFlight / App Store)

```bash
expo build:ios
```

### Android (Google Play)

```bash
expo build:android
```

## 🎨 Customization

### Ganti Warna Tema

Edit `styles` di setiap screen file:
- Primary color: `#6366f1` (indigo)
- Background: `#f5f5f5` (light gray)

### Tambah Mood Baru

Edit `getMoodEmoji()` function di `HomeScreen.js` dan `HistoryScreen.js`.

### Ganti Bahasa Transcription

Edit `api/analyze.js`:

```javascript
form.append('language', 'id'); // 'id' untuk Bahasa Indonesia
```

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Groq API Docs](https://console.groq.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React Navigation](https://reactnavigation.org/)

## 🤝 Contributing

Feel free to fork dan customize sesuai kebutuhan!

## 📄 License

MIT License - bebas digunakan untuk personal atau commercial.

---

**Dibuat dengan ❤️ menggunakan Expo + Groq AI**

Butuh bantuan? Open an issue atau contact developer.
