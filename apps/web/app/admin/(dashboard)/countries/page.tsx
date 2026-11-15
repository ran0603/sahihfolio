import { getCountries } from "@/lib/countries/actions";
import CountriesContent from "./countries-content";

export default async function CountriesPage() {
  const countries = await getCountries();

  return <CountriesContent countries={countries} />;
}
