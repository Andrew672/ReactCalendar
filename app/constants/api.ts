export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined. Please check your .env.local.local file.');
}
