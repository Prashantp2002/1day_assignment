const results = [];

function check(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);

  results.push(pass);

  console.log(
    pass
      ? `PASS  ${name}`
      : `FAIL  ${name}\n      got      ${JSON.stringify(actual)}\n      expected ${JSON.stringify(expected)}`
  );
}

const products = [
  {
    id: 1,
    title: "Phone",
    price: 500,
    rating: 4.5,
    category: "tech",
    tags: ["new", "sale"],
    discountPercentage: 10,
  },
  {
    id: 2,
    title: "Laptop",
    price: 900,
    rating: 4.8,
    category: "tech",
    tags: ["sale"],
    discountPercentage: 15,
  },
  {
    id: 3,
    title: "Chair",
    price: 150,
    rating: 4.5,
    category: "home",
    tags: [],
    discountPercentage: 20,
  },
  {
    id: 4,
    title: "Lamp",
    price: 150,
    rating: 3.9,
    category: "home",
    tags: ["new"],
    discountPercentage: 5,
  },
];

const getDiscountedPrice = (product) => {
  return product.price - (
    product.price * product.discountPercentage
  ) / 100;
};

const byPriceAsc = (list) => {
  return [...list].sort((a, b) => a.price - b.price);
};

const byPriceDesc = (list) => {
  return [...list].sort((a, b) => b.price - a.price);
};

const byTitle = (list) => {
  return [...list].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
};

const byRatingThenPrice = (list) => {
  return [...list].sort(
    (a, b) =>
      b.rating - a.rating ||
      a.price - b.price
  );
};

const byDiscountedPrice = (list) => {
  return [...list].sort(
    (a, b) =>
      getDiscountedPrice(a) -
      getDiscountedPrice(b)
  );
};

const makeComparator = (key, direction = "asc") => {
  const multiplier = direction === "asc" ? 1 : -1;

  return (a, b) => {
    const left = a[key];
    const right = b[key];

    if (typeof left === "string") {
      return left.localeCompare(right) * multiplier;
    }

    return (left - right) * multiplier;
  };
};

check(
  "default sort surprise",
  [10, 9, 100, 1].sort(),
  [1, 10, 100, 9]
);

const originalPriceProducts = [...products];

check(
  "byPriceAsc",
  byPriceAsc(products).map((product) => product.price),
  [150, 150, 500, 900]
);

check(
  "byPriceAsc no mutation",
  products.map((product) => product.id),
  originalPriceProducts.map((product) => product.id)
);

check(
  "byPriceDesc",
  byPriceDesc(products).map((product) => product.price),
  [900, 500, 150, 150]
);

check(
  "byPriceDesc no mutation",
  products.map((product) => product.id),
  originalPriceProducts.map((product) => product.id)
);

const mixedCaseProducts = [
  { title: "banana" },
  { title: "Apple" },
  { title: "cherry" },
  { title: "Apricot" },
];

check(
  "byTitle",
  byTitle(mixedCaseProducts).map((product) => product.title),
  ["Apple", "Apricot", "banana", "cherry"]
);

check(
  "byRatingThenPrice",
  byRatingThenPrice(products).map((product) => product.title),
  ["Laptop", "Chair", "Phone", "Lamp"]
);

check(
  "byDiscountedPrice",
  byDiscountedPrice(products).map(
    (product) => product.title
  ),
  ["Chair", "Lamp", "Phone", "Laptop"]
);

const originalForDiscountSort = products.map(
  (product) => product.id
);

byDiscountedPrice(products);

check(
  "byDiscountedPrice no mutation",
  products.map((product) => product.id),
  originalForDiscountSort
);

check(
  "makeComparator string asc",
  [...products]
    .sort(makeComparator("title", "asc"))
    .map((product) => product.title),
  ["Chair", "Lamp", "Laptop", "Phone"]
);

check(
  "makeComparator string desc",
  [...products]
    .sort(makeComparator("title", "desc"))
    .map((product) => product.title),
  ["Phone", "Laptop", "Lamp", "Chair"]
);

check(
  "makeComparator number asc",
  [...products]
    .sort(makeComparator("price", "asc"))
    .map((product) => product.price),
  [150, 150, 500, 900]
);

check(
  "makeComparator number desc",
  [...products]
    .sort(makeComparator("price", "desc"))
    .map((product) => product.price),
  [900, 500, 150, 150]
);

const booleanComparatorInput = [
  { price: 3 },
  { price: 1 },
  { price: 2 },
];

const booleanComparatorResult = [
  ...booleanComparatorInput,
].sort((a, b) => a.price > b.price);

check(
  "boolean comparator is wrong",
  booleanComparatorResult.map((item) => item.price),
  [3, 1, 2]
);

console.log(
  `\n${results.filter(Boolean).length}/${results.length} passing`
);