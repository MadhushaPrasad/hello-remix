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
      <div id="app" className="md:flex antialiased">
        <aside className="w-full md:h-screen md:w-80 bg-gray-900 md:flex md:flex-col">
          <header className="border-b border-solid border-gray-800 flex-grow">
            <h1 className="py-6 px-4 text-gray-100 text-base font-medium">
              Add new Contact
            </h1>
            <div className="py-2 px-2">
              <form>
                <input
                  type="text"
                  id="contactName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Conrtact Name"
                  required
                />
                <button
                  type="submit"
                  className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  New
                </button>
              </form>
            </div>
          </header>
          <nav className="overflow-y-auto h-full flex-grow text-white py-2 px-2">
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
          </nav>
          <section
            id="user"
            className="p-4 border-t border-solid border-gray-800"
          >
            <div className="flex">
              <img
                src="http://preview.janlosert.com/static/media/a07.f7e8bebd.jpg"
                className="rounded-full h-10"
                alt=""
              />
              <div className="flex flex-col p-2">
                <span className="text-white pb-1">Madhusha Prasad</span>
                <span className="text-xs text-gray-500">Learner</span>
              </div>
            </div>
          </section>

          <footer className="p-4 border-t border-solid border-gray-800">
            <h4 className="pb-2 text-gray-100 text-sm">
              © Buildings Ltd. 2024
            </h4>
            <p className="text-gray-600 text-xs leading-normal">
              create this for do remix challenge
            </p>
          </footer>
        </aside>

        <main className="bg-gray-100 h-screen w-full overflow-y-auto p-10">
          <div id="detail">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
