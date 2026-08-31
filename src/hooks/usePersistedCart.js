import { useEffect, useState } from "react";
import useCartStore from "../store/useCartStore";
import { useLocalStorage } from "./useLocalStorage";

export function usePersistedCart() {
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);

  const [savedItems, setSavedItems] = useLocalStorage(
    "cart-items",
    []
  );

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(savedItems);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setSavedItems(items);
  }, [items, hydrated, setSavedItems]);
}