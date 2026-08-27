import { useState } from "react";
import Modal from "../components/Modal";

function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-[150vh]">

      <h1 className="font-display text-3xl font-bold tracking-tight">
        Products
      </h1>

      <p className="mt-2 text-slate-600">
        This page is being used to test the modal.
      </p>

      <button
        onClick={openModal}
        className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Open Modal
      </button>

      <div className="mt-10 space-y-6">

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold">
            Test Content
          </h2>

          <p className="mt-2 leading-relaxed text-slate-600">
            Scroll down and open the modal to test fixed positioning.
          </p>
        </div>

        <div className="h-96 rounded-xl border border-slate-200 bg-white p-6">
          More content
        </div>

        <div className="h-96 rounded-xl border border-slate-200 bg-white p-6">
          More content
        </div>

      </div>


      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Test Modal"
      >
        <p className="leading-relaxed text-slate-600">
          This is the content inside the modal.
        </p>

        <button
          onClick={closeModal}
          className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
        >
          Close Modal
        </button>
      </Modal>

    </div>
  );
}

export default ProductsPage;