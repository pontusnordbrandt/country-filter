import { CountrySearch } from "./country-search";
import { CountryTable } from "./country-table";
import { useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <div className="flex justify-center pt-4">
        <ThemeSwitcher />
      </div>
      <section className="m-auto px-8 py-4 sm:w-full md:w-2/3 lg:w-2/3">
        <CountrySearch filter={filter} setFilter={setFilter} />
        <CountryTable filter={filter} />
      </section>
    </>
  );
}

export default App;
