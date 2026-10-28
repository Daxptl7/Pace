import { Component, type ErrorInfo, type ReactNode } from 'react'

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unable to render PACE', error, info.componentStack)
  }
  render() {
    if (this.state.failed)
      return (
        <main className="not-found">
          <p className="eyebrow">A small detour</p>
          <h1>Let’s try that again.</h1>
          <p>We couldn’t load this page. Refresh to get back on track.</p>
          <button
            className="button button--primary"
            onClick={() => window.location.reload()}
          >
            Refresh page
          </button>
        </main>
      )
    return this.props.children
  }
}
