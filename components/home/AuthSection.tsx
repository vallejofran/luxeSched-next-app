'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { LoginForm } from '@/components/home/LoginForm'
import { RegisterForm } from '@/components/home/RegisterForm'
import { EntitySelector } from '@/components/home/EntitySelector'
import { CustomPopOVer } from '@/components/CustomPopOver'
import { ClickDetector } from '@/components/ClickDetector'
import { Entity } from '@/types/interfaces'

const textVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 0 },
}
const loginFormaVariants = {
  open: { opacity: 1, y: -50 },
  closed: { opacity: 0, y: -600 },
}
const entitySelectorVariants = {
  open: { opacity: 1, y: -120 },
  closed: { opacity: 0, y: 280 },
}

export const AuthSection = () => {
  const [isOpenPop, setIsOpenPop] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [popColor, setPopÇolor] = useState<
    'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  >('foreground')
  const [entities, setEntities] = useState<Entity[]>([])
  const [isOpenText, setIsOpenText] = useState(true)
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false)
  const [isOpenEntitySelector, setIsOpenEntitySelector] = useState(false)
  const [entitySelected, setEntitySelected] = useState(false)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const router = useRouter()

  useEffect(() => {
    if (entitySelected) {
      setIsOpenEntitySelector((isOpenEntitySelector) => !isOpenEntitySelector)

      const timer = setTimeout(() => {
        router.push('/docs')
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [entitySelected])

  const handleScreenClick = () => {
    setIsOpenPop(false)
  }

  const handleEntities = (entities: any) => {
    setEntities(entities)
  }

  const handleMessage = (
    msg: string,
    color?: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  ) => {
    setMessage(msg)
    setPopÇolor(color || 'foreground')
    setIsOpenPop(true)
  }

  const handleClosePopOver = () => {
    setIsOpenPop(false)
  }

  const handleCloseSelector = () => {
    setEntitySelected((entitySelected) => !entitySelected)
  }

  const handleOpenLoginForm = () => {
    if (!isOpenText && !isOpenLoginForm) return
    setIsOpenText((isOpenText) => !isOpenText)
    setIsOpenLoginForm((isOpenLoginForm) => !isOpenLoginForm)
  }

  const handleOpenRegisterForm = () => {
    if (!isOpenText && isOpenLoginForm) return
    onOpen()
  }

  const handleSubmitLoginForm = () => {
    setIsOpenLoginForm((isOpenLoginForm) => !isOpenLoginForm)
    setIsOpenEntitySelector((isOpenEntitySelector) => !isOpenEntitySelector)
  }

  const handleSubmiRegisterForm = () => {
    setIsOpenText((isOpenText) => !isOpenText)
    setIsOpenLoginForm((isOpenLoginForm) => !isOpenLoginForm)
  }

  return (
    <section className="flex flex-col justify-start items-center gap-4 h-5/6">
      {/* Botones LOGIN REGISTER */}
      <motion.div
        animate={isOpenText ? 'open' : 'closed'}
        transition={{
          ease: 'circOut',
          duration: 0.5,
        }}
        variants={textVariants}>
        <div className="flex justify-between items-center gap-28">
          <button
            className="hover:cursor-pointer text-9xl font-light hover:text-[#f31260] transition ease-in delay-150 duration-300"
            onClick={handleOpenLoginForm}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenLoginForm()
              }
            }}>
            Login
          </button>
          <button
            className="hover:cursor-pointer text-9xl font-light hover:text-[#f31260] transition ease-in delay-150 duration-300"
            onClick={handleOpenRegisterForm}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenRegisterForm()
              }
            }}>
            Register
          </button>
        </div>
      </motion.div>

      {/* Formularios */}
      <motion.div
        layoutId="loginForm"
        animate={isOpenLoginForm ? 'open' : 'closed'}
        className="w-1/2"
        initial={{ opacity: 0 }}
        variants={loginFormaVariants}
        transition={{
          ease: 'circOut',
          duration: 0.5,
        }}>
        <LoginForm
          onClose={handleOpenLoginForm}
          onEntities={handleEntities}
          onMessage={handleMessage}
          onSubmit={handleSubmitLoginForm}
        />
      </motion.div>

      <RegisterForm
        isOpen={isOpen}
        onClose={onClose}
        onMessage={handleMessage}
        onSubmit={handleSubmiRegisterForm}
        onOpenChange={onOpenChange}
      />

      {/* Selector de entidades */}
      <motion.div
        animate={isOpenEntitySelector ? 'open' : 'closed'}
        className="w-1/2"
        initial={{ opacity: 0 }}
        variants={entitySelectorVariants}
        transition={{
          ease: 'circOut',
          duration: 1,
          delay: 0.3,
        }}>
        <EntitySelector entities={entities} onEntitySelected={handleCloseSelector} />
      </motion.div>

      <CustomPopOVer
        color={popColor}
        header="This is a PopOver advise for you!"
        isOpen={isOpenPop}
        message={message}
        placement="bottom"
        size="lg"
        onClose={handleClosePopOver}
      />

      <ClickDetector onClick={handleScreenClick} />
    </section>
  )
}
