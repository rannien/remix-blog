import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { getCounties } from "~/models/county.server";

export const loader = async () => {
  return json({ counties: await getCounties() });
};

export default function CitiesMainPage() {
  const { counties } = useLoaderData<typeof loader>();

  return (
    <main>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="w-3/4 gap-4 p-4 flex text-center text-neutral-content items-center justify-center flex-col">
          <h1 className="mb-5 text-5xl font-bold">Counties Cities</h1>
          <p className="mb-5">
            Use the form below to list the existing cities or add new ones.
          </p>
          <Form>
            <label htmlFor="county">Select county</label>
            <div>
              <select
                name="county"
                id="county"
                className="select select-bordered w-full max-w-xs"
              >
                {counties.map((county) => (
                  <option value={county.id} key={county.id}>
                    {county.name}
                  </option>
                ))}
              </select>
            </div>
          </Form>

          <div className="flex flex-col w-64">
            <Link to="">Back To List</Link>
            <Link to="new">New City</Link>
          </div>

          <div className="flex w-full justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
