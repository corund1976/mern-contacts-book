import $api from '../http'

const listContacts = async () => {
  const result = await $api.get('/contacts')
  return result
}

const getContacts = async (params) => {
  const { page, limit, filter } = params

  const result = await $api.get(`/contacts?page=${page}&limit=${limit}&filter=${filter}`)
  return result
}

const addContact = async (newContact) => {
  const result = await $api.post('/contacts', newContact);
  return result
}

export default { listContacts, getContacts, addContact }
