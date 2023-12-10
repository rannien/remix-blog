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
      <h1>Megye Város</h1>

      <div className="flex">
        <div className="flex flex-col">
          <div>
            <Form>
              <label htmlFor="county">Megye</label>
              <div>
                <select name="county" id="county">
                  {counties.map((county) => (
                    <option value={county.id} key={county.id}>
                      {county.name}
                    </option>
                  ))}
                </select>
              </div>
            </Form>

            <Link to="new">New City</Link>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
