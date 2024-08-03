import { useEffect } from 'react'
import { ClickDetectorProps } from '@/types/interfaces'

export const ClickDetector = ({ onClick }: ClickDetectorProps) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      onClick(event)
    }

    // Añadir el evento al montar el componente
    document.addEventListener('click', handleClick)

    // Eliminar el evento al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [onClick])

  return null
}
