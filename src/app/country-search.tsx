import { useEffect, useState } from "react";
import { onlyLettersRegexp } from "./utils";

type Props = {
  filter: string;
  setFilter: Function;
};

export const CountrySearch: React.FC<Props> = ({ filter = "", setFilter }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError(
      !onlyLettersRegexp.test(filter)
        ? "Country code can only consist of letters"
        : "",
    );
  }, [filter]);

  return (
    <div className="flex justify-center">
      <search>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value.trim())}
          className="mb-3 w-full rounded-md border border-orange-200 bg-slate-200 px-4 py-3 text-center  text-slate-700 shadow-md focus:bg-white focus:outline-none dark:bg-slate-700 dark:text-slate-200 dark:focus:bg-slate-600"
          data-testid="country-code"
          type="text"
          placeholder="Filter by Country Code"
        />
        {error && (
          <p className="mb-2 text-center text-xs italic text-red-500">
            {error}
          </p>
        )}
      </search>
    </div>
  );
};
