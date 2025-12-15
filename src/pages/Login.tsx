import PageMeta from "@/components/common/PageMeta";
import { LoginForm } from "@/features/auth/LoginForm";

export default function Login() {
  // Test wether access token is cleared properly after logout
  // console.log("Token", tokenManager.getAccessToken());
  // tokenManager.clearAccessToken();
  // console.log("After clear", tokenManager.getAccessToken());

  return (
    // bg-muted
    <>
      <PageMeta
        title="FMIS-Helpdesk"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className="bg-[url(/images/login_/Login_1.webp)] bg-cover bg-center flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-5xl">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
