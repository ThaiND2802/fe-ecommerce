import { useEffect, useRef, useState } from 'react'
import Confirmation, { ConfirmationRef } from 'src/lib/components/Confirmation'
import useLocaleGroup from 'src/lib/locales/useLocale'
import emitter, { EVENTS } from '../../action'
import useMessage from 'src/lib/hooks/message'
import { useMutation } from '@tanstack/react-query'
import { deleteCustomer } from 'src/entities/management/customer/api'

const Index = () => {
  const confirmationRef = useRef<ConfirmationRef>(null)
  const idToDeleteRef = useRef(null)
  const [nameToDelete, setNameToDelete] = useState('')
  const [t] = useLocaleGroup('Confirmation')
  const { deleteSuccess } = useMessage()

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      deleteSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      confirmationRef.current?.close()
    }
  })

  const handleConfirmed = () => {
    deleteMutate(idToDeleteRef.current)
  }

  const handleConfirmDelete = ({ id, title }: { id: string, title: string }) => {
    idToDeleteRef.current = id
    setNameToDelete(title)
    confirmationRef.current?.open()
  }

  useEffect(() => {
    emitter.on(EVENTS.DELETE, handleConfirmDelete)
    return () => {
      emitter.off(EVENTS.DELETE, handleConfirmDelete)
    }
  }, [])

  return <Confirmation
    ref={confirmationRef}
    onConfirmed={handleConfirmed}
    content={<div>{t.deleteQuestion.replace('{{entry}}', nameToDelete)}</div>}
    contentDelete={t.undoneWarning}
  />
}

export default Index
