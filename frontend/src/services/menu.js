import axios from 'axios'
import { config } from './config'

export async function getMenu() {
  try {
    // create url
    const url = `${config.server}/menu`

    // create headers with require token
    // send GET request and get the response
    const response = await axios.get(url
    //     , {
    //   headers: {
    //     token: localStorage.getItem('token'),
    //   },
    // }
    )

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}