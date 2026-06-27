import React, { createContext, useContext, useState, useCallback } from "react";
import CartDrawer from "../components/CartDrawer";
import ProductDescriptionModal from "../components/ProductDescriptionModal";

const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  const cartCount = cartItems.reduce((sum, i) => sum + (i.qty ?? 1), 0);
  const savedCount = savedItems.length;

  const onAddToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const onRemoveItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const onUpdateQty = useCallback((id, qty) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const onShowProductModal = useCallback((product) => {
    setModalProduct(product);
  }, []);

  const toggleSaved = useCallback((product) => {
    setSavedItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const isSaved = useCallback((id) => {
    return savedItems.some((i) => i.id === id);
  }, [savedItems]);

  const value = {
    cartItems,
    cartCount,
    cartOpen,
    setCartOpen,
    onAddToCart,
    onRemoveItem,
    onUpdateQty,
    modalProduct,
    setModalProduct,
    onShowProductModal,
    savedItems,
    savedCount,
    toggleSaved,
    isSaved,
  };

  return (
    <CartContext.Provider value={value}>
      {children}

      <CartDrawer
        cartItems={cartItems}
        onRemoveItem={onRemoveItem}
        onUpdateQty={onUpdateQty}
        onCheckout={() => setCartOpen(false)}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <ProductDescriptionModal
        product={modalProduct}
        onAddToCart={onAddToCart}
        onClose={() => setModalProduct(null)}
      />
    </CartContext.Provider>
  );
}
