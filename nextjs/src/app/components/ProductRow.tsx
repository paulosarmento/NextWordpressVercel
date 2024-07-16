import { Movies } from "../types/movie";
import { MovieCard } from "./MovieCard";

type ProductRowProps = {
  sectionTitle: string;
  products: Products;
};

export function ProductRow({ sectionTitle, products }: ProductRowProps) {
  return (
    <div className="flex-col space-y-2">
      <div className="flex">
        <h2 className="my-4 inline-flex items-center text-2xl font-bold">
          {sectionTitle}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
        {products.map((product) => (
          <MovieCard key={product.id} movie={product} />
        ))}
      </div>
    </div>
  );
}