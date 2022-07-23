import Contact from './models/contactSchema.js'
import ContactDto from '../dtos/contactDto.js'

const list = async (query, userId) => {
  const { page = 1, limit = 20, favorite } = query

  const queryCriteria =
    favorite
      ? { owner: userId, favorite }
      : { owner: userId }

  const result = await Contact.paginate(
    queryCriteria,
    { page, limit }
  )

  const contacts = result.docs.map(contact => {
    const contactDto = new ContactDto(contact)
    return { ...contactDto }
  })

  return contacts
}

const getById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, owner: userId })
}

const add = async (newContact, userId) => {
  const { name, email, phone } = newContact
  const result = await Contact.create(
    { name, email, phone, owner: userId }
  )
  return result
}

const update = async (contactId, userId, update) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    update,
    { new: true }
  )
}

const updateStatus = async (contactId, userId, favoriteUpdate) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    favoriteUpdate,
    { new: true }
  )
}

const remove = async (contactId, userId) => {
  return await Contact.findOneAndRemove(
    { _id: contactId, owner: userId }
  )
}

export default {
  list,
  getById,
  add,
  update,
  updateStatus,
  remove
}