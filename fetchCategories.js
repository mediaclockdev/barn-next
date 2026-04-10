const url = "https://wasoftwaredevelopment.com.au/wp-json/wc/v3/products/categories?per_page=100";
const key = "ck_fd481dff8d62db58c9e52aae923732fa09741ebe";
const secret = "cs_ca32a794b315e6d84740709623227036b0f64f1e";

const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

fetch(url, {
  headers: { Authorization: `Basic ${credentials}` }
})
.then(res => res.json())
.then(data => {
  const mapped = data.map(c => ({ id: c.id, name: c.name, slug: c.slug, parent: c.parent }));
  console.log(JSON.stringify(mapped, null, 2));
})
.catch(console.error);
