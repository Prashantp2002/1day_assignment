import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import api from "../api/axiosInstance";
import Modal from "../components/Modal";
import CreateProductForm from "../components/CreateProductForm";
import { useToggle } from "../hooks/useToggle";

function AdminPage() {
  const {
    value: isModalOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle();

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  async function fetchCategories() {
    try {
      const response = await api.get("/products/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleOpenModal() {
    setSuccessMessage("");
    openModal();
  }

  function handleSuccess(id) {
    closeModal();

    setSuccessMessage(
      `Product created successfully. Product ID: ${id}`
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Admin
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your products.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-teal-800"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {successMessage && (
        <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-4 text-teal-700">
          {successMessage}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create Product"
      >
        <CreateProductForm
          categories={categories}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default AdminPage;