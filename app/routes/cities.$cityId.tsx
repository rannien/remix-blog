import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

export default function CitiesShow() {
  return (
    <main>
      <div className="flex">
        <h2>Show City</h2>

        <a href="#">Edit</a>
        <a href="#">Delete</a>
      </div>
    </main>
  );
}
