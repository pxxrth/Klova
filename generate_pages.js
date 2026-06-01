const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf8');

const industries = [
  { slug: 'painters', trade: 'Painters', tradePlural: 'Painters' },
  { slug: 'plumbers', trade: 'Plumbers', tradePlural: 'Plumbers' },
  { slug: 'landscapers', trade: 'Landscapers', tradePlural: 'Landscapers' },
  { slug: 'contractors', trade: 'Contractors', tradePlural: 'Contractors' },
  { slug: 'cleaners', trade: 'Cleaners', tradePlural: 'Cleaners' }
];

const cities = [
  { slug: 'toronto', name: 'Toronto' },
  { slug: 'ottawa', name: 'Ottawa' },
  { slug: 'winnipeg', name: 'Winnipeg' },
  { slug: 'calgary', name: 'Calgary' },
  { slug: 'hamilton', name: 'Hamilton' }
];

industries.forEach(ind => {
  let content = indexContent;
  
  // Replace Title
  content = content.replace(/<title>.*?<\/title>/, `<title>Web Design for ${ind.tradePlural} Canada | Klova Digital</title>`);
  
  // Replace Description
  content = content.replace(/<meta name="description"\s+content=".*?" \/>/s, `<meta name="description"\n    content="Hand-coded websites for Canadian ${ind.trade.toLowerCase()} businesses. Fast, SEO-ready, delivered in 24hrs. Free mockup before any payment." />`);

  // Replace H1
  content = content.replace(/<h1 class="hero-title">.*?<\/h1>/, `<h1 class="hero-title">Web Design for ${ind.tradePlural} That Gets You More Jobs.</h1>`);
  
  // Replace Hero Subtitle
  content = content.replace(/<p class="hero-subtitle">.*?<\/p>/s, `<p class="hero-subtitle">\n          A fast, professional website is the difference between a homeowner calling you or calling your competitor. We build hand-coded websites specifically designed to get Canadian ${ind.trade.toLowerCase()} more leads and booked jobs.\n        </p>`);

  fs.writeFileSync(`web-design-for-${ind.slug}.html`, content);
});

cities.forEach(city => {
  let content = indexContent;
  
  // Replace Title
  content = content.replace(/<title>.*?<\/title>/, `<title>Web Design ${city.name} | Klova Digital</title>`);
  
  // Replace Description
  content = content.replace(/<meta name="description"\s+content=".*?" \/>/s, `<meta name="description"\n    content="Hand-coded websites for ${city.name} local businesses. Fast, SEO-ready, $1,499 flat or $150/month. Free mockup first." />`);

  // Replace H1
  content = content.replace(/<h1 class="hero-title">.*?<\/h1>/, `<h1 class="hero-title">Web Design for ${city.name} Local Service Businesses.</h1>`);
  
  // Replace Hero Subtitle
  content = content.replace(/<p class="hero-subtitle">.*?<\/p>/s, `<p class="hero-subtitle">\n          Stand out in the ${city.name} market with a blazing fast, hand-coded website. Designed specifically for local trades and service businesses, we handle the SEO, mobile design, and speed so you can focus on running your business.\n        </p>`);

  fs.writeFileSync(`web-design-${city.slug}.html`, content);
});

console.log("Pages generated successfully.");
