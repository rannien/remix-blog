import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getCities } from "~/models/city.server";

export const loader = async () => {
  return json({ cities: await getCities() });
};

export default function CitiesLanding() {
  const { cities } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>Counties and Cities</h2>

      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            <Link to={city.id.toString()} className="text-blue-600 underline">
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
