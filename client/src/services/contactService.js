import $api from '../http'

const listAllContacts = async () => {
  const result = await $api.get('/contacts')
  return result
}

const paginateContacts = async (paginateParams) => {
  const { page, limit } = paginateParams

  const result = await $api.get(`/contacts?page=${page}&limit=${limit}`)
  return result
}

const addContact = async (newContact) => {
  const result = await $api.post('/contacts', newContact);
  return result
}

export default { listAllContacts, paginateContacts, addContact }
