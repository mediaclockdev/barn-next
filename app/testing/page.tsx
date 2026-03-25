// "use client";
// import React, { useEffect, useState } from "react";

// const Testing = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   return (
//     <div>
//       {products.map((p) => (
//         <div key={p.id}>
//           <h2>{p.name}</h2>
//           <p>${(Number(p?.prices?.price) || 0) / 100}</p>
//           <button>Add to Cart</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Testing;

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
