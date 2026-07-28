import api from "../api/axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
}

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {

    const response = await api.post(
        "auth/login/",
        data
    );

    return response.data;
};


export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
}

export const register = async (
    data: RegisterRequest
) => {

    const response = await api.post(
        "auth/register/",
        data
    );

    return response.data;
};