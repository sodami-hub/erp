import React from 'react';

class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean}
> {
  constructor(props:{children:React.ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError(_:Error) {
    return {hasError: true};
  }
  componentDidCatch(error:Error, info:React.ErrorInfo) {
    console.error('ErrorBoundary 에러 발생', error, info)
  }
  render() {
    if (this.state.hasError) {
      return <h1>문제가 발생했습니다.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
