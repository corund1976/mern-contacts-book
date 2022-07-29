import Contact from './models/contactSchema.js'

const get = async (query, userId) => {
  const { page = 1, limit = 30, filter = '', sort = '' } = query

  const queryCriteria =
    filter === 'favorite'
      ? { owner: userId, favorite: true }
      : { owner: userId }

  const select = 'id name phone email favorite createdAt updatedAt'

  const customLabels = {
    docs: 'contacts',
    totalDocs: 'totalContacts',
    page: 'currentPage',
  }

  const options = { select, sort, page, limit, customLabels }

  const result = await Contact.paginate(queryCriteria, options)
  return result
}

const getById = async (contactId, userId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId })
  return result
}

const add = async (newContact, userId) => {
  const { name, email, phone } = newContact
  const result = await Contact.create(
    { name, email, phone, owner: userId }
  )
  return result
}

const update = async (contactId, userId, update) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    update,
    { new: true }
  )
  return result
}

const updateStatus = async (contactId, userId, favoriteUpdate) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    favoriteUpdate,
    { new: true }
  )
  return result
}

const remove = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove(
    { _id: contactId, owner: userId }
  )
  return result
}

export default {
  get,
  getById,
  add,
  update,
  updateStatus,
  remove
}