import { ReactNode, Component } from 'react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      console.log(this.state.error)
      return (
        <div>
          <div>Something went wrong!</div>
          {process.env.NODE_ENV === 'development' && <p>{this.state.error?.message}</p>}
        </div>
      )
    }
    return this.props.children
  }
}
