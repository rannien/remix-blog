import { Form, Link, Outlet } from "@remix-run/react";

export default function CitiesMainPage() {
  return (
    <main>
      <h1>Megye Város</h1>

      <div className="flex">
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
          <Outlet />
        </div>
      </div>
    </main>
  );
}
