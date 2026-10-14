# نشر منصة صالوني Salooni KW على استضافة مجانية 🌸

بنفس معمارية لعبة `iBridge KW`:
- خادم واحد يخدم الموقع (`web/`) والـ API (`/api/*`) على منفذ واحد وبنفس الأصل (بلا CORS).
- تطبيق ويب قابل للتثبيت على الجوال (PWA: `manifest.webmanifest` + `sw.js` + أيقونات `maskable` و`apple-touch-icon`).
- جاهز للنشر الفوري على **Render** عبر `Dockerfile` و`render.yaml`.

## النشر الدائم بنقرة واحدة (Render Blueprint)

1. المستودع مرفوع على GitHub: `https://github.com/binlaith/salooni-kw`
2. افتح رابط النشر المباشر:
   `https://render.com/deploy?repo=https://github.com/binlaith/salooni-kw`
3. في حقل **Blueprint Name** اكتب `salooni-kw` ثم اضغط **Deploy Blueprint**.
4. سيصبح الرابط الدائم: `https://salooni-kw.onrender.com`
