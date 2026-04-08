import { useSearchParams } from 'react-router-dom'

const isInIframe = () => {
  try {
    return globalThis.self !== globalThis.top
  } catch (e) {
    console.error('error', e)
    return true
  }
}

const usePageMode = () => {
  const [searchParams] = useSearchParams()
  const isHiddenHeader = searchParams.get('header') === 'false'
  const isForPrinting = searchParams.get('print') === 'true'

  return {
    isHiddenHeader: isHiddenHeader && isInIframe(),
    isForPrinting,
  }
}

export default usePageMode
