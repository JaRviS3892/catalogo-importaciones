// components/ProductGridStep1.jsx
import React from "react";
import "./../App.css";

const fallback = "/images/fallback-300.jpg"; // opcional: crea una imagen genérica en /public/images

const products = [
    {
        id: 1,
        title: "Auriculares Bluetooth",
        brand: "Sony",
        price: "$45.000",
        rating: 4.5,
        reviews: 120,
        stock: "En stock",
        tags: ["Tecnología", "Audio"],
        image: "/images/auriculares.jpg",
    },
    {
        id: 2,
        title: "Smartwatch Deportivo",
        brand: "Huawei",
        price: "$60.000",
        rating: 4.2,
        reviews: 90,
        stock: "Pocas unidades",
        tags: ["Tecnología", "Relojes"],
        image: "/images/smartwatch.jpg",
    },
    {
        id: 3,
        title: "Cámara Digital",
        brand: "Canon",
        price: "$150.000",
        rating: 4.8,
        reviews: 45,
        stock: "En stock",
        tags: ["Fotografía"],
        image: "/images/camara.jpg",
    },
    {
        id: 4,
        title: "Teclado Mecánico",
        brand: "Logitech",
        price: "$35.000",
        rating: 4.6,
        reviews: 78,
        stock: "En stock",
        tags: ["Gaming", "PC"],
        image: "/images/teclado.jpg",
    },
];

export default function ProductGridStep1() {
    const onImgError = (e) => {
        if (fallback) e.currentTarget.src = fallback;
        e.currentTarget.onerror = null;
    };

    return (
        <section className="Products" id="productos">
            <h2>Catálogo de Productos</h2>
            <p className="Products-note">Explora nuestra selección de importaciones destacadas</p>

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
                                <span className="Card-price">{p.price}</span>
                            </div>
                            <p className="Card-brand">{p.brand}</p>
                            <div className="Card-meta">
                                <span className="Card-rating">⭐ {p.rating}</span>
                                <span className="Card-reviews">({p.reviews} reseñas)</span>
                                <span className="Card-stock">{p.stock}</span>
                            </div>
                            <div className="Card-tags">
                                {p.tags.map((t, i) => (
                                    <span className="Tag" key={i}>
                    {t}
                  </span>
                                ))}
                            </div>
                            <button className="Card-btn" disabled>
                                Próximamente
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
