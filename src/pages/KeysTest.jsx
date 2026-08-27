import { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Headphones",
    price: 5000,
  },
  {
    id: 4,
    name: "Keyboard",
    price: 3000,
  },
  {
    id: 5,
    name: "Mouse",
    price: 1000,
  },
];

function ProductRow({ product }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">

      <div>
        <h2 className="font-display font-bold">
          {product.name}
        </h2>

        <p className="text-slate-500">
          ₹{product.price}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <span className="font-bold">
          Quantity: {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-lg bg-teal-700 px-4 py-2 font-bold text-white hover:bg-teal-800"
        >
          +
        </button>

      </div>

    </div>
  );
}


function KeysTest() {

  const [products, setProducts] = useState(initialProducts);

  function sortProducts() {
    const sortedProducts = [...products].sort(
      (a, b) => a.price - b.price
    );

    setProducts(sortedProducts);
  }

  return (
    <div>

      <h1 className="font-display text-3xl font-bold">
        Why Keys Matter
      </h1>

      <p className="mt-2 text-slate-600">
        Increase a quantity and then sort the products.
      </p>

      <button
        onClick={sortProducts}
        className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
      >
        Sort by Price
      </button>


      <div className="mt-6 space-y-3">

        {products.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}

export default KeysTest;