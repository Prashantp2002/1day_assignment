import { useState } from "react";
import { useForm } from "react-hook-form";

import api from "../api/axiosInstance";

function CreateProductForm({ categories, onSuccess }) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  async function onSubmit(data) {
    try {
      setServerError("");

      const response = await api.post(
        "/products/add",
        {
          title: data.title,
          price: Number(data.price),
          category: data.category,
          description: data.description,
        }
      );

      onSuccess(response.data.id);

    } catch (error) {
      console.error(error);

      setServerError(
        "Could not create the product. Please try again."
      );
    }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>

        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          placeholder="Product title"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}

      </div>
      <div>

        <label className="mb-2 block font-medium">
          Price
        </label>

        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            validate: (value) =>
              value > 0 || "Price must be positive",
          })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          placeholder="Product price"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message}
          </p>
        )}

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          {...register("category", {
            required: "Category is required",
          })}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
        >
          <option value="">
            Select category
          </option>

          {categories.map((category) => (
            <option
              key={category.slug || category}
              value={category.slug || category}
            >
              {category.name || category}
            </option>
          ))}

        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category.message}
          </p>
        )}

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows="4"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message:
                "Description must be at least 10 characters",
            },
          })}
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          placeholder="Product description"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}

      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}


      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Product"}
      </button>

    </form>
  );
}

export default CreateProductForm;