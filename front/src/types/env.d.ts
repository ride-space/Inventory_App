declare namespace NodeJS {
  interface ProcessEnv {
    readonly BASE_URL: string;
    readonly DATABASE_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly LINE_CLIENT_ID: string;
    readonly LINE_CLIENT_SECRET: string;
    readonly NEXT_PUBLIC_API_BASE_URL: string;
    readonly NEXT_PUBLIC_NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_URL: string;

    readonly SECRET: string;
  }
}
