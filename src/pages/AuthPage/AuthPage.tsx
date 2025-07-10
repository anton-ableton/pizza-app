import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { requestOtp, signIn } from "../../shared/api/authApi";
import { useAppDispatch } from "../../shared/store/store";
import { setCredentials } from "../../features/auth/authSlice";
import { useTheme } from "../../shared/hooks/useTheme";
import { themeColors } from "../../shared/constants";

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme === "dark";
  const colors = themeColors[isDark ? "dark" : "light"];

  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("8");
  const [retryDelay, setRetryDelay] = useState(0);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { handleSubmit } = useForm();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (retryDelay > 0) {
      timer = setInterval(() => setRetryDelay((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [retryDelay]);

  const handleRequestOtp = async () => {
    if (phone.length !== 11) {
      setError("Введите корректный номер");
      return;
    }

    try {
      setLoading(true);
      const res = await requestOtp(phone.replace(/\D/g, ""));
      if (res.status >= 200 && res.status < 300) {
        setStep("code");
        setRetryDelay(res.data.retryDelay / 1000);
      } else {
        setCode("");
        setError("Неверный код");
      }
    } catch (err) {
      setCode("");
      setError("Неверный код");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const res = await signIn(phone.replace(/\D/g, ""), Number(code));
      if (res.data.success) {
        dispatch(
          setCredentials({ user: res.data.user, token: res.data.token })
        );
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${colors.background} ${colors.textPrimary}`}
    >
      <div className="w-full max-w-md p-6 rounded-xl shadow-xl bg-white dark:bg-[#1f1f1f]">
        <h2 className="text-2xl font-bold mb-2">Авторизация</h2>
        <p className="mb-4">
          Введите номер телефона для входа в личный кабинет
        </p>

        {step === "phone" && (
          <form onSubmit={handleSubmit(handleRequestOtp)} className="space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "");
                if (!raw.startsWith("8")) raw = "8" + raw;
                setPhone(raw.slice(0, 11));
              }}
              placeholder="Телефон"
              className="w-full p-2 border rounded"
              maxLength={11}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600"
              disabled={loading}
            >
              Продолжить
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <input
              type="tel"
              value={phone}
              disabled
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800"
            />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Код"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600"
              disabled={loading}
            >
              Войти
            </button>
            {retryDelay > 0 ? (
              <p className="text-sm text-gray-500">
                Запросить код повторно можно через {retryDelay} секунд
              </p>
            ) : (
              <button
                type="button"
                onClick={handleRequestOtp}
                className="text-blue-500 underline"
              >
                Запросить код ещё раз
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
