import { useNavigate } from "@remix-run/react";

export default function CitiesEdit() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <h2>Edit City</h2>

      <label htmlFor="city">Város: </label>
      <input type="text" name="city" id="city" defaultValue={"Orosháza"} />
      <button>Edit</button>
      <button onClick={() => navigate(-1)} type="button">
        Cancel
      </button>
    </div>
  );
}
