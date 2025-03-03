export interface Response<T> {
    status: string;
    message: string;
    data: T;
}

export const environment = {
    production: false,
    apiBaseUrl: "http://localhost:8080"
}