import { useEffect, useState } from 'react'
import { Checkbox, Input, Link } from '@nextui-org/react'
import { TfiLock, TfiEmail } from 'react-icons/tfi'
import AuthService from '@/services/authService'
import { LoginFormProps } from '@/types/interfaces'
import { submitLogin } from '@/actions/clientActions'

export const LoginForm = ({ onClose, onSubmit, onMessage, onEntities }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  const isInvalid = email === '' ? false : !validateEmail(email)

  useEffect(() => {
    const storedUserEmail = AuthService.localStorage.getUserEmail()
    setEmail(storedUserEmail)
  }, [email])

  const onSubmitLogin = async (value: any) => {
    try {
      const res = await submitLogin(value)

      if (res.errors) {
        const message = msgBuilder(res.errors)
        onMessage(message, 'danger')
      } else if (res.msg) {
        onMessage(res.msg, 'danger')
      } else {
        AuthService.localStorage.setUser(res.user)
        AuthService.localStorage.setToken(res.token)
        console.log('onSubmitLogin()', res)
        onEntities(res.user.entities)
        onSubmit()
        handleEmptyValues()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const msgBuilder = (errors: any) => {
    const msgString = errors
      .map((error: any, index: any) => `<p key=${index}>${error.msg}</p>`)
      .join('')
    return msgString
  }

  const handleEmptyValues = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <form
      action={(value) => onSubmitLogin(value)}
      className="flex flex-col items-stretch gap-8 h-5/6">
      <Input
        endContent={
          <TfiEmail
            size={'2em'}
            color={'#f31260'}
            // className={''}
            // style={''}
            // attr={''}
            // title={''}
          />
        }
        type="email"
        name="email"
        size="lg"
        color="danger"
        placeholder="Enter your email"
        variant="underlined"
        value={email}
        isInvalid={isInvalid}
        onValueChange={setEmail}
      />

      <Input
        endContent={<TfiLock size={'2em'} color={'#f31260'} />}
        type="password"
        name="password"
        size="lg"
        color="danger"
        placeholder="Enter your password"
        variant="underlined"
        value={password}
        onValueChange={setPassword}
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: 'text-small',
          }}>
          Remember me
        </Checkbox>
        <Link color="primary" href="#" size="sm">
          Forgot password?
        </Link>
      </div>

      <div className="flex flex-row justify-between w-full">
        <button
          className="hover:cursor-pointer text-lg text-success font-light bg-transparent border-none p-0"
          type="submit">
          Sign in
        </button>
        <button
          className="hover:cursor-pointer text-lg text-danger font-light bg-transparent border-none p-0"
          type="button"
          onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  )
}
