import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getCities } from "~/models/city.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const countyId = url.searchParams.get("countyId");

  return json({
    cities: await getCities(countyId ? parseInt(countyId) : undefined),
  });
};

export default function CitiesLanding() {
  const { cities } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-4 gap-4">
      {cities.map((city) => (
        <div className="card bg-base-100 shadow-xl" key={city.id}>
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              <Link to={city.id.toString()}>{city.name}</Link>
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
