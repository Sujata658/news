const makeNewsQuery = (query: string) => {
    switch (query) {
        case "everything":
            return "everything?q=bitcoin";
        case "top-headlines":
            return "top-headlines?country=us";
        default:
            return "top-headlines?country=us";
    }
}