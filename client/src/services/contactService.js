import { $api } from '../http';

const listContacts = async () => {
  const result = await $api.get('/contacts')
  return result
}

const addContact = async (newContact) => {
  const result = await $api.post('/contacts', newContact)
  return result
}

const contactService = {
  listContacts, addContact
}

export default contactService
