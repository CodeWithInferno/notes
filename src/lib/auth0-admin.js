// src/lib/auth0-admin.js
import { ManagementClient } from 'auth0'

let managementClient = null

const getManagementClient = () => {
  if (managementClient) {
    return managementClient
  }

  const {
    AUTH0_MANAGEMENT_DOMAIN,
    AUTH0_MANAGEMENT_CLIENT_ID,
    AUTH0_MANAGEMENT_CLIENT_SECRET,
  } = process.env

  if (
    !AUTH0_MANAGEMENT_DOMAIN ||
    !AUTH0_MANAGEMENT_CLIENT_ID ||
    !AUTH0_MANAGEMENT_CLIENT_SECRET
  ) {
    throw new Error('Missing Auth0 Management API credentials in .env file')
  }

  managementClient = new ManagementClient({
    domain: AUTH0_MANAGEMENT_DOMAIN,
    clientId: AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: AUTH0_MANAGEMENT_CLIENT_SECRET,
  })

  return managementClient
}

export const searchAuth0Users = async (emailQuery) => {
  const auth0 = getManagementClient()
  const params = {
    search_engine: 'v3',
    q: `email:"${emailQuery}"`,
  }
  try {
    const users = await auth0.users.getAll(params)
    return users.data
  } catch (error) {
    console.error('Failed to search users in Auth0:', error)
    return []
  }
}
