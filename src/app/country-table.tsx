import { useQuery } from "@apollo/client";
import {
  Country,
  GetCountriesDocument,
  GetCountriesQuery,
} from "../graphql/__generated__/graphql";
import { onlyLettersRegexp } from "./utils";

const COLUMNS = ["Country Name", "Code"];

export const CountryTable = ({ filter = "" }) => {
  const getFilter = (filter: string) => {
    if (!onlyLettersRegexp.test(filter)) {
      return "";
    }
    return filter?.toUpperCase() ?? "";
  };
  const { data, loading, error } = useQuery<GetCountriesQuery>(
    GetCountriesDocument,
    {
      variables: {
        filter: getFilter(filter),
      },
    },
  );

  if (error) return <ErrorMessage error={error.message} />;
  if (loading) return <TableLoading />;

  return (
    <div>
      <div className=" overflow-hidden rounded-xl bg-slate-50 shadow-md dark:bg-slate-700">
        {data && data.countries.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                {COLUMNS.map((columnName) => (
                  <th
                    key={columnName}
                    className={`border-b bg-slate-200  p-8 pb-2 pl-8 pt-4 text-lg font-medium  text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 ${
                      columnName === "Code" ? "text-right" : "text-left"
                    }`}
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {data?.countries.map(({ name, code }) => (
                <CountryRow key={code} name={name} code={code} />
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyResponse />
        )}
      </div>
    </div>
  );
};

const CountryRow: React.FC<Pick<Country, "name" | "code">> = ({
  name,
  code,
}) => (
  <tr
    key={name + code}
    className="dark:hover:bg-slate text-md border-b border-slate-100 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
  >
    <td className="p-8 pb-1 pl-8 pt-1 text-left">{name}</td>
    <td className="p-8 pb-3 pl-8 pt-0 text-right">{code}</td>
  </tr>
);

const TableLoading: React.FC = () => (
  <p
    className="mt-4 text-center text-slate-700 dark:text-slate-50"
    data-testid="loading"
  >
    Loading...
  </p>
);
type ErrorProps = {
  error: string;
};
const ErrorMessage: React.FC<ErrorProps> = ({ error }) => (
  <p className="mt-4 text-center text-lg text-red-500" data-testid="error">
    {error}
  </p>
);

const EmptyResponse = () => (
  <p className="m-4 text-center text-slate-700 dark:text-slate-50">
    No countries with this code
  </p>
);
