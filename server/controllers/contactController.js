import contactService from '../service/contactService.js'

const get = async (req, res, next) => {
  // ничего не получает
  // вызывает функцию listContacts
  // возвращает массив всех контактов в json - формате со статусом 200
  const { query, user } = req

  try {
    const response = await contactService.get(query, user.id)

    const { contacts, totalContacts, totalPages, currentPage, prevPage, nextPage, hasPrevPage, hasNextPage } = response

    res
      .append('X-Total-Count', totalContacts)
      .append('Access-Control-Expose-Headers', 'X-Total-Count')

    if (totalPages && currentPage) {
      res
        .append('X-Total-Pages', totalPages)
        .append('Access-Control-Expose-Headers', 'X-Total-Pages')
        .append('X-Page-Index', currentPage)
        .append('Access-Control-Expose-Headers', 'X-Page-Index')
        .append('X-Page-Prev', prevPage)
        .append('Access-Control-Expose-Headers', 'X-Page-Prev')
        .append('X-Page-Next', nextPage)
        .append('Access-Control-Expose-Headers', 'X-Page-Next')
        .append('X-Has-Page-Prev', hasPrevPage)
        .append('Access-Control-Expose-Headers', 'X-Has-Page-Prev')
        .append('X-Has-Page-Next', hasNextPage)
        .append('Access-Control-Expose-Headers', 'X-Has-Page-Next')
    }

    return res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Get List contacts successful',
        contacts
      })

  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  // Не получает body, но Получает параметр id
  // вызывает функцию getById
  // если такой id есть, возвращает объект контакта в json - формате со статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
  try {
    const contactById = await contactService.getById(req.params.id, req.user.id)

    if (!contactById) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found contact id: ${req.params.id}`,
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: `Get Contact by Id: ${req.params.id} successful`,
        contactById,
      })
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  // Получает body в формате { name, email, phone } (все поля обязательны)
  // Если в body нет каких - то обязательных полей, возвращает json с ключом { "message": "missing required name field" } и статусом 400
  // Вызывает функцию addContact(body) для сохранения контакта 
  // По результату работы функции возвращает объект с добавленным id { id, name, email, phone } и статусом 201
  try {
    const contact = await contactService.add(req.body, req.user.id)

    res
      .status(201)
      .json({
        status: 'Created',
        code: 201,
        message: 'Add contact successful',
        contact,
      })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  // Получает параметр id
  // Получает body в json-формате c обновлением любых полей name, email и phone
  // Если body нет, возвращает json с ключом { "message": "missing fields" } и статусом 400
  // Если с body все хорошо, вызывает функцию updateContact(contactId, body)(напиши ее) для обновления контакта в файле contacts.json
  // По результату работы функции возвращает обновленный объект контакта и статусом 200. 
  // В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
  if (Object.keys(req.body) == 0) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing fields',
      })
  }

  try {
    const updatedContact = await contactService.update(req.params.id, req.user.id, req.body)

    if (!updatedContact) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Contact id: ${req.params.id} not found`,
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Update contact successful',
        updatedContact
      })
  } catch (e) {
    next(e)
  }
}

const updateFavorite = async (req, res, next) => {
  // Получает параметр contactId
  // Получает body в json-формате c обновлением поля favorite
  // Если body нет, возвращает json с ключом { "message": "missing field favorite" } и статусом 400
  // Если с body все хорошо, вызывает функцию updateStatusContact(contactId, body)(напиши ее) для обновления контакта в базе
  // По результату работы функции возвращает обновленный объект контакта и статусом 200. 
  // В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
  if (!('favorite' in req.body)) {
    // if (Object.keys(body) != 'favorite') {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: 'Missing field *favorite* '
      })
  }

  try {
    const contactUpdStatus = await contactService.updateStatus(req.params.id, req.user.id, req.body)

    if (!contactUpdStatus) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Contact id ${req.params.id} not found`
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: 'Update ~Favorite~ contact successful',
        contactUpdStatus
      })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  // Не получает body, но Получает параметр id
  // вызывает функцию removeContact 
  // если такой id есть, возвращает json формата { "message": "contact deleted" } и статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
  try {
    const result = await contactService.remove(req.params.id, req.user.id)

    if (!result) {
      return res
        .status(404)
        .json({
          status: 'Not found',
          code: 404,
          message: `Not found contact id: ${req.params.id}`
        })
    }

    res
      .status(200)
      .json({
        status: 'Ok',
        code: 200,
        message: `Delete contact id: ${req.params.id} successful`
      })
  } catch (e) {
    next(e)
  }
}
// Для маршрутов, что принимают данные(POST и PUT), продумайте проверку(валидацию) 
// принимаемых данных.Для валидации принимаемых данных используйте пакет joi
export default {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
}