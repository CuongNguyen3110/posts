
export const postsSelector = (state) => {
  const { posts, isLoading, page, searchString } = state
  return {
    posts,
    isLoading,
    pageNumber: page.pageNumber,
    pageSize: page.pageSize,
    searchString
  };
}