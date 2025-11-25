import { CustomPagination } from "@/components/custom/CustomPagination"
import { products } from "@/mocks/products.mock"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePages = () => {
  const { data } = useProducts();
  console.log(data);
  return (
    <>
      <CustomJumbotron title="Todos los productos"/>
      <ProductsGrid products={products} />
      <CustomPagination totalPages={7}/>
    </>
  )
}
