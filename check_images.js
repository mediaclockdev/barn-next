const fetch = require('node-fetch');

const url = 'https://wasoftwaredevelopment.com.au/wp-json/wc/v3/products?consumer_key=ck_fd481dff8d62db58c9e52aae923732fa09741ebe&consumer_secret=cs_ca32a794b315e6d84740709623227036b0f64f1e&per_page=100';

fetch(url)
  .then(res => res.json())
  .then(products => {
    const urls = new Set();
    products.forEach(p => {
      p.images.forEach(img => {
        urls.add(img.src);
      });
    });

    Array.from(urls).slice(0, 15).forEach(u => console.log(u));

    // check if any don't match the strict next.config condition:
    // https && wasoftwaredevelopment.com.au && /wp-content/uploads/
    const mismatched = Array.from(urls).filter(u => {
      return !u.startsWith('https://wasoftwaredevelopment.com.au/wp-content/uploads/');
    });

  })
  .catch(console.error);
