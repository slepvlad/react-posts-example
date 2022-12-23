import {useMemo} from "react";

export const useSortedPost = (posts, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...posts]
                .sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);
}

export const usePosts = (posts, sort, query) =>{
    const sortedPosts = useSortedPost(posts, sort);
    return useMemo(() => {
        return sortedPosts.filter(item => item.title.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()));
    }, [query, sortedPosts]);
}