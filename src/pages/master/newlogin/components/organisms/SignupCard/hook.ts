import { Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useLogin } from 'src/hook/use-login'
import useLocaleGroup from 'src/locales/useLocaleGroup'
import { PATH_TREE } from 'src/router/routes'

const useData = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [t] = useLocaleGroup('login')

  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      const redirect = new URLSearchParams(window.location.search).get('route_url')

      message.success(t.message.loginSuccess)

      if (redirect && decodeURIComponent(redirect) !== PATH_TREE.LOGIN) {
        navigate(decodeURIComponent(redirect))
        return
      }

      navigate(PATH_TREE.HOME)
    },
    onError: () => {

      message.error(t.message.loginFail)
    },
  })

  const onSubmit = () => {
    form.validateFields().then((values) => {
      login(values)
    })
  }



  return {
    form,
    onSubmit,
    isPending,
  }
}

export default useData
