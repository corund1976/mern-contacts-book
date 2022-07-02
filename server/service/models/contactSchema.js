import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const { Schema, SchemaTypes, model } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false },
)

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

export default Contact

// { versionKey: false, timestamps: true }
// Данные опции, отключают версионирование документов установкой значение
// свойства versionKey в false.Mongoose по умолчанию добавляет версионирование -
// параметр __v, который указывает версию измененного документа.
// В основном это нужно для документов со сложной структурой,
// а поскольку структура нашей схемы плоская мы версионирование отключаем.
// Вторая опция включает в нашу схему два дополнительных свойства:
//   время создания документа createdAt и
//   время обновления updatedAt.
// Причем Mongoose будет автоматически устанавливать эти поля при создании
// и изменять поле updatedAt при каждом обновлении документа,
// что согласитесь очень удобно.