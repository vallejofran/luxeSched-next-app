import { useState } from 'react'
import { Checkbox, Input } from '@nextui-org/react'
import { TfiUser, TfiLock, TfiEmail, TfiMobile, TfiLink } from 'react-icons/tfi'
import { RegisterFormProps } from '@/types/interfaces'
import { Modal, ModalContent, ModalBody } from '@nextui-org/react'
import { submitRegister } from '@/actions/clientActions'

export const RegisterForm = ({
  isOpen,
  onClose,
  onSubmit,
  onMessage,
  onOpenChange,
}: RegisterFormProps) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [associationCode, setAssociationCode] = useState('')
  const [gender, setGender] = useState('')
  const [maleCheckIsDisabled, setMaleCheckIsDisabled] = useState(false)
  const [famaleCheckIsDisabled, setFamaleCheckIsDisabled] = useState(false)

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
  const isInvalidEmail = email === '' ? false : !validateEmail(email)

  const onSubmitRegister = async (value: any) => {
    try {
      if (fieldsValidator().length > 0) {
        onMessage(msgBuilder(fieldsValidator()), 'danger')
        return
      }

      const res = await submitRegister(value)
      if (res.errors) {
        const message = msgBuilder(res.errors)
        onMessage(message, 'danger')
      } else if (res.msg) {
        onMessage(res.msg, 'danger')
      } else {
        console.log('onSubmitRegister()', res)
        onClose()
        onSubmit()
        onMessage('User registered successfully!', 'success')
        handleEmptyValues()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fieldsValidator = () => {
    let errorsArray = []
    if (!firstName) errorsArray.push({ msg: 'The field firstName is required' })
    if (!lastName) errorsArray.push({ msg: 'The field lastName is required' })
    if (!phoneNumber) errorsArray.push({ msg: 'The field phoneNumber is required' })
    if (!password) errorsArray.push({ msg: 'The field password is required' })
    if (!associationCode) errorsArray.push({ msg: 'The field associationCode is required' })
    if (!phoneNumber) errorsArray.push({ msg: 'The field phoneNumber is required' })
    if (!gender) errorsArray.push({ msg: 'The field gender is required' })
    return errorsArray
  }

  const msgBuilder = (errors: any) => {
    const msgString = errors
      .map((error: any, index: any) => `<p key=${index}>${error.msg}</p>`)
      .join('')
    return msgString
  }

  const handleMaleCheck = (e: any) => {
    setGender(e)
    setFamaleCheckIsDisabled((famaleCheckIsDisabled) => !famaleCheckIsDisabled)
  }

  const handleFamaleCheck = (e: any) => {
    setGender(e)
    setMaleCheckIsDisabled((maleCheckIsDisabled) => !maleCheckIsDisabled)
  }

  const handleEmptyValues = () => {
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
    setEmail('')
    setPassword('')
    setAssociationCode('')
    setGender('')
  }

  return (
    <Modal size="xl" placement="center" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <form
            action={(value) => onSubmitRegister(value)}
            className="flex flex-col items-stretch gap-8 h-5/6 p-11">
            {/* First name */}
            <Input
              endContent={<TfiUser size={'2em'} color={'#f31260'} />}
              type="text"
              name="firstName"
              size="lg"
              color="danger"
              placeholder="Enter your First Name *"
              variant="underlined"
              value={firstName}
              onValueChange={setFirstName}
            />

            {/* Last name */}
            <Input
              endContent={<TfiUser size={'2em'} color={'#f31260'} />}
              type="text"
              name="lastName"
              size="lg"
              color="danger"
              placeholder="Enter your Last Name *"
              variant="underlined"
              value={lastName}
              onValueChange={setLastName}
            />

            {/* Email */}
            <Input
              endContent={<TfiEmail size={'2em'} color={'#f31260'} />}
              type="email"
              name="email"
              size="lg"
              color="danger"
              placeholder="Enter your email *"
              variant="underlined"
              value={email}
              isInvalid={isInvalidEmail}
              onValueChange={setEmail}
            />

            {/* Password */}
            <Input
              endContent={<TfiLock size={'2em'} color={'#f31260'} />}
              type="password"
              name="password"
              size="lg"
              color="danger"
              placeholder="Enter your password *"
              variant="underlined"
              value={password}
              onValueChange={setPassword}
            />

            {/* Association code */}
            <Input
              endContent={<TfiLink size={'2em'} color={'#f31260'} />}
              type="text"
              name="associationCode"
              size="lg"
              color="danger"
              placeholder="Enter the Association Code *"
              variant="underlined"
              value={associationCode}
              onValueChange={setAssociationCode}
            />

            {/* Phone number */}
            <Input
              endContent={<TfiMobile size={'2em'} color={'#f31260'} />}
              type="number"
              name="phoneNumber"
              size="lg"
              color="danger"
              placeholder="Enter your phone number *"
              variant="underlined"
              value={phoneNumber}
              onValueChange={setPhoneNumber}
            />

            {/* Color palette */}

            {/* Gender */}
            <div className="flex flex-row items-stretch justify-around gap-8">
              <Checkbox
                value="male"
                name="gender"
                size="lg"
                color="success"
                isDisabled={maleCheckIsDisabled}
                onChange={(e) => handleMaleCheck(e.target.value)}>
                MALE
              </Checkbox>
              <Checkbox
                value="famale"
                name="gender"
                size="lg"
                color="danger"
                isDisabled={famaleCheckIsDisabled}
                onChange={(e) => handleFamaleCheck(e.target.value)}>
                FEMALE
              </Checkbox>
            </div>

            <div className="flex flex-row justify-between w-full mt-6">
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
