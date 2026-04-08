import type { PlateElementProps } from 'platejs/react'
import { PlateElement } from 'platejs/react'

export function H1Element(props: PlateElementProps) {
  return <PlateElement as="h1" style={{ fontSize: '2.5em' }} {...props} />
}

export function H2Element(props: PlateElementProps) {
  return <PlateElement as="h2" style={{ fontSize: '2em' }} {...props} />
}

export function H3Element(props: PlateElementProps) {
  return <PlateElement as="h3" style={{ fontSize: '1.5em' }} {...props} />
}

export function H4Element(props: PlateElementProps) {
  return <PlateElement as="h4" style={{ fontSize: '1.25em' }} {...props} />
}

export function H5Element(props: PlateElementProps) {
  return <PlateElement as="h5" style={{ fontSize: '1em' }} {...props} />
}

export function H6Element(props: PlateElementProps) {
  return <PlateElement as="h6" style={{ fontSize: '0.875em' }} {...props} />
}
