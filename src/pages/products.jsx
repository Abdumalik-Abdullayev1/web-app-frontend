import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useAddBasket from "../hooks/useAddBasket";
import Card from "../components/card";
import { IoMdSearch } from "react-icons/io";

const Products = () => {
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { products, loading, error } = useProducts({
    page: 1,
    pageSize: 12,
    userId: tgUser?.id,
    categoryId,
  });

  const { counts, updateQuantity } = useAddBasket(tgUser?.id);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!searchTerm.trim()) return products;

    return products.filter((p) => {
      const name = p?.Name || p?.name || p?.Title || p?.ProductName || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [products, searchTerm]);

  return (
    <div className="py-24 px-2 mb-16 xl:px-10">
      {/* Search */}
      <div className="flex items-center md:max-w-lg border justify-between p-2 rounded-xl px-5 mb-6">
        <input
          type="text"
          placeholder="Qidiruv..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-lg w-full outline-none px-3 bg-transparent text-gray-800 placeholder-gray-500 focus:border-[rgb(22,113,98)] focus:ring-0 dark:text-white"
        />
        <IoMdSearch className="text-2xl" />
      </div>

      <h2 className="text-2xl font-bold mb-5">Mahsulotlar</h2>

      {error && <p>Xato: {error}</p>}
      {loading && <p>Yuklanmoqda...</p>}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-center font-semibold text-base my-20">
          Bu kategoriyada mahsulot topilmadi!
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((p) => (
          <Card
            key={p.Id}
            product={p}
            productInCart={counts[p.Id]}
            onUpdate={updateQuantity}
            loading={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
