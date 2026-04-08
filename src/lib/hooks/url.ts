import { useEffect, useEffectEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useUrlParams = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  return searchParams
}

export const useNavigateWithParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (path: string, params: Record<string, string> = {}) => {
    const searchParams = new URLSearchParams(location.search)
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) {
        searchParams.delete(key)
      } else {
        searchParams.set(key, value)
      }
    }
    navigate({
      pathname: path,
      search: searchParams.toString(),
    })
  }
}

const urlParams = new URLSearchParams(globalThis.location.search)
const urlParamsByPath = {}

export const useSyncUrlParams = (
  entries: {
    key: string
    value: any
    replace?: (previous: string) => boolean
    setValue: (value: any, urlParams: URLSearchParams) => void
  }[],
  {
    fromUrl = false,
  }: {
    fromUrl?: boolean
  } = {},
) => {
  const location = useLocation()

  const urlToStore = useEffectEvent(() => {
    if (!urlParamsByPath[location.pathname]) {
      if (Object.entries(urlParamsByPath).length) {
        urlParamsByPath[location.pathname] = new URLSearchParams()
      } else {
        urlParamsByPath[location.pathname] = urlParams
      }
    }
    const myUrlParams = fromUrl
      ? new URLSearchParams(globalThis.location.search)
      : urlParamsByPath[location.pathname]

    for (const { key, setValue } of entries) {
      const value = myUrlParams.get(key)
      if (value?.trim()) {
        setValue(value, myUrlParams)
      }
    }
  })

  const storeToUrl = useEffectEvent(() => {
    const myUrlParams = urlParamsByPath[location.pathname] || new URLSearchParams()
    let replaceNav = true
    for (const { key, value, replace } of entries) {
      replaceNav = replaceNav || replace(myUrlParams.get(key))

      if (value) {
        myUrlParams.set(key, value)
      } else {
        myUrlParams.delete(key)
      }
    }

    const url = new URL(globalThis.location.href)
    url.search = myUrlParams.toString()

    globalThis.history.replaceState({}, '', url)
  })

  useEffect(urlToStore, [])
  useEffect(
    storeToUrl,
    entries.map(({ value }) => value),
  )
}
