import React from "react";
import { useEffect, useState } from "react";

import {
  getAdminProducts,
  createProduct,
  hideProduct,
  showProduct,
} from "../api/productApi";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  const load = async () => {
    const data = await getAdminProducts();

    setProducts(data.products);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await createProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setForm({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      stock: "",
    });

    load();
  };

  return (
    <div>
      <h1>Produits Admin</h1>

      <form className="form-card" onSubmit={submit}>
        <input
          placeholder="Nom"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            setForm({
              ...form,
              imageUrl: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value,
            })
          }
        />

        <button className="btn">Ajouter</button>
      </form>

      <div className="admin-list">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <h3>{product.name}</h3>

            <p>Prix : {product.price}</p>

            <p>Stock : {product.stock}</p>

            <p>{product.isActive ? "Actif" : "Masqué"}</p>

            {product.isActive ? (
              <button
                onClick={async () => {
                  await hideProduct(product._id);

                  load();
                }}
              >
                Masquer
              </button>
            ) : (
              <button
                onClick={async () => {
                  await showProduct(product._id);

                  load();
                }}
              >
                Afficher
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
