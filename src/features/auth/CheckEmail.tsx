// import { ChevronLeft, Mail, Send } from "lucide-react";
// import { Link } from "react-router";

// export default function CheckEmail() {
//   return (
//     // <div className="bg-white px-4 py-8 shadow-sm rounded-md">
//     <div className="dark:bg-gray-900 flex border flex-col gap-6 w-full max-w-[28rem] md:max-w-[30rem] bg-white px-4 sm:px-16 py-8 shadow-sm rounded-md">
//       {/* <h1>Check your email</h1> */}
//       <div className="flex flex-col items-center gap-4 min-h-[300px]">
//         <h1 className="text-xl font-semibold">Check your email</h1>
//         <div className="flex size-14 items-center justify-center rounded-md">
//           <Mail size={50} strokeWidth={1} />
//         </div>
//         <div className="text-center mt-5">
//           <p className="text-sm text-gray-600">
//             Please check your email inbox and click on the provided link to
//             reset your password. <br /> If you don't receive email.{" "}
//             <span className="text-sm text-blue-500 underline hover:cursor-pointer">
//               click here to resend
//             </span>
//           </p>

//           <Link to="/signin" className="text-sm block mt-18">
//             <div className="flex justify-center items-center">
//               <ChevronLeft />
//               <span>Back to Login</span>
//             </div>
//           </Link>
//         </div>
//         <span className="sr-only">Acme Inc.</span>
//       </div>
//     </div>
//   );
// }

import { ChevronLeft, Mail } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForgotPassword } from "./useForgotPassword";

// Import the interface from the parent component
interface CheckEmailProps {
  email: string;
}

export default function CheckEmail({ email }: CheckEmailProps) {
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const { forgotPassword, isLoading: isSending } = useForgotPassword();

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    if (canResend) {
      // Add your resend email logic here
      forgotPassword(email, {
        onSuccess: () => {
          toast.success("Resend successfully.");
          setTimeLeft(1 * 60);
          setCanResend(false);
        },
      });
    }
  };

  return (
    <div className="dark:bg-gray-900 flex border flex-col gap-6 w-full max-w-[28rem] md:max-w-[30rem] bg-white px-4 sm:px-14 py-8 shadow-sm rounded-md">
      <div className="flex flex-col items-center gap-4 min-h-[300px]">
        <h1 className="text-xl font-semibold">Check your email</h1>
        <div className="flex size-14 items-center justify-center rounded-md">
          <Mail size={50} strokeWidth={1} />
        </div>
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Email has been sent, please check your email inbox and click on the
            provided link to reset your password.
          </p>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">
              If you don't receive email:
            </p>
            {canResend ? (
              <button
                disabled={isSending}
                onClick={handleResend}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
              >
                Resend Email
              </button>
            ) : (
              <button
                disabled
                onClick={() => {
                  toast.success("Email has been resent.");
                }}
                className="px-4 py-2 bg-gray-300 text-gray-500 text-sm rounded-md cursor-not-allowed"
              >
                Resend in {formatTime(timeLeft)}
              </button>
            )}
          </div>

          <Link to="/signin" className="text-sm block mt-8">
            <div className="flex text-gray-500 justify-center items-center">
              <ChevronLeft />
              <span>Return to Login</span>
            </div>
          </Link>
        </div>
        <span className="sr-only">Acme Inc.</span>
      </div>
    </div>
  );
}
