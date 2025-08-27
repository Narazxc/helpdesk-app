import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
  return (
    // bg-muted
    <div className="bg-[url(/images/login_/Login_1.png)] bg-cover bg-center flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <LoginForm />
      </div>
    </div>
  );
}
