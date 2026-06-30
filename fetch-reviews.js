/**
 * fetch-reviews.js
 * Haalt Google-reviews op in EN, TR en AR en slaat ze op als:
 *   data/reviews-en.json
 *   data/reviews-tr.json
 *   data/reviews-ar.json
 *
 * Gebruik:
 *   GOOGLE_API_KEY=AIza... node fetch-reviews.js
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PLACE_ID = 'ChIJ-4Zydm-3yhQREuKbfvs7mBY';
const API_KEY  = process.env.GOOGLE_API_KEY;
const LANGS    = ['en', 'tr', 'ar'];

if (!API_KEY) {
  console.error('Fout: GOOGLE_API_KEY is niet ingesteld.');
  console.error('Gebruik: GOOGLE_API_KEY=AIza... node fetch-reviews.js');
  process.exit(1);
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '??';
}

async function fetchForLang(lang) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json`
    + `?place_id=${PLACE_ID}`
    + `&fields=name,rating,user_ratings_total,reviews`
    + `&reviews_sort=newest`
    + `&language=${lang}`
    + `&key=${API_KEY}`;

  const data = await get(url);

  if (data.status !== 'OK') {
    throw new Error(`API-fout (${lang}): ${data.status} ${data.error_message || ''}`);
  }

  const place   = data.result;
  const reviews = (place.reviews || [])
    .filter(r => r.rating >= 4 && r.text && r.text.trim().length > 10)
    .slice(0, 6)
    .map(r => ({
      author:   r.author_name,
      initials: initials(r.author_name),
      rating:   r.rating,
      text:     r.text,
      time:     r.relative_time_description,
      photo:    r.profile_photo_url || null,
    }));

  return {
    fetched_at:    new Date().toISOString(),
    lang,
    place_name:    place.name,
    rating:        place.rating,
    total_reviews: place.user_ratings_total,
    reviews,
  };
}

async function main() {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });

  for (const lang of LANGS) {
    process.stdout.write(`[${lang}] ophalen… `);
    const result = await fetchForLang(lang);
    const file   = path.join(__dirname, 'data', `reviews-${lang}.json`);
    fs.writeFileSync(file, JSON.stringify(result, null, 2), 'utf8');
    console.log(`✓ ${result.reviews.length} reviews → ${file}`);
  }

  // Houd ook reviews.json bij als fallback (Engels)
  const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'reviews-en.json'), 'utf8'));
  fs.writeFileSync(path.join(__dirname, 'data', 'reviews.json'), JSON.stringify(en, null, 2), 'utf8');

  const en2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'reviews-en.json'), 'utf8'));
  console.log(`\nGemiddeld: ${en2.rating} ⭐ (${en2.total_reviews} totaal)`);
}

main().catch(err => { console.error(err); process.exit(1); });
