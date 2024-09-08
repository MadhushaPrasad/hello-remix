import {
  Links,
  Meta,
  Outlet,
  Scripts,
  Link,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "./app/styles/global.css" },
    { rel: "stylesheet", href: "./app/styles/index.css" },
  ];
};

// existing imports
import { getContacts } from "./data.ts";

// existing exports

export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { contacts } = useLoaderData<typeof loader>();

  return (
    <div>
      <div id="sidebar">
        {/* other elements */}
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite ? <span>★</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
