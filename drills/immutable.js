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

const createState = () => ({
  user: {
    name: "Asha",
    address: {
      city: "Pune",
      pin: "411001",
    },
  },
  cart: {
    items: [
      {
        id: 1,
        title: "Phone",
        price: 500,
        qty: 1,
      },
      {
        id: 2,
        title: "Chair",
        price: 150,
        qty: 3,
      },
    ],
  },
  selectedTags: ["new"],
});

const addItem = (state, item) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      items: [...state.cart.items, item],
    },
  };
};

const removeItem = (state, id) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      items: state.cart.items.filter((item) => item.id !== id),
    },
  };
};

const incrementQty = (state, id) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      items: state.cart.items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      ),
    },
  };
};

const decrementQty = (state, id) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      items: state.cart.items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty - 1),
            }
          : item
      ),
    },
  };
};

const setCity = (state, city) => {
  return {
    ...state,
    user: {
      ...state.user,
      address: {
        ...state.user.address,
        city,
      },
    },
  };
};

const toggleTag = (state, tag) => {
  const selectedTags = state.selectedTags.includes(tag)
    ? state.selectedTags.filter((item) => item !== tag)
    : [...state.selectedTags, tag];

  return {
    ...state,
    selectedTags,
  };
};

const discountAll = (state, percent) => {
  return {
    ...state,
    cart: {
      ...state.cart,
      items: state.cart.items.map((item) => ({
        ...item,
        price: item.price * (1 - percent / 100),
      })),
    },
  };
};

const moveItem = (state, from, to) => {
  const items = [...state.cart.items];
  const [movedItem] = items.splice(from, 1);

  items.splice(to, 0, movedItem);

  return {
    ...state,
    cart: {
      ...state.cart,
      items,
    },
  };
};

const originalState = createState();

const addedState = addItem(originalState, {
  id: 3,
  title: "Lamp",
  price: 100,
  qty: 1,
});

check(
  "addItem changed",
  addedState.cart.items.length,
  3
);

check(
  "addItem no mutation",
  originalState.cart.items.length,
  2
);

const removedState = removeItem(originalState, 1);

check(
  "removeItem changed",
  removedState.cart.items.map((item) => item.id),
  [2]
);

check(
  "removeItem no mutation",
  originalState.cart.items.map((item) => item.id),
  [1, 2]
);

const incrementedState = incrementQty(originalState, 1);

check(
  "incrementQty changed",
  incrementedState.cart.items[0].qty,
  2
);

check(
  "incrementQty no mutation",
  originalState.cart.items[0].qty,
  1
);

const decrementedState = decrementQty(originalState, 2);

check(
  "decrementQty changed",
  decrementedState.cart.items[1].qty,
  2
);

check(
  "decrementQty no mutation",
  originalState.cart.items[1].qty,
  3
);

const minimumQtyState = decrementQty(
  createState(),
  1
);

const minimumQtyStateAgain = decrementQty(
  minimumQtyState,
  1
);

check(
  "decrementQty minimum",
  minimumQtyStateAgain.cart.items[0].qty,
  1
);

const cityState = setCity(originalState, "Mumbai");

check(
  "setCity changed",
  cityState.user.address.city,
  "Mumbai"
);

check(
  "setCity no mutation",
  originalState.user.address.city,
  "Pune"
);

const addedTagState = toggleTag(originalState, "sale");

check(
  "toggleTag add",
  addedTagState.selectedTags,
  ["new", "sale"]
);

check(
  "toggleTag add no mutation",
  originalState.selectedTags,
  ["new"]
);

const removedTagState = toggleTag(originalState, "new");

check(
  "toggleTag remove",
  removedTagState.selectedTags,
  []
);

check(
  "toggleTag remove no mutation",
  originalState.selectedTags,
  ["new"]
);

const discountedState = discountAll(originalState, 10);

check(
  "discountAll changed",
  discountedState.cart.items.map((item) => item.price),
  [450, 135]
);

check(
  "discountAll no mutation",
  originalState.cart.items.map((item) => item.price),
  [500, 150]
);

const movedState = moveItem(originalState, 0, 1);

check(
  "moveItem changed",
  movedState.cart.items.map((item) => item.id),
  [2, 1]
);

check(
  "moveItem no mutation",
  originalState.cart.items.map((item) => item.id),
  [1, 2]
);

console.log(
  `\n${results.filter(Boolean).length}/${results.length} passing`
);