import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from 'react-router';

import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/shop/hooks/useProducts"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { currencyFormatter } from "@/lib/currency-form";

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();
  if (isLoading) return <CustomFullScreenLoading />
  const products = data?.products ?? []
  return (
    <>

      <div className="flex justify-between item-center">
        <AdminTitle title="Productos" subTitle="Aqui puedes ver y adminitrar tus productos" />
        <div className="flex justify-end mb-10 gap-4">  
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>
      <Table className="bg-white p-10 shadow-xs border-grey-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            products.map((product, i) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{i+1}</TableCell>
                <TableCell>
                  <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline">
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>{currencyFormatter(product.price)}</TableCell>
                <TableCell>{product.gender}</TableCell>
                <TableCell>{product.stock} stock</TableCell>
                <TableCell>{product.sizes.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/products/${product.id}`}>
                    <PencilIcon className="w-4 h-4 text-blue-500" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <CustomPagination  totalPages={data?.pages ?? 1}/>
    </>
  )
}
