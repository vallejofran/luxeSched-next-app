'use server'

import AuthService from '@/services/authService'

export const submitLogin = async (formData: FormData) => {
  try {
    const data = { email: formData.get('email'), password: formData.get('password') }
    const res = await AuthService.Auth.loginUser(data)

    return res
  } catch (error) {
    console.log(error)
  }
}

export const submitRegister = async (formData: FormData) => {
  try {
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      gender: formData.get('gender'),
      phoneNumber: formData.get('phoneNumber'),
      email: formData.get('email'),
      password: formData.get('password'),
      associationCode: formData.get('associationCode'),
    }

    const res = await AuthService.Auth.registerUser(data)
    return res
  } catch (error) {
    console.log(error)
  }
}
