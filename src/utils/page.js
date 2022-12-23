export const getPagesCount = (totalCount, limit) =>{
    return Math.ceil(totalCount/limit);
}

export const getPagesArray = (pagesCount) => {
    let pageArray = [];
    for (let i = 0; i < pagesCount; i++) {
        pageArray.push(i+1);
    }
    return pageArray;
}