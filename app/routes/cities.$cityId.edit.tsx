export default function CitiesEdit() {
  return (
    <div className="flex">
      <h2>Edit City</h2>

      <label htmlFor="city">Város: </label>
      <input type="text" name="city" id="city" defaultValue={"Orosháza"} />
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
