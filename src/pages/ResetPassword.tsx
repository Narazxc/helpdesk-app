import { Button } from "@/components/ui/button";
import { API_URL } from "@/config";
import ResetPasswordForm from "@/features/auth/ResetPasswordForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function ResetPassword() {
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add this
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await axios.get(
          `${API_URL}/auth/verify-reset-token?token=${token}`
        );

        if (res.status === 200 && res.data.success && res.data.status === 200) {
          setIsExpired(false);
        }
      } catch (err) {
        console.log(err);

        if (axios.isAxiosError(err)) {
          if (
            err.response?.status === 401 &&
            err.response?.data?.message === "Invalid reset token"
          ) {
            setIsExpired(true);
          } else {
            setIsExpired(true);
          }
        } else {
          setIsExpired(true);
        }
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (token) {
      verifyToken();
    } else {
      // No token present
      setIsExpired(true);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div className="bg-[url(/images/login_/Login_1.webp)] bg-cover flex-col bg-center flex flex-1 items-center justify-center min-h-screen p-6 md:p-10">
      {isLoading ? (
        <div className="text-white">Verifying token...</div>
      ) : !isExpired ? (
        <ResetPasswordForm />
      ) : (
        <ExpiredLinkComponents />
      )}
    </div>
  );
}

function ExpiredLinkComponents() {
  // const handleRequestNewEmail = () => {
  //   // Handle request new reset email
  //   console.log("Request new reset email");
  // };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
    <>
      {/* Decorative curves - left */}
      {/* <svg
        className="absolute bottom-0 left-0 w-24 h-32 text-blue-200 opacity-40"
        viewBox="0 0 100 150"
      >
        <path
          d="M 0 150 Q 30 120, 0 80 Q 30 40, 0 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <circle cx="10" cy="140" r="4" fill="currentColor" />
      </svg> */}

      {/* Decorative bridge - right */}
      {/* <svg
        className="absolute bottom-0 right-0 w-48 h-32 text-blue-200 opacity-40"
        viewBox="0 0 200 150"
      ></svg> */}

      <div className="relative bg-white rounded-xl shadow-md p-10 max-w-lg w-full text-center">
        {/* Logo/Icon - M shape with dots */}
        {/* <div className="flex justify-center mb-8">
          <div className="grid grid-cols-5 gap-1.5">
            <div className="w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>

            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>

            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>

            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>

            <div className="w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full opacity-50"></div>
            <div className="w-3 h-3 bg-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>
          </div>
        </div> */}

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">
          {/* Whoops, that's an expired link */}
          Password Reset Link Expired
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          {/* For security reasons, password reset links expire after a little
          while. If you still need to reset your password, you can request a new
          reset email. */}
          This password reset link is no longer valid. Please request a new
          password reset email to continue.
        </p>

        {/* Button */}
        {/* <button
          // onClick={handleRequestNewEmail}
          className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          Request a new reset email
        </button> */}
        {/* Link */}
        {/* <Link
          to="/forgot-password"
          className="text-sm font-normal text-gray-400 underline"
        >
          Request a new reset email
        </Link> */}
        {/* <Link
          className="text-black text-sm hover:underline dark:text-[#f9fafc]"
          to="/forgot-password"
        >
          Request a new reset email
        </Link> */}
        <Link to="/forgot-password">
          <Button className="h-10 bg-blue-600/90 dark:bg-blue-600/80 hover:bg-blue-500 mt-4 dark:text-[#edeeee]">
            Request a new reset email
          </Button>
        </Link>
      </div>
      {/* </div> */}
    </>
  );
}
