import ChangePasswordForm from "@/features/auth/ChangePasswordForm";

export default function ChangePassword() {
  return (
    <div className="bg-[url(/images/login_/Login_1.webp)] bg-cover flex-col bg-center flex flex-1 items-center justify-center min-h-screen p-6 md:p-10">
      <ChangePasswordForm />
    </div>
  );
}
