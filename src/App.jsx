import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAdmin from "./components/RequireAdmin";

function App() {
  return (
    <Routes>


      <Route element={<RootLayout />}>

        <Route path="/" element={<Navigate to="/products" replace />}/>
        <Route path="/products" element={<ProductsPage />}/>

        <Route path="/products/:id" element={<ProductDetailPage />}/>

        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          }/>
        <Route path="*" element={<NotFoundPage />}/>

      </Route>

    </Routes>
  );
}

export default App;