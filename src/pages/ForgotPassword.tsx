import ForgetPasswordForm from "@/features/auth/ForgetPasswordForm";

export default function ForgotPassword() {
  return (
    // bg-[#f8fafc]
    <div className="bg-[url(/images/login_/Login_1.webp)] bg-cover flex-col bg-center flex flex-1 items-center justify-center min-h-screen p-6 md:p-10">
      <ForgetPasswordForm />
    </div>
  );
}
