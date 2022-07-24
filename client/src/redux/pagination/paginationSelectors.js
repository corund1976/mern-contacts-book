const getTotalContacts = (state) => state.pagination.totalContacts
const getTotalPages = (state) => state.pagination.totalPages
const getPageIndex = (state) => state.pagination.pageIndex
const getPagePrev = (state) => state.pagination.pagePrev
const getPageNext = (state) => state.pagination.pageNext
const getHasPagePrev = (state) => state.pagination.hasPagePrev
const getHasPageNext = (state) => state.pagination.hasPageNext

export default {
  getTotalContacts,
  getTotalPages,
  getPageIndex,
  getPagePrev,
  getPageNext,
  getHasPagePrev,
  getHasPageNext,
}