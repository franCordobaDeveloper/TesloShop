import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

interface Register {
    email: string;
    password: string;
    fullName: string;
}

export const registerAction = async ({ email, password, fullName }: Register) => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email: email,
            password: password,
            fullName: fullName
        });

        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}