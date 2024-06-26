import axios from 'axios'

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

const client = axios.create({
  baseURL: BASE_URL,
})

client.interceptors.request.use(
  async (config) => {
    if (config.url === '/users' && config.method === 'post') {
      config.headers.Token = await generateToken()
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

async function generateToken() {
  const response = await client.get('/token')
  return response.data.token
}

export default client
