import $api from '../http'

const getList = async (params) => {
  const { page, limit, filter, sort } = params

  const res = await $api.get(`/contacts?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}`)
  return res
}

const getById = async (contactId) => {
  const res = await $api.get(`/contacts/${contactId}`)
  return res
}

const add = async (newContact) => {
  const res = await $api.post('/contacts', newContact)
  return res
}

const update = async (contactId, updateData) => {
  const res = await $api.put(`/contacts/${contactId}`, updateData)
  return res
}

const updateFavorite = async (contactId, updateData) => {
  const res = await $api.patch(`/contacts/${contactId}/favorite`, updateData)
  return res
}

const remove = async (contactId) => {
  const res = await $api.delete(`/contacts/${contactId}`)
  return res
}

export default { getList, getById, add, update, updateFavorite, remove };
