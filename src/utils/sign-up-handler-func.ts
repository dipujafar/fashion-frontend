import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const signUpHandler = async (
  formattedData: any,
  api: any,
  router: AppRouterInstance,
  doc?: File,
) => {
  const formData = new FormData();
  if (doc) {
    formData.append("documents", doc);
  }
  formData.append("data", JSON.stringify(formattedData));
  try {
    const res = await api(formData).unwrap();
    if (res?.data?.otpToken) {
      sessionStorage.setItem("verifyOtpToken", res?.data?.otpToken);
      toast.success("Account created successfully");
      toast.success(
        "Please verify your email with OTP, which has been sent to your email.",
      );
      router.push("/verify-otp");
    }
  } catch (error: any) {
    toast.error(error.data.message);
  }
};
