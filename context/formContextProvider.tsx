import { useState, useContext } from 'react'
// Context provider
import { FormContext } from './formContext'
export const UseFormContext = () => useContext(FormContext)

export default function FormContextProvider({ children }) {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <FormContext.Provider
      value={{
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}>
      {children}
    </FormContext.Provider>
  )
}
