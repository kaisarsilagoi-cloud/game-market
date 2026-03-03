import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useAuthStore } from "../store/useAuthStore";
import ProductCard from "../components/ProductCard";
import { HeartIcon } from "lucide-react";

function FavoritesPage() {
  const { favorites, fetchFavorites } = useFavoriteStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      fetchFavorites();
    }
  }, [isAuthenticated, fetchFavorites]);

  const products = favorites.map((f) => f.Product || f).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-base-100 p-8 rounded-full">
            <HeartIcon className="size-16 text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold">Таңдаулы тауарлар жоқ</h2>
          <p className="text-base-content/70">
            Өзіңізге ұнаған тауарларды таңдаулыға қосыңыз
          </p>
          <Link to="/" className="btn btn-primary">
            Тауарларды қарау
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <HeartIcon className="size-8 text-error" />
        Таңдаулылар ({products.length})
      </h1>

      <div className="flex flex-wrap gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showEditDelete={false}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;