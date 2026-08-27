import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import useCartStore from "../store/useCartStore";
import Modal from "../components/Modal";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);


  function openRemoveModal(item) {
    setItemToRemove(item);
    setIsModalOpen(true);
  }


  function closeRemoveModal() {
    setIsModalOpen(false);
    setItemToRemove(null);
  }


  function confirmRemove() {
    if (itemToRemove) {
      removeItem(itemToRemove.id);
    }

    closeRemoveModal();
  }


  const orderTotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag
            size={36}
            className="text-slate-400"
          />
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-600">
          Add some products to get started.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-teal-800"
        >
          Browse Products
        </Link>

      </div>
    );
  }


  return (
    <div>

      <h1 className="font-display text-3xl font-bold tracking-tight">
        Your Cart
      </h1>


      <div className="mt-8 space-y-4">

        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center"
          >

            <div className="flex min-w-0 flex-1 items-center gap-4">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0">
                <h2 className="truncate font-display font-bold">
                  {item.title}
                </h2>

                <p className="mt-1 text-slate-500">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => decrement(item.id)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:border-teal-700 hover:text-teal-700"
              >
                <Minus size={18} />
              </button>

              <span className="w-8 text-center font-bold">
                {item.quantity}
              </span>

              <button
                onClick={() => increment(item.id)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition-colors hover:border-teal-700 hover:text-teal-700"
              >
                <Plus size={18} />
              </button>

            </div>


            <p className="font-bold text-slate-900 sm:w-28 sm:text-right">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => openRemoveModal(item)}
              aria-label={`Remove ${item.title}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 size={20} />
            </button>

          </div>
        ))}

      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">

        <span className="text-lg font-medium text-slate-700">
          Order Total
        </span>

        <span className="font-display text-2xl font-bold text-teal-700">
          ₹{orderTotal.toFixed(2)}
        </span>

      </div>


      <Modal
        isOpen={isModalOpen}
        onClose={closeRemoveModal}
        title="Remove item?"
      >
        <p className="leading-relaxed text-slate-600">
          Are you sure you want to remove{" "}
          <span className="font-medium text-slate-900">
            {itemToRemove?.title}
          </span>{" "}
          from your cart?
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={closeRemoveModal}
            className="rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={confirmRemove}
            className="rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700"
          >
            Remove
          </button>

        </div>
      </Modal>

    </div>
  );
}

export default CartPage;