import Button, { IButtonProps } from '../Button'
import IconSax from '../IconSax'
import useLocale from '../../locales/useLocale'

interface IProps extends IButtonProps {
  label?: string
}

export const ButtonSave = (props: IProps) => {
  const [c] = useLocale('button')
  return (
    <Button type="primary" {...props}>
      {c.save}
    </Button>
  )
}

export const ButtonCancel = (props: IProps) => {
  const [c] = useLocale('button')
  return <Button {...props}>{c.cancel}</Button>
}

export const ButtonCreate = (props: IProps) => {
  const [c] = useLocale('button')
  return (
    <Button type="primary" {...props}>
      <IconSax name="add" size={18} />
      {props.label || c.create}
    </Button>
  )
}

export const ButtonDelete = (props: IProps) => {
  const [c] = useLocale('button')
  return (
    <Button type="primary" danger {...props}>
      {c.delete}
    </Button>
  )
}

export const ButtonClose = (props: IProps) => {
  const [c] = useLocale('button')
  return <Button {...props}>{c.close}</Button>
}

export const ButtonImport = (props: IProps) => {
  const [c] = useLocale('button')
  return (
    <Button {...props}>
      <IconSax name="download-2" size={18} />
      {c.import}
    </Button>
  )
}

export const ButtonExport = (props: IProps) => {
  const [c] = useLocale('button')
  return (
    <Button {...props}>
      <IconSax name="upload-2" size={18} />
      {c.export}
    </Button>
  )
}

export interface IButtonFilterProps extends IButtonProps {
  count?: number
}
export const ButtonFilter = (props: IButtonFilterProps) => {
  const [c] = useLocale('button')
  return (
    <Button {...props}>
      <IconSax name="sort" size={18} />
      {c.filter} {!!props.count && <span>({props.count})</span>}
    </Button>
  )
}

export const ButtonColumns = (props: IProps) => {
  const [c] = useLocale('button')
  return (
    <Button {...props}>
      <IconSax name="media-sliders-1" size={18} />
      {c.columns}
    </Button>
  )
}
