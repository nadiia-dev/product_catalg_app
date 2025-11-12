"use client";
import { useState } from "react";
import "./add-product-form.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { useCreateProductMutation } from "@/store/slices/products";
import { validationSchema } from "./validation";
import Spinner from "../spinner/spinner";

const AddProductForm = ({ closeModal }: { closeModal: () => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  if (isLoading) return <Spinner />;

  const initialValues = {
    title: "",
    description: "",
    category: "",
    price: "",
    availability: true,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        if (!imageFile) {
          alert("Please select an image");
          return;
        }

        try {
          await createProduct({
            title: values.title,
            description: values.description,
            category: values.category,
            price: Number(values.price),
            availability: values.availability,
            image: imageFile,
          }).unwrap();

          alert("Product created!");
          closeModal();
          resetForm();
          setImageFile(null);
        } catch (error) {
          console.error("Failed to create product:", error);
        }
      }}
    >
      {() => (
        <Form className="add-product-form">
          <h2>Add Product</h2>

          <label>Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className="error" />

          <label>Description</label>
          <Field as="textarea" name="description" />
          <ErrorMessage name="description" component="div" className="error" />

          <label>Category</label>
          <Field type="text" name="category" />
          <ErrorMessage name="category" component="div" className="error" />

          <label>Price</label>
          <Field type="number" name="price" />
          <ErrorMessage name="price" component="div" className="error" />

          <label>Availability</label>
          <Field as="select" name="availability">
            <option value="true">In Stock</option>
            <option value="false">Sold Out</option>
          </Field>

          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0] || null;
              setImageFile(file);
            }}
          />

          {imageFile && (
            <div className="preview">Selected: {imageFile.name}</div>
          )}

          <button type="submit">Add Product</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProductForm;
