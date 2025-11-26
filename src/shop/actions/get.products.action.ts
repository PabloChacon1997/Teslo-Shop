import { tesloApi } from "@/api/tesloApi"
import type { Product } from "@/interfaces/products.interface";

interface Options {
  limit?: number | string;
  offset?: number | string;

}

export const getProductsAction = async (options: Options): Promise<Product[]> => {
  const { limit, offset } = options;
  const { data } = await tesloApi.get<Product[]>('/products', {
    params: {
      limit,
      offset
    }
  });
  const productsWithImageUrls = data.map(product => ({
    ...product,
    images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
  }));
  return productsWithImageUrls;
}