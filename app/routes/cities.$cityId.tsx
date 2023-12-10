import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCity } from "~/models/city.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.cityId, "params.cityId is required");

  const city = await getCity(Number(params.cityId));

  invariant(city, `City not found: ${params.cityId}`);

  return json({ city });
};

export default function CitiesShow() {
  const { city } = useLoaderData<typeof loader>();

  return (
    <main>
      <div className="flex">
        <h2>{city.name}</h2>

        <a href="#">Edit</a>
        <a href="#">Delete</a>
      </div>
    </main>
  );
}
