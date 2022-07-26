import $api from '../http'

const getContacts = async (params) => {
  const { page, limit, filter, sort } = params

  const result = await $api.get(`/contacts?page=${page}&limit=${limit}&filter=${filter}&sort=${sort}`)
  return result
}

const addContact = async (newContact) => {
  const result = await $api.post('/contacts', newContact);
  return result
}

export default { getContacts, addContact };
