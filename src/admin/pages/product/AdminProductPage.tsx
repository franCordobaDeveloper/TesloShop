import { Navigate, useNavigate, useParams } from "react-router";
import { useProduct } from "@/admin/hooks/useProduct";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { ProductForm } from "./ui/ProductForm";
import type { Product } from "@/interfaces/product.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, mutation } = useProduct(id ?? "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const isPending = mutation.isPending;

  const handleSubmit = async (
    productLike: Partial<Product> & { files?: File[] }
  ) => {
    try {
      const data = await mutation.mutateAsync(productLike);

      if (productLike.id === "new") {
        toast.success("Producto Creado correctamente", {
          position: "top-right",
        });
      } else {
        toast.success("Producto Actualizado correctamente", {
          position: "top-right",
        });
      }

      navigate(`/admin/products/${data.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el producto");
    }
  };

  // Validaciones y redirecciones
  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return (
      <CustomFullScreenLoading
        variant="dots"
        text="Cargando..."
        fullScreen={true}
      />
    );
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};
