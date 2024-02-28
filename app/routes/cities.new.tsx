import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { store } from "~/models/city.server";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = String(formData.get("name"));
  const countyId = Number(params.countyId);

  invariant(params.countyId, "params.countyId is required");

  await store({ name, countyId });

  return redirect(`/cities?countyId=${params.countyId}`);
};

export default function CitiesNew() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-bold">New City</h3>

      <Form method="post" className="flex gap-4 p-4 bg-accent rounded-md">
        <label
          className="input input-bordered flex items-center gap-2"
          htmlFor="name"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <input
            className="grow"
            type="text"
            name="name"
            id="name"
            placeholder={"Acme Town"}
            aria-labelledby="name"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Create City
        </button>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="btn btn-active"
        >
          Cancel
        </button>
      </Form>
    </div>
  );
}
