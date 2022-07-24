const getTotalContacts = (state) => state.pagination.totalContacts
const getTotalPages = (state) => state.pagination.totalPages
const getPageIndex = (state) => state.pagination.pageIndex
const getPagePrev = (state) => state.pagination.pagePrev
const getPageNext = (state) => state.pagination.pageNext
const getHasPrevPage = (state) => state.pagination.hasPrevPage
const getHasNextPage = (state) => state.pagination.hasNextPage

export default {
  getTotalContacts,
  getTotalPages,
  getPageIndex,
  getPagePrev,
  getPageNext,
  getHasPrevPage,
  getHasNextPage,
}