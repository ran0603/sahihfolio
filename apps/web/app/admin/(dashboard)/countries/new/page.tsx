import { getCountries } from "@/lib/countries/actions";
import { getSources } from "@/lib/sources/get-sources";
import CountryNewContent from "./country-new-content";

export default async function NewCountryPage() {
  const [countries, sources] = await Promise.all([
    getCountries(),
    getSources(),
  ]);

  return <CountryNewContent existingCountries={countries} sources={sources} />;
}

