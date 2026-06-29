# RS Technologies — Website

**rstechnologiesinternational.com**  
Elite Inbound Call Center & Dispatch Agency

---

## File Structure

```
rs-technologies/
├── index.html          ← Homepage (hero + services overview)
├── limo-dispatch.html  ← Flagship service page
├── hvac.html           ← HVAC Dispatch service page
├── solar.html          ← Solar Intake service page
├── real-estate.html    ← Real Estate Intake service page
├── contact.html        ← Contact / Get a Quote page
├── 404.html            ← Custom 404 error page
├── style.css           ← Global stylesheet
├── main.js             ← Interactivity (console, counters, form)
├── robots.txt          ← SEO: crawl instructions
├── sitemap.xml         ← SEO: sitemap for Google
└── README.md           ← This file
```

---

## Deploying to GitHub → Cloudflare Pages

### Step 1 — Push to GitHub

```bash
# Initialize repo (first time only)
git init
git remote add origin https://github.com/YOUR_USERNAME/rs-technologies.git

# Add all files and push
git add .
git commit -m "Initial site build"
git branch -M main
git push -u origin main
```

### Step 2 — Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages → Create → Pages → Connect to Git**
3. Select your GitHub repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Output directory:** `/` or leave blank
5. Click **Save and Deploy**

### Step 3 — Connect Custom Domain

1. In Cloudflare Pages → your project → **Custom Domains**
2. Add `rstechnologiesinternational.com`
3. Cloudflare will handle DNS automatically if the domain is managed there

---

## Future Updates

To update any page:
```bash
# Edit the file, then:
git add .
git commit -m "Updated [page name]"
git push
```
Cloudflare Pages auto-deploys on every push to `main`. No build step needed.

---

## Contact
**rstechnologies.pk@gmail.com**
