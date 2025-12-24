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

// import { ChevronLeft, Mail } from "lucide-react";
// import { Link } from "react-router";
import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useForgotPassword } from "./useForgotPassword";

// Import the interface from the parent component
interface CheckEmailProps {
  email: string;
}

// export default function CheckEmail({ email }: CheckEmailProps) {
//   const [timeLeft, setTimeLeft] = useState(1 * 60); // 15 minutes in seconds
//   const [canResend, setCanResend] = useState(false);
//   const { forgotPassword, isLoading: isSending } = useForgotPassword();

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setCanResend(true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleResend = () => {
//     if (canResend) {
//       // Add your resend email logic here
//       forgotPassword(email, {
//         onSuccess: () => {
//           toast.success("Resend successfully.");
//           setTimeLeft(1 * 60);
//           setCanResend(false);
//         },
//       });
//     }
//   };

//   return (
//     <div className="dark:bg-gray-900 flex border flex-col gap-6 w-full max-w-[28rem] md:max-w-[30rem] bg-white px-4 sm:px-14 py-8 shadow-sm rounded-md">
//       <div className="flex flex-col items-center gap-4 min-h-[300px]">
//         <h1 className="text-xl font-semibold">Check your email</h1>
//         <div className="flex size-14 items-center justify-center rounded-md">
//           <Mail size={50} strokeWidth={1} />
//         </div>
//         <div className="text-center mt-5">
//           <p className="text-sm text-gray-600">
//             Email has been sent, please check your email inbox and click on the
//             provided link to reset your password.
//           </p>

//           <div className="mt-4">
//             <p className="text-sm text-gray-600 mb-3">
//               If you don't receive email:
//             </p>
//             {canResend ? (
//               <button
//                 disabled={isSending}
//                 onClick={handleResend}
//                 className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
//               >
//                 Resend Email
//               </button>
//             ) : (
//               <button
//                 disabled
//                 onClick={() => {
//                   toast.success("Email has been resent.");
//                 }}
//                 className="px-4 py-2 bg-gray-300 text-gray-500 text-sm rounded-md cursor-not-allowed"
//               >
//                 Resend in {formatTime(timeLeft)}
//               </button>
//             )}
//           </div>

//           <Link to="/signin" className="text-sm block mt-8">
//             <div className="flex text-gray-500 justify-center items-center">
//               <ChevronLeft />
//               <span>Return to Login</span>
//             </div>
//           </Link>
//         </div>
//         <span className="sr-only">Acme Inc.</span>
//       </div>
//     </div>
//   );
// }

// Check email 20251211
import { Check, ChevronLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useForgotPassword } from "./useForgotPassword";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function CheckEmail({ email }: CheckEmailProps) {
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const { forgotPassword } = useForgotPassword();

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
    // <div className="min-h-screen flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {/* Success Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center animate-fadeIn">
        {/* Success Icon */}
        {/* <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-scaleIn">
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>
        </div> */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.5,
              }}
            >
              <Check size={32} className="text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Check Your Email
        </h2>

        {/* <p className="text-gray-600 dark:text-gray-300 mb-2">
          We've sent a password reset link to:
        </p> */}
        <p className="text-sm text-gray-600 mb-6">
          Email has been sent, please check your email inbox and click on the
          provided link to reset your password.
        </p>

        {/* <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6 break-all">
          {"example@fmis.gov.kh"}
        </p> */}

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex gap-3 text-left">
            <Mail
              className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
              size={20}
            />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-1">Didn't receive the email?</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• Wait a few minutes and try again</li>
              </ul>
            </div>
          </div>
        </div>

        {canResend ? (
          <button
            onClick={() => handleResend()}
            className="w-full bg-gray-100 text-sm dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all mb-3"
          >
            Resend Email
          </button>
        ) : (
          <button
            // onClick={() => setIsSubmitted(false)}
            disabled={!canResend}
            onClick={() => {
              toast.success("Email has been resent.");
            }}
            className={`${
              !canResend ? "cursor-not-allowed" : "cursor-pointer"
            } w-full bg-gray-100 text-sm dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all mb-3`}
          >
            {/* Try Different Email */}
            Resend in {formatTime(timeLeft)}
          </button>
        )}

        {/* <button
          onClick={() => (window.location.href = "/signin")}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ChevronLeft size={16} />
          Back to Login
        </button> */}
        <Link
          to="/signin"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ChevronLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
    // </div>
  );
}
