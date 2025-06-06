export default interface APIResponse {
    success?: boolean;
    status: number;
    data: unknown | null;
    error?: Error | null;
    message: string;
}