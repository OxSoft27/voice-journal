# Product Requirements Document (PRD)
# Voice Journal - AI-Powered Mental Wellness App

**Version:** 1.0  
**Date:** May 20, 2026  
**Author:** Product Team  
**Status:** Draft

---

## 1. Executive Summary

### 1.1 Product Overview
Voice Journal adalah aplikasi mobile iOS yang memungkinkan pengguna merekam journal harian menggunakan suara, dengan AI yang secara otomatis menganalisis mood, sentiment, dan mengekstrak insights dari setiap entry. Aplikasi ini dirancang untuk membantu pengguna melacak kesehatan mental mereka dengan cara yang natural dan effortless.

### 1.2 Problem Statement
- Menulis journal secara manual memakan waktu dan terasa seperti beban
- Banyak orang kesulitan mengidentifikasi pola emosi mereka sendiri
- Aplikasi mental health existing terlalu kompleks atau mahal
- Barrier to entry tinggi untuk habit journaling

### 1.3 Solution
Voice Journal menghilangkan friction dengan:
- Voice-first interface (bicara lebih natural daripada menulis)
- AI analysis otomatis (tidak perlu self-reflection manual)
- Gratis dan privacy-first (data tersimpan lokal)
- Simple UX (3 screens, minimal cognitive load)

### 1.4 Success Metrics
- **Retention**: 40% D7 retention, 20% D30 retention
- **Engagement**: 3+ entries per week per active user
- **Completion Rate**: 80% users yang mulai recording menyelesaikannya
- **NPS**: Target 50+

---

## 2. Target Users

### 2.1 Primary Persona: "Mindful Millennial"
- **Age**: 25-35 tahun
- **Occupation**: Knowledge worker, entrepreneur, creative professional
- **Pain Points**:
  - Stress dari pekerjaan dan kehidupan pribadi
  - Kesulitan memproses emosi
  - Tidak punya waktu untuk journaling tradisional
- **Goals**:
  - Improve mental wellness
  - Understand emotional patterns
  - Build healthy habits
- **Tech Savviness**: High (comfortable dengan AI tools)

### 2.2 Secondary Persona: "Wellness Seeker"
- **Age**: 35-50 tahun
- **Occupation**: Professional, parent
- **Pain Points**:
  - Burnout, anxiety
  - Ingin self-care tapi tidak tahu mulai dari mana
- **Goals**:
  - Stress management
  - Better work-life balance
- **Tech Savviness**: Medium

### 2.3 User Needs
1. **Ease of Use**: Minimal steps untuk record journal
2. **Privacy**: Data tidak boleh bocor atau dijual
3. **Insights**: Actionable feedback tentang mood patterns
4. **Consistency**: Reminder dan streak tracking untuk build habit
5. **Speed**: Recording dan analysis harus cepat (<30 detik total)

---

## 3. Product Features

### 3.1 MVP Features (Phase 1)

#### Feature 1: Voice Recording
**Description**: User dapat merekam journal harian dengan suara (1-5 menit)

**User Story**:
> "As a user, I want to record my daily thoughts by speaking, so that I can journal without the friction of typing."

**Acceptance Criteria**:
- [ ] User dapat tap "Record" button untuk mulai recording
- [ ] Visual feedback (pulse animation) saat recording
- [ ] Timer menunjukkan durasi recording
- [ ] User dapat stop recording kapan saja
- [ ] Recording auto-save setelah stop
- [ ] Microphone permission request handled gracefully

**Technical Requirements**:
- Use `expo-av` untuk audio recording
- Format: M4A (iOS default)
- Max duration: 5 menit
- Min duration: 10 detik
- Audio quality: High (44.1kHz)

**Priority**: P0 (Must Have)

---

#### Feature 2: AI Analysis
**Description**: AI menganalisis recording dan memberikan mood, sentiment, transcription, dan keywords

**User Story**:
> "As a user, I want AI to analyze my journal entry automatically, so that I can understand my emotional state without manual reflection."

**Acceptance Criteria**:
- [ ] Audio dikirim ke backend setelah recording selesai
- [ ] Backend transcribe audio ke text (Groq Whisper)
- [ ] Backend analyze sentiment dan mood (Groq Llama 3.1)
- [ ] Backend extract keywords (top 5)
- [ ] Result ditampilkan dalam <10 detik
- [ ] Error handling jika API gagal

**Technical Requirements**:
- Backend: Vercel Serverless Function
- AI Provider: Groq API (gratis)
  - Whisper Large V3 untuk Speech-to-Text
  - Llama 3.1 70B untuk Sentiment Analysis
- Response format:
  ```json
  {
    "transcription": "string",
    "mood": "happy|sad|anxious|calm|excited|angry|neutral",
    "sentiment": -1.0 to 1.0,
    "keywords": ["string", "string", ...]
  }
  ```

**Priority**: P0 (Must Have)

---

#### Feature 3: Journal History
**Description**: User dapat melihat semua journal entries yang pernah dibuat

**User Story**:
> "As a user, I want to see my past journal entries, so that I can reflect on my emotional journey over time."

**Acceptance Criteria**:
- [ ] List semua entries sorted by newest first
- [ ] Setiap entry menampilkan: date, time, mood emoji, sentiment badge
- [ ] Tap entry untuk expand dan lihat transcription + keywords
- [ ] User dapat delete entry
- [ ] Empty state jika belum ada entries

**Technical Requirements**:
- Storage: AsyncStorage (local)
- Data structure:
  ```json
  {
    "id": "timestamp",
    "timestamp": "ISO-8601",
    "audioUri": "file://...",
    "transcription": "string",
    "mood": "string",
    "sentiment": number,
    "keywords": ["string"],
    "duration": number
  }
  ```

**Priority**: P0 (Must Have)

---

#### Feature 4: Dashboard & Stats
**Description**: Home screen menampilkan statistik journal entries

**User Story**:
> "As a user, I want to see my journaling stats, so that I feel motivated to continue the habit."

**Acceptance Criteria**:
- [ ] Display total entries count
- [ ] Display current streak (consecutive days)
- [ ] Display last mood emoji
- [ ] Navigation buttons ke Record dan History

**Technical Requirements**:
- Calculate streak: consecutive days dengan minimal 1 entry per day
- Stats update real-time setelah new entry

**Priority**: P0 (Must Have)

---

### 3.2 Future Features (Phase 2+)

#### Feature 5: Daily Reminder Notifications
**Description**: Push notification untuk remind user journal setiap hari

**Priority**: P1 (Should Have)

**Timeline**: Phase 2 (Q3 2026)

---

#### Feature 6: Mood Calendar
**Description**: Visual calendar dengan color-coded mood per day

**Priority**: P1 (Should Have)

**Timeline**: Phase 2 (Q3 2026)

---

#### Feature 7: Insights Dashboard
**Description**: Weekly/monthly mood trends, most common keywords, sentiment graph

**Priority**: P2 (Nice to Have)

**Timeline**: Phase 3 (Q4 2026)

---

#### Feature 8: Export Data
**Description**: Export journal entries ke PDF atau CSV

**Priority**: P2 (Nice to Have)

**Timeline**: Phase 3 (Q4 2026)

---

#### Feature 9: Multi-language Support
**Description**: Support Bahasa Indonesia dan bahasa lain

**Priority**: P2 (Nice to Have)

**Timeline**: Phase 3 (Q4 2026)

---

#### Feature 10: Cloud Sync (Optional)
**Description**: Backup data ke cloud (Supabase/Firebase)

**Priority**: P3 (Could Have)

**Timeline**: Phase 4 (2027)

---

## 4. User Experience (UX)

### 4.1 User Flow

```
[Launch App]
    ↓
[Home Screen]
    ├─→ [Tap "Record Journal"]
    │       ↓
    │   [Record Screen]
    │       ├─→ [Tap "Start Recording"]
    │       │       ↓
    │       │   [Recording... (pulse animation)]
    │       │       ↓
    │       │   [Tap "Stop & Save"]
    │       │       ↓
    │       │   [Processing... (AI analysis)]
    │       │       ↓
    │       │   [Success! Entry saved]
    │       │       ↓
    │       └───[Back to Home]
    │
    └─→ [Tap "View History"]
            ↓
        [History Screen]
            ├─→ [Tap entry to expand]
            │       ↓
            │   [View transcription + keywords]
            │       ↓
            │   [Tap "Delete" (optional)]
            │
            └─→ [Back to Home]
```

### 4.2 Screen Specifications

#### Screen 1: Home Screen
**Purpose**: Dashboard dan navigation hub

**Components**:
- Header: "Voice Journal" title
- Stats cards (3 columns):
  - Total Entries
  - Day Streak
  - Last Mood
- Primary CTA: "🎙️ Record Journal" (large, prominent)
- Secondary CTA: "📖 View History" (outlined button)
- Info box: "How it works" (3 steps)

**Interactions**:
- Tap "Record Journal" → Navigate to Record Screen
- Tap "View History" → Navigate to History Screen

---

#### Screen 2: Record Screen
**Purpose**: Voice recording interface

**Components**:
- Visual feedback: Pulse animation (3 concentric circles)
- Microphone icon (center)
- Timer: MM:SS format
- Status text: "Ready to record" / "Recording..." / "Processing..."
- Primary CTA: "Start Recording" (blue) / "Stop & Save" (red)
- Secondary CTA: "Cancel" (outlined)

**Interactions**:
- Tap "Start Recording" → Request mic permission → Start recording
- Tap "Stop & Save" → Stop recording → Send to backend → Show processing indicator → Navigate back to Home
- Tap "Cancel" → Navigate back to Home

**States**:
1. **Idle**: Ready to record
2. **Recording**: Pulse animation, timer running
3. **Processing**: Loading spinner, "Processing..." text
4. **Error**: Error message, "Try Again" button

---

#### Screen 3: History Screen
**Purpose**: List of past journal entries

**Components**:
- List of entry cards (scrollable)
- Each card shows:
  - Mood emoji (large)
  - Date (e.g., "Today", "Yesterday", "May 18, 2026")
  - Time (e.g., "10:30 AM")
  - Sentiment badge (Positive/Neutral/Negative)
- Expandable detail:
  - Transcription text
  - Keywords (tags)
  - Delete button
- Empty state: "No Journal Entries Yet" + illustration

**Interactions**:
- Tap card → Expand to show detail
- Tap "Delete" → Confirmation dialog → Delete entry
- Pull to refresh → Reload entries

---

### 4.3 Design System

#### Colors
- **Primary**: `#6366f1` (Indigo 500)
- **Background**: `#f5f5f5` (Gray 100)
- **Surface**: `#ffffff` (White)
- **Text Primary**: `#333333` (Gray 900)
- **Text Secondary**: `#666666` (Gray 600)
- **Success**: `#10b981` (Green 500)
- **Error**: `#ef4444` (Red 500)
- **Warning**: `#f59e0b` (Amber 500)

#### Typography
- **Title**: 28px, Bold (SF Pro Display)
- **Subtitle**: 16px, Regular
- **Body**: 14px, Regular
- **Caption**: 12px, Regular

#### Spacing
- **XS**: 4px
- **S**: 8px
- **M**: 12px
- **L**: 16px
- **XL**: 20px
- **XXL**: 24px

#### Components
- **Border Radius**: 12px (cards, buttons)
- **Shadow**: `0 2px 4px rgba(0,0,0,0.1)`
- **Button Height**: 48px (primary), 40px (secondary)

---

## 5. Technical Architecture

### 5.1 Frontend (Mobile App)

**Platform**: iOS (Expo/React Native)

**Tech Stack**:
- React Native 0.81+
- Expo SDK 52+
- React Navigation 7+
- AsyncStorage (local storage)
- Expo AV (audio recording)
- Axios (HTTP client)

**Key Libraries**:
```json
{
  "expo-av": "^14.0.0",
  "axios": "^1.6.0",
  "@react-native-async-storage/async-storage": "^2.0.0",
  "@react-navigation/native": "^7.0.0",
  "@react-navigation/stack": "^7.0.0",
  "expo-file-system": "^17.0.0"
}
```

**File Structure**:
```
src/
├── screens/
│   ├── HomeScreen.js
│   ├── RecordScreen.js
│   └── HistoryScreen.js
├── services/
│   └── aiService.js
├── components/ (future)
└── utils/ (future)
```

---

### 5.2 Backend (API)

**Platform**: Vercel Serverless Functions

**Tech Stack**:
- Node.js 20+
- Vercel Functions
- Groq API (AI provider)

**Endpoints**:

#### POST /api/analyze
**Description**: Analyze voice journal recording

**Request**:
```json
{
  "audio": "base64-encoded-audio",
  "mimeType": "audio/m4a"
}
```

**Response**:
```json
{
  "transcription": "Today was a good day...",
  "mood": "happy",
  "sentiment": 0.75,
  "keywords": ["work", "family", "exercise", "grateful", "productive"]
}
```

**Error Response**:
```json
{
  "error": "Failed to process audio",
  "message": "Groq API error: ..."
}
```

---

### 5.3 AI Integration

**Provider**: Groq (https://groq.com)

**Models**:
1. **Whisper Large V3** (Speech-to-Text)
   - Endpoint: `https://api.groq.com/openai/v1/audio/transcriptions`
   - Input: Audio file (M4A, MP3, WAV)
   - Output: Transcription text
   - Latency: ~2-5 seconds

2. **Llama 3.1 70B** (Sentiment Analysis)
   - Endpoint: `https://api.groq.com/openai/v1/chat/completions`
   - Input: Transcription text
   - Output: Mood, sentiment score, keywords
   - Latency: ~3-5 seconds

**Prompt Engineering**:
```
Analyze the following journal entry and provide:
1. Overall mood (choose one: happy, sad, anxious, calm, excited, angry, neutral)
2. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, 1 is very positive)
3. Key topics/keywords (max 5)

Journal entry: "{transcription}"

Respond in JSON format:
{
  "mood": "...",
  "sentiment": 0.0,
  "keywords": ["...", "..."]
}
```

---

### 5.4 Data Storage

**Local Storage (AsyncStorage)**:
- Key: `journal_entries`
- Value: JSON array of entry objects

**Data Schema**:
```typescript
interface JournalEntry {
  id: string;              // Timestamp as string
  timestamp: string;       // ISO-8601 format
  audioUri: string;        // Local file path
  transcription: string;   // AI-generated text
  mood: string;            // happy|sad|anxious|calm|excited|angry|neutral
  sentiment: number;       // -1.0 to 1.0
  keywords: string[];      // Max 5 keywords
  duration: number;        // Recording duration in seconds
}
```

**Example**:
```json
[
  {
    "id": "1716192000000",
    "timestamp": "2026-05-20T10:00:00.000Z",
    "audioUri": "file:///path/to/audio.m4a",
    "transcription": "Today was a productive day. I finished my project and felt accomplished.",
    "mood": "happy",
    "sentiment": 0.8,
    "keywords": ["productive", "project", "accomplished", "work", "satisfied"],
    "duration": 45
  }
]
```

---

### 5.5 Security & Privacy

**Data Privacy**:
- ✅ Audio recordings stored **locally** on device (not uploaded to cloud)
- ✅ Only transcription text sent to backend (not audio file)
- ✅ No user authentication required (anonymous usage)
- ✅ No analytics or tracking
- ✅ No third-party data sharing

**API Security**:
- ✅ Groq API key stored in Vercel environment variables (not in code)
- ✅ HTTPS only
- ✅ CORS enabled for mobile app origin
- ✅ Rate limiting (Vercel default: 100 req/10s)

**Compliance**:
- GDPR compliant (no personal data collected)
- CCPA compliant (no data sale)
- HIPAA not applicable (not a medical device)

---

## 6. Development Roadmap

### Phase 1: MVP (Q2 2026) - 4 weeks
**Goal**: Launch functional app with core features

**Week 1-2**: Frontend Development
- [ ] Setup Expo project
- [ ] Build Home Screen
- [ ] Build Record Screen
- [ ] Build History Screen
- [ ] Implement navigation

**Week 3**: Backend Development
- [ ] Setup Vercel project
- [ ] Implement /api/analyze endpoint
- [ ] Integrate Groq API
- [ ] Test AI analysis accuracy

**Week 4**: Testing & Launch
- [ ] End-to-end testing
- [ ] Bug fixes
- [ ] Deploy to TestFlight
- [ ] Soft launch (friends & family)

---

### Phase 2: Growth (Q3 2026) - 8 weeks
**Goal**: Improve retention and engagement

**Features**:
- [ ] Daily reminder notifications
- [ ] Mood calendar view
- [ ] Streak rewards (gamification)
- [ ] Onboarding tutorial
- [ ] App Store launch

---

### Phase 3: Insights (Q4 2026) - 8 weeks
**Goal**: Provide actionable insights

**Features**:
- [ ] Insights dashboard (weekly/monthly trends)
- [ ] Mood patterns detection
- [ ] Export data (PDF/CSV)
- [ ] Multi-language support

---

### Phase 4: Scale (2027) - TBD
**Goal**: Expand platform and monetization

**Features**:
- [ ] Android version
- [ ] Cloud sync (optional)
- [ ] Premium features (advanced insights, unlimited storage)
- [ ] Therapist integration (optional)

---

## 7. Success Metrics & KPIs

### 7.1 Acquisition Metrics
- **Downloads**: 1,000 in first month
- **Install-to-Signup**: N/A (no signup required)
- **Cost Per Install (CPI)**: $0 (organic only for MVP)

### 7.2 Engagement Metrics
- **DAU/MAU**: Target 30% (high for wellness apps)
- **Entries per Week**: 3+ per active user
- **Session Duration**: 2-5 minutes (recording + review)
- **Recording Completion Rate**: 80%+

### 7.3 Retention Metrics
- **D1 Retention**: 60%
- **D7 Retention**: 40%
- **D30 Retention**: 20%
- **Churn Rate**: <10% per month

### 7.4 Quality Metrics
- **AI Accuracy**: 85%+ (user-reported satisfaction)
- **Crash Rate**: <1%
- **API Latency**: <10 seconds (end-to-end)
- **NPS**: 50+

### 7.5 Business Metrics (Future)
- **Revenue**: $0 (MVP is free)
- **CAC**: $0 (organic)
- **LTV**: TBD (future premium features)

---

## 8. Risks & Mitigation

### Risk 1: Low User Retention
**Likelihood**: High  
**Impact**: High  
**Mitigation**:
- Implement daily reminders (Phase 2)
- Gamification (streaks, badges)
- Improve AI accuracy and insights
- User research to understand drop-off reasons

---

### Risk 2: AI Analysis Inaccuracy
**Likelihood**: Medium  
**Impact**: High  
**Mitigation**:
- Use state-of-the-art models (Llama 3.1 70B)
- Collect user feedback on accuracy
- Fine-tune prompts based on feedback
- Fallback to basic keyword extraction if AI fails

---

### Risk 3: Privacy Concerns
**Likelihood**: Low  
**Impact**: High  
**Mitigation**:
- Clear privacy policy (data stored locally)
- No user authentication (anonymous)
- Transparent about what data is sent to backend
- Option to delete all data

---

### Risk 4: Groq API Downtime
**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**:
- Implement retry logic (3 attempts)
- Graceful error handling
- Fallback to mock data for development
- Monitor Groq API status

---

### Risk 5: App Store Rejection
**Likelihood**: Low  
**Impact**: High  
**Mitigation**:
- Follow Apple guidelines strictly
- No medical claims (wellness, not therapy)
- Clear privacy policy
- Test on TestFlight first

---

## 9. Go-to-Market Strategy

### 9.1 Launch Plan

**Phase 1: Soft Launch (Week 1-2)**
- Target: Friends, family, beta testers
- Goal: Collect feedback, fix bugs
- Channels: Personal network, ProductHunt (Show HN)

**Phase 2: Public Launch (Week 3-4)**
- Target: Early adopters, wellness enthusiasts
- Goal: 1,000 downloads
- Channels:
  - ProductHunt launch
  - Reddit (r/productivity, r/mentalhealth)
  - Twitter/X
  - Indie Hackers

**Phase 3: Growth (Month 2-3)**
- Target: Mainstream users
- Goal: 10,000 downloads
- Channels:
  - App Store optimization (ASO)
  - Content marketing (blog posts, tutorials)
  - Influencer partnerships (micro-influencers)
  - Paid ads (if budget available)

---

### 9.2 Positioning

**Tagline**: "Your AI-powered mental wellness companion"

**Value Proposition**:
- "Journal in seconds, not minutes"
- "Understand your emotions with AI"
- "100% private, 100% free"

**Differentiation**:
- Voice-first (vs. text-based competitors)
- AI-powered insights (vs. manual journaling)
- Free and privacy-first (vs. subscription apps)

---

### 9.3 Pricing Strategy

**MVP**: Free (no monetization)

**Future (Phase 4)**:
- **Free Tier**: Unlimited entries, basic insights
- **Premium Tier** ($4.99/month or $39.99/year):
  - Advanced insights (mood trends, patterns)
  - Cloud sync
  - Export data
  - Priority support

---

## 10. Appendix

### 10.1 Competitive Analysis

| Feature | Voice Journal | Day One | Reflectly | Moodpath |
|---------|---------------|---------|-----------|----------|
| Voice Recording | ✅ | ❌ | ❌ | ❌ |
| AI Analysis | ✅ | ❌ | ✅ | ✅ |
| Free Tier | ✅ | Limited | Limited | Limited |
| Privacy-First | ✅ | ❌ (cloud) | ❌ (cloud) | ❌ (cloud) |
| iOS | ✅ | ✅ | ✅ | ✅ |
| Android | ❌ (future) | ✅ | ✅ | ✅ |

**Key Differentiators**:
1. Voice-first interface (unique)
2. 100% free with no ads
3. Data stored locally (privacy)
4. AI-powered insights (automated)

---

### 10.2 User Research Findings

**Interviews**: 10 potential users (age 25-40)

**Key Insights**:
1. 80% prefer voice over typing for journaling
2. 70% concerned about privacy (want local storage)
3. 60% want AI insights (not just transcription)
4. 50% willing to pay $5/month for premium features
5. 90% want daily reminders

**Quotes**:
> "I love the idea of just talking instead of typing. It feels more natural." - Sarah, 28

> "I'm worried about my data being stored in the cloud. Can it stay on my phone?" - Mike, 32

> "I want to see patterns in my mood over time, not just individual entries." - Lisa, 35

---

### 10.3 Technical Constraints

**Limitations**:
1. **iOS Only**: MVP focuses on iOS (Android in Phase 4)
2. **English Only**: MVP supports English (multi-language in Phase 3)
3. **Max Recording**: 5 minutes (to keep API costs low)
4. **No Cloud Sync**: Data stored locally (cloud sync in Phase 4)
5. **Groq API Dependency**: If Groq goes down, app won't work

---

### 10.4 Open Questions

1. **Monetization**: When and how to introduce premium features?
2. **Android**: Should we prioritize Android or focus on iOS first?
3. **Therapist Integration**: Is there demand for connecting with therapists?
4. **Social Features**: Should users be able to share entries (anonymously)?
5. **Wearable Integration**: Apple Watch support for quick voice notes?

---

## 11. Approval & Sign-off

**Product Manager**: ___________________  
**Engineering Lead**: ___________________  
**Design Lead**: ___________________  
**Date**: ___________________

---

**Document Version History**:
- v1.0 (2026-05-20): Initial draft

---

**End of PRD**
