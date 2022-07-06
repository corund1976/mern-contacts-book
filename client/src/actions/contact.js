import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const listContacts = () => async () => {
  const token = localStorage.getItem('accessToken')

  try {
    const response = await axios
      .get(
        'http://localhost:5000/contacts',
        { headers: { Authorization: `Bearer ${token}` } }
      )

    // eslint-disable-next-line no-console
    console.log(response.data.contacts);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e.response.data.message)
  }
}
