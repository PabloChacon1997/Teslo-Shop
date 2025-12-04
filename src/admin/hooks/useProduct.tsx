import { useQuery } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/products.interface";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // TOD: manejar la mutacion

  // TODO: Remover en el futuro
  const handleSubmitForm = async (productLike: Partial<Product>)=> {
    console.log('onSubmit', productLike);
  }
  return {
    ...query,
    handleSubmitForm
  }
}
