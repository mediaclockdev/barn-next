const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const url = `${process.env.WC_API_URL.replace(/\/$/, "")}/custom/v4/products-by-ids?ids=444`;
const credentials = Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString("base64");

fetch(url, {
  headers: {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  }
}).then(r => r.json()).then(data => {
  console.log(JSON.stringify(data, null, 2));
}).catch(e => console.error(e));
