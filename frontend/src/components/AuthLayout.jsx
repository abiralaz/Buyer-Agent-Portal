const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-sky-50 to-blue-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-blue-100/80 bg-white/95 p-8 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)] backdrop-blur-sm">
        <div className="mb-6 border-b border-blue-100 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-blue-950">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-700/80">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;