interface Params {
    recents?: boolean;
    user?: string;
    searchText?: string;
}

export function getQueryCollection({ recents, searchText, user }: Params) {
    const recentQuery = `recents=${recents ?? ""}`;
    const userQuery = `user=${user === "all" ? "" : user ?? ""}`;
    const textQuery = `text=${searchText ?? ""}`;

    return `&${recentQuery}&${userQuery}&${textQuery}`;
}
