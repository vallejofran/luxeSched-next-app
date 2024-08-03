import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { PopOverProps } from '@/types/interfaces'
import { TfiAnnouncement } from 'react-icons/tfi'

export const CustomPopOVer = ({
  isOpen,
  color,
  size,
  placement,
  onClose,
  header,
  message,
}: PopOverProps) => {
  return (
    <Popover
      isOpen={isOpen}
      color={color}
      size={size}
      placement={placement}
      backdrop={'blur'}
      onClose={onClose}>
      <PopoverTrigger>
        <div />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-28 py-4 text-center">
          <div className="text-2xl font-bold pb-3 flex flex-row gap-2">
            <TfiAnnouncement size={'1.6em'} color={'#ffffff'} />
            {header}
          </div>
          <div dangerouslySetInnerHTML={{ __html: message }} className="text-lg" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// default
// primary
// secondary
// success - #17c964
// warning
// danger - #f31260
// foreground
