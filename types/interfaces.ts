export interface Entity {
  associationCode: string
  name: string
}

export interface SelectorFormProps {
  entities: Entity[]
  onEntitySelected: (data: boolean) => void
}

export interface PopOverProps {
  isOpen: boolean
  color: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size: 'sm' | 'md' | 'lg'
  placement: 'top' | 'right' | 'bottom' | 'left'
  onClose: () => void
  header: string
  message: string
}

export interface ClickDetectorProps {
  onClick: (event: MouseEvent) => void
}

export interface LoginFormProps {
  onClose: () => void
  onSubmit: () => void
  onMessage: (
    msg: any,
    color?: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  ) => void
  onEntities: (entities: any[]) => void
}

export interface RegisterFormProps {
  onClose: () => void
  onSubmit: () => void
  onMessage: (
    msg: string,
    color?: 'default' | 'foreground' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  ) => void
  onOpenChange: () => void
  isOpen: any
}
