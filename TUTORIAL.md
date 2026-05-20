# Tutorial Setup Voice Journal App

## 📱 Aplikasi Sudah Siap!

Struktur project sudah lengkap. Sekarang tinggal setup API key dan deploy.

## 🔑 Langkah 1: Dapatkan Groq API Key (GRATIS)

1. Buka browser, kunjungi: **https://console.groq.com**
2. Klik **"Sign Up"** atau **"Get Started"**
3. Daftar dengan email (GRATIS, tidak perlu kartu kredit)
4. Setelah login, klik **"API Keys"** di menu kiri
5. Klik tombol **"Create API Key"**
6. Beri nama (misal: "voice-journal")
7. **COPY** API key yang muncul (format: `gsk_...`)

⚠️ **PENTING**: Simpan API key ini di tempat aman!

## 🚀 Langkah 2: Deploy Backend ke Vercel (GRATIS)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login ke Vercel

```bash
vercel login
```

Pilih metode login (GitHub/Email), lalu ikuti instruksi.

### Deploy Backend

```bash
cd voice-journal
vercel
```

Jawab pertanyaan:
- **Set up and deploy?** → Ketik `Y` lalu Enter
- **Which scope?** → Pilih username Anda
- **Link to existing project?** → Ketik `N` lalu Enter
- **What's your project's name?** → Ketik `voice-journal` lalu Enter
- **In which directory is your code located?** → Ketik `.` lalu Enter
- **Want to override the settings?** → Ketik `N` lalu Enter

Tunggu sampai selesai. Anda akan dapat URL seperti:
```
✅ Production: https://voice-journal-abc123.vercel.app
```

**COPY URL ini!**

### Set API Key di Vercel

```bash
vercel env add GROQ_API_KEY
```

- **What's the value?** → Paste API key Groq Anda (yang tadi di-copy)
- **Add to Production?** → Ketik `Y` lalu Enter
- **Add to Preview?** → Ketik `Y` lalu Enter  
- **Add to Development?** → Ketik `Y` lalu Enter

### Deploy Ulang dengan API Key

```bash
vercel --prod
```

Tunggu sampai selesai. Backend sudah siap! ✅

## 📝 Langkah 3: Update Frontend

Edit file `src/services/aiService.js`:

Cari baris ini:
```javascript
const BACKEND_URL = 'YOUR_BACKEND_URL_HERE';
```

Ganti dengan URL Vercel Anda:
```javascript
const BACKEND_URL = 'https://voice-journal-abc123.vercel.app';
```

**Save file!**

## ▶️ Langkah 4: Jalankan Aplikasi

```bash
npm start
```

Pilih platform:
- Ketik **`i`** untuk iOS Simulator
- Ketik **`a`** untuk Android Emulator
- Scan QR code dengan **Expo Go** app untuk device fisik

## ✅ Selesai!

Aplikasi sudah jalan dengan AI analysis yang sebenarnya! 🎉

## 🧪 Test Aplikasi

1. Tap **"Record Journal"**
2. Tap **"Start Recording"**
3. Bicara selama 10-30 detik (bahasa Inggris atau Indonesia)
4. Tap **"Stop & Save"**
5. Tunggu AI menganalisis (5-10 detik)
6. Lihat hasil di **"View History"**

## 💡 Tips

- **Bahasa Indonesia**: Edit `api/analyze.js`, ganti `'en'` jadi `'id'` di line 62
- **Mock Data**: Jika backend belum setup, app otomatis pakai mock data untuk testing
- **Logs**: Cek error dengan `vercel logs` jika ada masalah

## 🆘 Troubleshooting

### "Failed to analyze voice journal"

**Cek:**
1. Apakah `BACKEND_URL` di `aiService.js` sudah benar?
2. Apakah backend sudah di-deploy? Coba buka URL di browser
3. Apakah `GROQ_API_KEY` sudah di-set? Cek dengan `vercel env ls`

**Solusi:**
```bash
# Cek environment variables
vercel env ls

# Jika belum ada, tambahkan
vercel env add GROQ_API_KEY

# Deploy ulang
vercel --prod
```

### "Permission Required"

**iOS**: Settings → Privacy & Security → Microphone → Enable untuk Expo Go

**Android**: App akan auto-request permission saat pertama kali record

### Backend error 500

**Cek logs:**
```bash
vercel logs
```

Biasanya karena API key salah atau belum di-set.

## 📞 Butuh Bantuan?

Baca `README.md` untuk dokumentasi lengkap!

---

**Selamat mencoba! 🚀**
