import { ChakraProvider } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { Fragment } from "react";
import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import { SupabaseProvider } from "~/utils/supabase-client";
import { Navbar } from "./components/Navbar";
import styles from "./tailwind.css";
import { Env } from "./utils/env";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const loader = () => {
  const ev = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SERVICE_KEY: process.env.SERVICE_KEY,
  };
  console.log("env: ", ev);
  return ev;
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Meta />
        <Links />
      </head>

      <body>
        <main>
          <Layout>
            <Fragment>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              {process.env.NODE_ENV === "development" && <LiveReload />}
            </Fragment>
          </Layout>
        </main>
      </body>
    </html>
  );
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const loader = useLoaderData<Env>();

  const supabase = createClient(loader.SUPABASE_URL, loader.SERVICE_KEY);
  return (
    <SupabaseProvider supabase={supabase}>
      <ChakraProvider>
        <Navbar />
        {children}
      </ChakraProvider>
    </SupabaseProvider>
  );
};
