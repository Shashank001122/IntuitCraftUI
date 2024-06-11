import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleCountry() {
  const [country, setCountry] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`http://localhost:5000/name/${name}`);
        const data = await res.json();
        setCountry(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  if (!country) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen">
          <article>
            <img src={country.flags.svg} alt={country.name.common} className="w-full" />
          </article>

          <article>
            <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl">
              {country.name.official}
            </h1>

            <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
              <li>Capital: {country.capital[0]}</li>
              <li>Population: {country.population.toLocaleString()}</li>
              <li>Region: {country.region}</li>
              <li>Subregion: {country.subregion}</li>
              <li>Native Name: {country.name.nativeName}</li>
              <li>Languages: {country.languages.map(lang => lang.name).join(", ")}</li>
              <li>Currencies: {country.currencies.map(curr => curr.name).join(", ")}</li>
            </ul>

            {country.borders && (
              <>
                <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                  Borders:
                </h3>
                <ul className="flex flex-wrap items-start justify-start gap-2">
                  {country.borders.map((border, index) => (
                    <li
                      key={index}
                      className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                    >
                      {border}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              to="/"
              className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
            >
              &larr; Back
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
