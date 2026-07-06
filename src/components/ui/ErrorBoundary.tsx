import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div
            className="max-w-md w-full text-center p-8 rounded-2xl border"
            style={{
              background: '#111111',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(239, 68, 68, 0.1)' }}
            >
              <AlertTriangle size={28} className="text-red-400" />
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: '#E1E0CC' }}
            >
              Something went wrong
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: 'rgba(225, 224, 204, 0.6)' }}
            >
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
              style={{ background: '#E1E0CC', color: '#000' }}
            >
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
