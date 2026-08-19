"use client";

import { usePathname, useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

const allowedPaths = [
  "/login",
  "/mailauth",
  "/register-firstname",
  "/register-password",
  "/register-birthday",
  "/register",
  "/",
  "/cgu",
  "/resetPassword",
];

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const isAllowedPath = allowedPaths.includes(pathname);
  const [checkedPath, setCheckedPath] = useState<string | null>(null);

  useEffect(() => {
    if (isAllowedPath) {
      return;
    }

    let cancelled = false;
    const checkToken = async () => {
      const userToken = localStorage.getItem("userToken");

      if (userToken) {
        try {
          const response = await fetch("/api/users/validate-token", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          if (!response.ok && !isAllowedPath) {
            router.push("/login");
          }
        } catch {
          if (!isAllowedPath) {
            router.push("/login");
          }
        }
      } else {
        if (!isAllowedPath) {
          router.push("/login");
        }
      }
      if (!cancelled) {
        setCheckedPath(pathname);
      }
    };

    void checkToken();

    return () => {
      cancelled = true;
    };
  }, [isAllowedPath, pathname, router]);

  if (!isAllowedPath && checkedPath !== pathname) {
    return <Spinner />;
  }

  return <NextUIProvider>{children}</NextUIProvider>;
}
