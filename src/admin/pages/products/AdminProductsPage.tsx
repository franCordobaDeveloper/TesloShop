import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {

    const { data, isLoading, isError } = useProducts();

    if (isLoading) {
        return <CustomFullScreenLoading variant="dots" text="Buscando Productos" fullScreen={true} />
    }

    if (isError) {
        return <div>Error al cargar productos</div>;
    }

    const products = data?.products || [];
    const totalPages = data?.pages || 0;

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle
                    title="Productos"
                    subtitle="Aquí puedes ver y administrar tus productos"
                />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new">
                        <Button>
                            <PlusIcon />
                            Nuevo producto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img
                                        src={product.images?.[0] || "https://placehold.co/250x250"}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                </TableCell>
                                <Link to={`/admin/products/${product.id}`} className='hover:text-blue-600 hover:underline transition-colors'>
                                    <TableCell>{product.title}</TableCell>
                                </Link>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock} stock</TableCell>
                                <TableCell>{product.sizes.join(', ')}</TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/admin/products/${product.id}`}>
                                        <PencilIcon className='w-4 h-4 text-blue-900' />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-10">
                                No hay productos disponibles
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <CustomPagination totalPages={totalPages} />
        </>
    );
};