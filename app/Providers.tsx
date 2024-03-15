// Nouveau code :

"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}

// Code fonctionnelle mais sans le mount :

// "use client";

// import { NextUIProvider } from "@nextui-org/react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <NextUIProvider>
//       <NextThemesProvider
//         attribute="class"
//         defaultTheme="dark"
//         themes={["light", "dark", "modern"]}
//       >
//         {children}
//       </NextThemesProvider>
//     </NextUIProvider>
//   );
// }

// Code fonctionnel avec le mount mais l'ancienne version sans nextUI

// ("use client");

// import React, { ReactNode, useState, useEffect } from "react";
// import { ThemeProvider } from "next-themes";

// interface ProvidersProps {
//   children: ReactNode;
// }

// export default function Providers({ children }: ProvidersProps) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div>{children}</div>;
//   }

//   return <ThemeProvider attribute="class">{children}</ThemeProvider>;
// }
