import { Header } from "components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from "./+types/create-trip";

// Types for API and cleaned country data
type Country = {
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap?: string;
};

type CountryAPIResponse = {
  name: { common: string };
  latlng: [number, number];
  flags?: { emoji?: string }; // REST Countries v3 uses this
  maps?: { openStreetMap?: string };
};

// Loader function to fetch country data
export const loader = async () => {
  const url =
    "https://restcountries.com/v3.1/all?fields=flags,name,latlng,maps";

  const response = await fetch(url);
  console.log("Fetch status:", response.status); // Optional for debugging

  if (!response.ok) {
    throw new Error(`Failed to fetch countries (status ${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response format (expected an array)");
  }

  return (data as CountryAPIResponse[]).map((country) => ({
    emoji: country.flags?.emoji ?? "",
    name: country.name.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMap,
  }));
};

// React component for the Create Trip page
const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission logic here
  };

  const countries = loaderData as Country[];

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
    emoji: country.emoji,
  }));

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a new Trip"
        description="View and Edit AI generated travel plans"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a Country"
              itemTemplate={(data: any) => (
                <div>
                  <span>{data.text}</span>
                </div>
              )}
              className="combo-box"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
