const AuthLayout = ({ title, subtitle, children }) => {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-slate-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    );
  };
  
  export default AuthLayout;