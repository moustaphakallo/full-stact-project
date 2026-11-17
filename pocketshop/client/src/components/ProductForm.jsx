import React from "react";
import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
};

export default function ProductForm({ product, initialValues, onSubmit, submitLabel = "Enregistrer" }) {
  const initial = product ?? initialValues ?? emptyProduct;
  const [values, setValues] = useState(initial);

  useEffect(() => {
    setValues(initial);
  }, [product]);

  const setField = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit?.({
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    });
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <Input label="Nom" name="name" value={values.name ?? ""} onChange={setField("name")} required />
      <Input label="Description" name="description" value={values.description ?? ""} onChange={setField("description")} />
      <Input label="Prix" name="price" type="number" min="0" value={values.price ?? ""} onChange={setField("price")} required />
      <Input label="Stock" name="stock" type="number" min="0" value={values.stock ?? ""} onChange={setField("stock")} required />
      <Input label="Image URL" name="imageUrl" value={values.imageUrl ?? ""} onChange={setField("imageUrl")} />
      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}