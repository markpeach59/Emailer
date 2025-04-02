import type { LinksFunction, MetaFunction, LoaderFunction} from "@remix-run/node";
import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from '@clerk/remix/ssr.server'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

// Export as the root route loader
export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, ({ request }) => {
    const { sessionId, userId, getToken } = request.auth
    // Add logic to fetch data
    return { yourData: 'here' }
  })
}

function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
       
      </body>
    </html>
  );
}


export default ClerkApp(App);

