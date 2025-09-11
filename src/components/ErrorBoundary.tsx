import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorInfo {
  componentStack: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isolate?: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Here you could also send to error reporting service
    // errorReportingService.captureException(error, { extra: errorInfo });
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  retry = () => {
    this.retryTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    }, 100);
  };

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo, this.retry);
      }

      // Default fallback UI
      return (
        <div className={`p-4 ${this.props.isolate ? 'border rounded-lg' : ''}`}>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p>
                <strong>Error:</strong> {this.state.error.message}
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    Technical Details (Dev Mode)
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                    {this.state.error.stack}
                  </pre>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={this.retry} 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;