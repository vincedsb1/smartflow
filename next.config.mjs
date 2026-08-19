/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    if (process.env.NEXT_PUBLIC_ENV === "local") {
      return [
        // {
        //   source: "/login",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/add",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/cgu",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/connexion",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/legal",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/mailauth",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/onboarding",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/organize",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register-birthday",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register-firstname",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register-password",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/today",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/user",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/login",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/verify-email",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/verify-email-prospect",
        //   destination: "/",
        //   permanent: true,
        // },
      ];
    }

    if (process.env.NEXT_PUBLIC_ENV === "prod") {
      // Redirections spécifiques pour l'environnement de production
      return [
        // {
        //   source: "/login",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/add",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/cgu",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/connexion",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/legal",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/mailauth",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/onboarding",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/organize",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register-birthday",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register-firstname",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/register-password",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/today",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/user",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/login",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/verify-email",
        //   destination: "/",
        //   permanent: true,
        // },
        // {
        //   source: "/verify-email-prospect",
        //   destination: "/",
        //   permanent: true,
        // },
      ];
    }

    return [];
  },
  reactStrictMode: true,
};

export default nextConfig;
