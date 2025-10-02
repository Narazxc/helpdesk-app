import React from "react";
// import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative px-6 py-0 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="relative flex-3 items-center overflow-hidden hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          {/* from-cyan-500 to-blue-500 */}
          <img
            className="w-full h-full object-cover bg-linear-to-r "
            src="/images/brand/ricardo-gomez-angel-unsplash.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent"></div>
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}

            {/* <GridShape /> */}
            {/* <div className="flex flex-col items-center max-w-xs">
              <div className="mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/brand/logo-fmis-3d-for-web-1.png"
                  alt="Logo"
                />
              </div>
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
            */}
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
        {children}
      </div>
    </div>
  );
}
