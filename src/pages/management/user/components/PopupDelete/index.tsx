import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Confirmation, { ConfirmationRef } from 'src/lib/components/Confirmation'
import useMessage from 'src/lib/hooks/message'
import useLocale from 'src/lib/locales/useLocale'
import { deleteUser } from 'src/entities/management/user/api'
import emitter, { EVENTS } from '../../action'

const Index = () => {
  const confirmationRef = useRef<ConfirmationRef>(null)
  const idToDeleteRef = useRef<string | null>(null)
  const [nameToDelete, setNameToDelete] = useState('')
  const [t] = useLocale('Confirmation')
  const { deleteSuccess } = useMessage()

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      deleteSuccess()
      emitter.emit(EVENTS.REFRESH_TABLE)
      confirmationRef.current?.close()
    },
  })

  const handleConfirmed = () => {
    if (idToDeleteRef.current) {
      deleteMutate(idToDeleteRef.current)
    }
  }

  const handleConfirmDelete = ({ id, title }: { id: string; title: string }) => {
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

  return (
    <Confirmation
      ref={confirmationRef}
      onConfirmed={handleConfirmed}
      content={<div>{t.deleteQuestion.replace('{{entry}}', nameToDelete)}</div>}
      contentDelete={t.undoneWarning}
    />
  )
}

export default Index
