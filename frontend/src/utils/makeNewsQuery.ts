const makeNewsQuery = (query: string, params: { country?: string; category?: string; page?: number } = {}) => {
    const { country, category, page } = params;
    let url = '';

    switch (query) {
        case "everything":
            url = "/everything?q=bitcoin";
            break;
        case "top-headlines":
            url = "/top-headlines";
            const queryParams = [];
            if (country) {
                queryParams.push(`country=${country}`);
            } else {
                queryParams.push(`country=us`); 
            }
            if (category) {
                queryParams.push(`category=${category}`);
            }
            if (page) {
                queryParams.push(`page=${page}`);
            }
            if (queryParams.length > 0) {
                url += `?${queryParams.join('&')}`;
            }
            break;
        default:
            url = "/top-headlines?country=us";
    }

    return url;
}

export default makeNewsQuery;
