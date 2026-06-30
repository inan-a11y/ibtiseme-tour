/**
 * fetch-reviews.js
 * Haalt Google-reviews op via Places API en slaat ze op als data/reviews.json
 *
 * Gebruik:
 *   GOOGLE_API_KEY=AIza... node fetch-reviews.js
 *
 * Plan je het automatisch? Voeg toe aan package.json scripts:
 *   "fetch-reviews": "GOOGLE_API_KEY=AIza... node fetch-reviews.js"
 * En draai het wekelijks of bij elke deploy.
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PLACE_ID  = 'ChIJ-4Zydm-3yhQREuKbfvs7mBY';
const API_KEY   = process.env.GOOGLE_API_KEY;
const OUT_FILE  = path.join(__dirname, 'data', 'reviews.json');

if (!API_KEY) {
  console.error('Fout: GOOGLE_API_KEY is niet ingesteld.');
  console.error('Gebruik: GOOGLE_API_KEY=AIza... node fetch-reviews.js');
  process.exit(1);
}

const url = `https://maps.googleapis.com/maps/api/place/details/json`
  + `?place_id=${PLACE_ID}`
  + `&fields=name,rating,user_ratings_total,reviews`
  + `&reviews_sort=newest`
  + `&language=en`
  + `&key=${API_KEY}`;

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
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

async function main() {
  console.log('Reviews ophalen van Google Places API…');
  const data = await get(url);

  if (data.status !== 'OK') {
    console.error('API-fout:', data.status, data.error_message || '');
    process.exit(1);
  }

  const place   = data.result;
  const reviews = (place.reviews || [])
    .filter(r => r.rating >= 4)           // alleen 4- en 5-sterren
    .slice(0, 6)                           // max 6 reviews tonen
    .map(r => ({
      author:   r.author_name,
      initials: initials(r.author_name),
      rating:   r.rating,
      text:     r.text,
      time:     r.relative_time_description,
      photo:    r.profile_photo_url || null,
    }));

  const output = {
    fetched_at:    new Date().toISOString(),
    place_name:    place.name,
    rating:        place.rating,
    total_reviews: place.user_ratings_total,
    reviews,
  };

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf8');

  console.log(`✓ ${reviews.length} reviews opgeslagen → ${OUT_FILE}`);
  console.log(`  Gemiddeld: ${place.rating} ⭐ (${place.user_ratings_total} totaal)`);
}

main().catch(err => { console.error(err); process.exit(1); });
