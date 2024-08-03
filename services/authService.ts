import AxiosClient from '@/clients/axios'

const AuthService = {
  // Builders
  headersBuilder() {
    const headers = {
      'x-token': AuthService.localStorage.getToken(),
    }
    return headers
  },

  Auth: {
    // Auth Request Methods to the API
    async loginUser(data) {
      return AxiosClient.post('api/auth/login', data)
    },
    
    async registerUser(data) {
      return AxiosClient.post('api/generic-crud/User', data)
    },

    async validateToken(token) {
      const headers = AuthService.headersBuilder()
      return AxiosClient.post('auth/validate-token', token, headers)
    },
  },

  localStorage: {
    // Auth Token handlers
    getToken: () => {
      return localStorage.getItem('luxe-sched-token')
    },

    setToken: (token) => {
      localStorage.setItem('luxe-sched-token', token)
    },

    removeToken: () => {
      localStorage.removeItem('luxe-sched-token')
    },

    // Auth session handlers
    getFirstVisit: () => {
      return localStorage.getItem('firstvisit')
    },

    setFirstVisit: (bool) => {
      localStorage.setItem('firstvisit', bool)
    },

    setEntity: (entity) => {
      localStorage.setItem('luxe-sched-entity', entity)
    },

    removeFirstVisit: () => {
      localStorage.removeItem('firstvisit')
    },

    // Auth User handlers
    getUserEmail: () => {
      if (AuthService.isLoggedIn()) {
        const userEmail = JSON.parse(localStorage.getItem('luxe-sched-user')).email
        return userEmail
      }
    },

    getFullName: () => {
      if (AuthService.isLoggedIn()) {
        const firstName = JSON.parse(localStorage.getItem('luxe-sched-user')).firstname
        const lastName = JSON.parse(localStorage.getItem('luxe-sched-user')).lastname

        const fullName = `${firstName} ${lastName}`
        return fullName
      }
    },

    getAllUserData: () => {
      if (AuthService.isLoggedIn()) {
        const allData = JSON.parse(localStorage.getItem('user'))
        return allData
      }
    },

    setUser: (user) => {
      localStorage.setItem('luxe-sched-user', JSON.stringify(user))
    },

    removeUser: () => {
      localStorage.removeItem('luxe-sched-user')
    },
  },

  // Auth Sesion actions
  isLoggedIn: () => {
    const token = AuthService.localStorage.getToken()
    return !!token
  },

  logout: () => {
    AuthService.localStorage.removeToken()
  },
}

export default AuthService
