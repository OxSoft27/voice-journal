# Setup Vercel - Cara Mudah (Manual via Web)

## ✅ Repository GitHub Sudah Siap!

**URL Repository:** https://github.com/OxSoft27/voice-journal

## 🚀 Deploy ke Vercel (5 Menit)

### Langkah 1: Buka Vercel

1. Buka browser, kunjungi: **https://vercel.com**
2. Klik **"Sign Up"** atau **"Login"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub Anda

### Langkah 2: Import Project

1. Setelah login, klik tombol **"Add New..."** (pojok kanan atas)
2. Pilih **"Project"**
3. Cari repository **"voice-journal"** di list
4. Klik **"Import"**

### Langkah 3: Configure Project

Di halaman konfigurasi:

1. **Project Name**: `voice-journal` (biarkan default)
2. **Framework Preset**: Pilih **"Other"** atau biarkan kosong
3. **Root Directory**: `.` (biarkan default)
4. **Build Command**: Kosongkan (tidak perlu)
5. **Output Directory**: Kosongkan (tidak perlu)

### Langkah 4: Set Environment Variable

**PENTING!** Sebelum deploy, tambahkan API key:

1. Klik **"Environment Variables"** (expand section)
2. Tambahkan variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: `<paste-your-groq-api-key-here>`
   - **Environment**: Centang semua (Production, Preview, Development)

   **Note**: Gunakan Groq API key yang sudah Anda dapatkan dari https://console.groq.com
3. Klik **"Add"**

### Langkah 5: Deploy!

1. Klik tombol **"Deploy"** (biru, besar)
2. Tunggu 1-2 menit sampai selesai
3. Setelah selesai, Anda akan dapat URL seperti:
   ```
   https://voice-journal-xxx.vercel.app
   ```
4. **COPY URL ini!**

### Langkah 6: Test Backend

Buka URL di browser:
```
https://voice-journal-xxx.vercel.app/api/analyze
```

Jika muncul error "Method not allowed" atau "Audio data is required" → **Backend sudah jalan!** ✅

### Langkah 7: Update Frontend

Edit file `src/services/aiService.js` di project Anda:

Cari baris:
```javascript
const BACKEND_URL = 'YOUR_BACKEND_URL_HERE';
```

Ganti dengan URL Vercel Anda:
```javascript
const BACKEND_URL = 'https://voice-journal-xxx.vercel.app';
```

**Save file!**

### Langkah 8: Push Update ke GitHub

```bash
cd voice-journal
git add src/services/aiService.js
git commit -m "Update backend URL"
git push
```

## ✅ Selesai!

Backend sudah live dan siap digunakan! 🎉

## 🧪 Test Aplikasi

```bash
cd voice-journal
npm start
```

Pilih iOS/Android, lalu test recording!

## 🔍 Troubleshooting

### Cek Logs di Vercel

1. Buka https://vercel.com/dashboard
2. Klik project **"voice-journal"**
3. Tab **"Deployments"** → klik deployment terakhir
4. Tab **"Functions"** → klik `/api/analyze`
5. Lihat logs jika ada error

### Re-deploy

Jika ada perubahan:
1. Push ke GitHub
2. Vercel otomatis re-deploy

Atau manual:
1. Buka Vercel dashboard
2. Klik project
3. Tab "Deployments"
4. Klik "..." → "Redeploy"

---

**Selamat! Backend sudah live! 🚀**
