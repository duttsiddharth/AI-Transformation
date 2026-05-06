# 🚀 Quick Start Guide

Get AIOps Transition Suite running in 30 seconds!

## Method 1: Open Directly (Fastest)
```bash
# Just double-click the file!
open index.html
```
Or drag `index.html` into your browser.

---

## Method 2: Command Line
```bash
# Make deploy script executable
chmod +x deploy.sh

# Run with default port 8080
./deploy.sh

# Or specify custom port
./deploy.sh 3000
```

Then open: http://localhost:8080

---

## Method 3: Docker (Production-Ready)
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

Access at: http://localhost:8080

---

## Method 4: Cloud Deployment

### Netlify (Drag & Drop)
1. Go to https://app.netlify.com/drop
2. Drag this folder onto the page
3. Done! Live URL provided instantly

### Vercel
```bash
npx vercel --prod
```

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from Branch"
4. Choose "main" branch
5. Save - your site is live!

---

## 📁 Files You Need

| File | Purpose | Required? |
|------|---------|-----------|
| `index.html` | Main application | ✅ Yes |
| `presentation.html` | Standalone deck | Optional |
| `README.md` | Documentation | Optional |
| `DEPLOY.md` | Deployment guide | Optional |

**Just upload `index.html` and you're done!**

---

## ✅ Verify Installation

Open browser console (F12) and you should see:
- No 404 errors
- All features working
- Can edit phase names, KPIs, etc.

---

## 🎯 Next Steps

1. **Customize Program Title**
   - Click "AIOps" in header → Type new name

2. **Rename Phases**
   - Click phase buttons → Edit names

3. **Add Deliverables**
   - Click "+ Add" in sidebar

4. **Set KPI Targets**
   - Click any target value to edit

---

## 🆘 Troubleshooting

**Page won't load?**
- Try a different browser (Chrome/Firefox recommended)
- Check if JavaScript is enabled
- Try incognito/private mode

**Can't edit fields?**
- Click directly on text
- Check if field has edit icon (✎)
- Try refreshing page

**Styles look wrong?**
- Clear browser cache (Ctrl+Shift+R)
- Check browser version is modern

---

**Ready to transform operations!** 🎉