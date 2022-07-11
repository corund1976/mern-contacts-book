class ContactDto {
  id;
  name;
  phone;
  email;
  favorite;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.phone = model.phone;
    this.email = model.email;
    this.favorite = model.favorite;
  }
}

export default ContactDto