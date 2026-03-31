import { FaGithub } from "react-icons/fa";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-sky-50 to-blue-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-blue-100/80 bg-white/95 p-8 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)] backdrop-blur-sm">
        <div className="mb-6 border-b border-blue-100 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-blue-950">
              {title}
            </h1>
            <a
              href="https://github.com/abiralaz/Buyer-Agent-Portal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm backdrop-blur transition hover:bg-gray-100 active:scale-95"
            >
              <FaGithub className="text-lg" />
              Repo
            </a>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-gray-700/80">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
