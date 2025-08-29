// src/components/ProductGridStep1.jsx
import React from "react";
import "../App.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import products from "../data/products";

// Imagen de respaldo, en caso de que una foto no cargue
const fallback = "/images/fallback-300.jpg";

const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
});

export default function ProductGridStep1() {
    const { addItem } = useCart();

    // Maneja errores de carga en las imágenes
    const onImgError = (e) => {
        if (fallback) e.currentTarget.src = fallback;
        e.currentTarget.onerror = null;
    };

    return (
        <section className="Products" id="productos">
            <h2>Catálogo de Productos</h2>
            <p className="Products-note">
                Explora nuestra selección de importaciones destacadas
            </p>

            <div className="ProductGrid">
                {products.map((p) => (
                    <div className="Card" key={p.id}>
                        <div className="Card-imageWrap">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="Card-image"
                                onError={onImgError}
                                loading="lazy"
                            />
                        </div>
                        <div className="Card-body">
                            <div className="Card-head">
                                <h3 className="Card-title">{p.title}</h3>
                                <span className="Card-price">
                  <span className="sr-only">Precio: </span>
                                    {currencyFormatter.format(p.price)}
                </span>
                            </div>
                            <p className="Card-brand">{p.brand}</p>
                            <div className="Card-meta">
                <span
                    className="Card-rating"
                    aria-label={`Calificación ${p.rating} de 5`}
                >
                  ⭐ {p.rating}
                </span>
                                <span
                                    className="Card-reviews"
                                    aria-label={`${p.reviews} reseñas`}
                                >
                  ({p.reviews} reseñas)
                </span>
                                <span className="Card-stock">{p.stock}</span>
                            </div>
                            <ul className="Card-tags">
                                {Array.from(new Set(p.tags)).map((t) => (
                                    <li className="Tag" key={t}>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="Card-btn"
                                disabled={p.stock.toLowerCase().includes("sin stock")}
                                onClick={() => {
                                    addItem(p);
                                    toast.success("Producto agregado al carrito");
                                }}
                            >
                                {p.stock.toLowerCase().includes("sin stock")
                                    ? "Sin stock"
                                    : "Agregar al carrito"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
