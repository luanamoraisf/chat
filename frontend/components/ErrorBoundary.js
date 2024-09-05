import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para mostrar a UI de fallback na próxima renderização
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode registrar o erro em um serviço de log, por exemplo
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
