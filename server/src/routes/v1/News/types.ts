export interface NewsRequestBody {
    q?: string;
    sources?: string;
    category?: string;
    language?: string;
    country?: string;
    domains?: string;
    from?: string;
    to?: string;
    sortBy?: string;
    page?: number;
}