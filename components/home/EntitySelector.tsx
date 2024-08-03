import React, { useState, useEffect } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import AuthService from '@/services/authService'
import { SelectorFormProps } from '@/types/interfaces'
import { TfiHome } from 'react-icons/tfi'

export const EntitySelector = ({ entities, onEntitySelected }: SelectorFormProps) => {
  const [value, setValue] = useState(new Set([]))

  useEffect(() => {
    if (entities.length > 0 && value.size > 0) {
      const selectedValue = Array.from(value)[0]
      const entity = entities[selectedValue]
      AuthService.localStorage.setEntity(JSON.stringify(entity))
    }
  }, [value])

  const handleSelection = (e: any) => {
    setValue(e)
    onEntitySelected(true)
  }

  return (
    <Select
      isRequired
      size="lg"
      color="danger"
      variant="underlined"
      placeholder="Select an Entity"
      className=""
      startContent={<TfiHome size={'2em'} color={'#f31260'} />}
      onSelectionChange={(e) => handleSelection(e)}>
      {entities && entities.map((entity, key) => <SelectItem key={key}>{entity.name}</SelectItem>)}
    </Select>
  )
}
