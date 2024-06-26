import React, { useRef, useState } from 'react'

import classes from './Tooltip.module.scss'

interface Props {
  tag?: 'div' | 'p' | 'span'
  content: string
  children: React.ReactNode
}

function TooltipCursor({ tag: Tag = 'div', children, content }: Props) {
  const [isTooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [_, setShowTooltipContent] = useState(false)

  const tooltipRef = useRef<HTMLDivElement>(document.createElement('div'))

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event

    const tooltipWidth = tooltipRef.current?.offsetWidth || 0
    const tooltipHeight = tooltipRef.current?.offsetHeight || 0
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let tooltipX = clientX - 12
    let tooltipY = clientY + 21

    // Check if tooltip exceeds the right side of the viewport
    if (tooltipX + tooltipWidth > viewportWidth) {
      tooltipX = clientX - tooltipWidth - 10
    }

    // Check if tooltip exceeds the bottom of the viewport
    if (tooltipY + tooltipHeight > viewportHeight) {
      tooltipY = viewportHeight - tooltipHeight - 10
    }

    setTooltipPosition({ x: tooltipX, y: tooltipY })
  }

  const handleMouseEnter = () => {
    setTooltipVisible(true)
    setShowTooltipContent(false)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <Tag
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isTooltipVisible && (
        <span
          ref={tooltipRef}
          className={classes.tooltip}
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
          }}
        >
          {content}
        </span>
      )}
      {children}
    </Tag>
  )
}

export default TooltipCursor
