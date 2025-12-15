import { useState } from "react";

// Component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Spinner } from "@/components/ui/spinner";

// Icon
import { Mail, Send } from "lucide-react";

// React router
import { Link } from "react-router";
import { useForgotPassword } from "./useForgotPassword";

// React hook form
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Toast
import toast from "react-hot-toast";
import CheckEmail from "./CheckEmail";

interface IForgotPassword {
  email: string;
}

export default function ForgotPasswordForm() {
  const { forgotPassword, isLoading } = useForgotPassword();
  const [userEmail, setUserEmail] = useState("");
  const [showCheckEmailComponent, setShowCheckEmailComponent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>();

  const onSubmit: SubmitHandler<IForgotPassword> = (data) => {
    setUserEmail(data.email);
    forgotPassword(data.email, {
      onSuccess: () => {
        toast.success("sent successfully");
        setShowCheckEmailComponent(true);
      },
    });
  };

  // return (
  //   <div className="w-[27rem] px-5 h-[25rem] rounded-md border bg-white border-gray-100 shadow-sm">
  //     <h1 className="text-2xl font-semibold mb-2 mt-8">
  //       Forgot your password?
  //     </h1>
  //     <h2 className="text-sm">
  //       Type in your email and we'll send you a code to reset the password
  //     </h2>
  //     <CustomizedInput className="bg-red-100" />
  //   </div>
  // );
  // return (
  //   <Card className="mx-auto max-w-sm rounded-sm">
  //     <CardHeader className="space-y-1">
  //       <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
  //       <CardDescription>
  //         Enter your email below to receive a password reset link
  //       </CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       <div className="space-y-4">
  //         <div className="space-y-2">
  //           <div className="flex flex-col gap-2">
  //             <Label htmlFor="email" className="text-sm">
  //               Email
  //             </Label>
  //             <Input
  //               id="email"
  //               type="email"
  //               placeholder="m@example.com"
  //               required
  //             />
  //           </div>
  //           <p className="text-sm text-gray-500">
  //             A password reset link will be sent to the provided email address.
  //           </p>
  //         </div>
  //         <Button type="submit" className="w-full">
  //           Send Reset Link
  //         </Button>
  //       </div>
  //       <div className="mt-4 text-center text-sm">
  //         Remembered your password?{" "}
  //         <Link to="/signin" className="underline">
  //           Go back to login
  //         </Link>
  //       </div>
  //     </CardContent>
  //   </Card>

  return (
    <>
      {!showCheckEmailComponent && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex items-center justify-center"
        >
          <div className="dark:bg-gray-900 flex border flex-col gap-6 w-full max-w-[28rem] md:max-w-[30rem] bg-white px-4 sm:px-8 py-8 shadow-sm rounded-md">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-semibold">Forgot Password?</h1>
              <div className="flex size-14 items-center justify-center rounded-md">
                <Mail size={50} strokeWidth={1} />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid text-sm gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@fmis.gov.kh"
                  // required
                  className="h-10"
                  {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 50,
                      message:
                        "Request type name must be less than 50 characters",
                    },
                    minLength: {
                      value: 2,
                      message:
                        "Request type name must be at least 2 characters",
                    },
                    validate: {
                      isAllowedDomain: (value) => {
                        // Basic email format check first
                        if (!value.includes("@")) return "Invalid email format";

                        const parts = value.split("@");
                        if (parts.length !== 2) return "Invalid email format";

                        const domain = parts[1].toLowerCase();
                        return (
                          domain.endsWith("fmis.gov.kh") ||
                          "Email must be a fmis.gov.kh address"
                        );
                      },
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-medium h-10 bg-blue-600/90 dark:bg-blue-600/80 hover:bg-blue-500 dark:text-[#f9fafc]"
              >
                {!isLoading ? (
                  <>
                    <span>Send to Email </span>
                    <span>
                      <Send />
                    </span>
                  </>
                ) : (
                  <Spinner />
                )}
              </Button>

              <p className="text-sm text-right text-gray-500 dark:text-[#f9fafc]">
                Remember Password?{" "}
                <Link
                  className="text-black hover:underline dark:text-[#f9fafc]"
                  to="/signin"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}

      {showCheckEmailComponent && <CheckEmail email={userEmail} />}
    </>
  );
}

// return (
//   <form>
//     {/* px-16 py-6 */}
//     {/*  */}
//     {/* min-w-[26rem] md:min-w-[30rem] */}
//     {/*  */}
//     <div className="flex border flex-col gap-6 sm:w-[28rem] md:w-[30rem] max-w-[30rem] bg-white px-4 sm:px-8 py-8 shadow-sm rounded-sm">
//       <div className="flex flex-col items-center gap-4">
//         <h1 className="text-xl font-semibold">Forgot Password?</h1>
//         {/* <a href="#" className="flex flex-col items-center gap-2 font-medium"> */}
//         <div className="flex size-14 items-center justify-center rounded-md">
//           {/* <GalleryVerticalEnd className="size-30" /> */}
//           <Mail size={50} strokeWidth={1} />
//         </div>
//         <span className="sr-only">Acme Inc.</span>
//         {/* </a> */}
//         {/* <div className="text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <a href="#" className="underline underline-offset-4">
//             Sign up
//           </a>
//         </div> */}
//       </div>
//       <div className="flex flex-col gap-6">
//         <div className="grid text-sm gap-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="m@example.com"
//             required
//             className="h-10"
//           />
//         </div>
//         <Button
//           type="submit"
//           className="w-full font-medium h-10 bg-blue-600 hover:bg-blue-500"
//         >
//           Send to Email{" "}
//           <span>
//             <Send />
//           </span>
//         </Button>

//         <p className="text-sm text-right text-gray-500">
//           Remember Password?{" "}
//           <Link className="text-black hover:underline" to="/signin">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   </form>
// );
