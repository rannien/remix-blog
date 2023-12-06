import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { getCities } from "~/models/city.server";

export const loader = async () => {
  return json({ cities: await getCities() });
};

export default function CitiesMainPage() {
  const { cities } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Megye Város</h1>

      <div className="flex">
        <div className="flex flex-col">
          <div>
            <h2>Új város felvétele</h2>
            <Form>
              <label htmlFor="county">Megye</label>
              <div>
                <select name="county" id="county">
                  <option value="1">Békés Megye</option>
                  <option value="2">Csongrád Megye</option>
                </select>
              </div>
            </Form>

            <Link to="new">New City</Link>
          </div>
          <div>
            <ul>
              {cities.map((city) => (
                <li key={city.id}>
                  <Link
                    to={city.id.toString()}
                    className="text-blue-600 underline"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
