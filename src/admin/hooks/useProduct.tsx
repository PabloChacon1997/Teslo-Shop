import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/products.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // TOD: manejar la mutacion
  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      console.log(product);
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] });
      // Actualizar query data
      queryClient.setQueryData(['products', {id: product.id}], product);
    }
  });

  // TODO: Remover en el futuro
  // const handleSubmitForm = async (productLike: Partial<Product>)=> {
  //   console.log('onSubmit', productLike);
  // }
  return {
    ...query,
    mutation,
  }
}
