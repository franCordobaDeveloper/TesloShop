import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Toaster } from 'sonner';

import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { checkAuthStatus } = useAuthStore();

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            await checkAuthStatus();
            // Agrega delay aquí
            await new Promise(resolve => setTimeout(resolve, 2000));
        },
        retry: false,
        refetchInterval: false, // Desactiva refetch automático
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <CustomFullScreenLoading variant="dots" text="Procesando..." fullScreen={true} />

    return children;
}

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};