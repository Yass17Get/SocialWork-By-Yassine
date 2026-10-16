import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('yassine_portal_articles_v1');
      localStorage.removeItem('yassine_portal_profile_v1');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex items-center justify-center p-6 text-right" dir="rtl">
          <div className="max-w-md w-full bg-white border border-stone-300 rounded-xl p-8 shadow-sm space-y-4">
            <h1 className="text-xl font-bold text-stone-950">
              حدث خطأ أثناء تحميل الصفحة
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              تعذر عرض بعض عناصر المنصة. يمكنك إعادة تحميل الصفحة، أو إعادة ضبط الذاكرة المؤقتة (LocalStorage) إذا كانت هناك بيانات غير متوافقة.
            </p>
            {this.state.error && (
              <pre className="p-3 bg-stone-100 rounded text-[11px] text-rose-800 font-mono overflow-x-auto text-left" dir="ltr">
                {this.state.error.message}
              </pre>
            )}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
              >
                إعادة المحاولة
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded hover:bg-stone-200 transition-colors"
              >
                مسح البيانات المؤقتة وإعادة التحميل
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
