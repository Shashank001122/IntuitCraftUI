import { useState, useEffect } from "react";
import Article from "./Article";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchLanguage, setSelectedLanguage] = useState("");
  const [searchCurrency, setSelectedCurrency] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [searchType, setSearchType] = useState("");
  const regions = ["Europe", "Asia", "Africa", "Oceania", "Americas", "Antarctic"];

  useEffect(() => {
    document.title = `Showing All Countries`;
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetch("http://localhost:5000/countries");
      const data = await res.json();
      setCountries(data);
      setIsSearchPerformed(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filterByRegion = async (e) => {
    try {
      setSelectedRegion(e.target.value);
      const res = await fetch(`http://localhost:5000/region/${e.target.value}`);
      const data = await res.json();
      setCountries(data);
      setIsSearchPerformed(true);
    } catch (error) {
      console.error(error);
    }
  };

  const searchNameSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/name/${searchText}`);
    const data = await res.json();
    setCountries(data);
    setIsSearchPerformed(true);
  };

  const searchLanguageSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/countries");
    const data = await res.json();
    let val = data.filter((country) =>
      country.languages.some((lang) => lang.name.toLowerCase() === searchLanguage.toLowerCase())
    );
    setCountries(val);
    setIsSearchPerformed(true);
  };

  const searchCurrencySubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/countries");
    const data = await res.json();
    let val = data.filter((country) =>
      country.currencies.some((curr) => curr.name.toLowerCase().includes(searchCurrency.toLowerCase()))
    );
    setCountries(val);
    setIsSearchPerformed(true);
  };

  const resetFilters = async () => {
    fetchCountries();
    setSearchText("");
    setSelectedRegion("");
    setSelectedLanguage("");
    setSelectedCurrency("");
    setIsSearchPerformed(false);
    setSearchType("");
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      {!countries.length ? (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-gray-900 font-bold uppercase tracking-wide text-4xl dark:text-white mb-4">
            No Result
          </h1>
          <button
            type="button"
            onClick={fetchCountries}
            className="py-2 px-3 bg-gray-500 text-white shadow rounded outline-none cursor-pointer hover:bg-gray-600 text-sm"
          >
            Reload All Countries
          </button>
        </div>
      ) : (
        <section className="container mx-auto p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-start mb-8">
            <select
              name="search-type"
              id="search-type"
              className="w-52 py-2 px-3 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 text-sm"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="">Select Search Type</option>
              <option value="name">Search by Name</option>
              <option value="region">Search by Region</option>
              <option value="language">Search by Language</option>
              <option value="currency">Search by Currency</option>
            </select>

            {searchType === "name" && (
              <form onSubmit={searchNameSubmit} className="flex items-center ml-4">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search Country Name"
                  required
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="py-2 px-3 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                />
                <input
                  type="submit"
                  value="Search"
                  className="ml-2 py-2 px-3 bg-blue-500 text-white shadow rounded outline-none cursor-pointer hover:bg-blue-600 text-sm"
                />
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 py-2 px-3 bg-gray-500 text-white shadow rounded outline-none cursor-pointer hover:bg-gray-600 text-sm"
                >
                  Reset
                </button>
              </form>
            )}

            {searchType === "region" && (
              <div className="flex items-center ml-4">
                <select
                  name="filter-by-region"
                  id="filter-by-region"
                  className="w-52 py-2 px-3 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 text-sm"
                  value={selectedRegion}
                  onChange={filterByRegion}
                >
                  <option value="">Search by Region</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 py-2 px-3 bg-gray-500 text-white shadow rounded outline-none cursor-pointer hover:bg-gray-600 text-sm"
                >
                  Reset
                </button>
              </div>
            )}

            {searchType === "language" && (
              <form onSubmit={searchLanguageSubmit} className="flex items-center ml-4">
                <input
                  type="text"
                  name="filter-by-language"
                  id="filter-by-language"
                  placeholder="Search by Language"
                  value={searchLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="py-2 px-3 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                />
                <input
                  type="submit"
                  value="Search"
                  className="ml-2 py-2 px-3 bg-blue-500 text-white shadow rounded outline-none cursor-pointer hover:bg-blue-600 text-sm"
                />
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 py-2 px-3 bg-gray-500 text-white shadow rounded outline-none cursor-pointer hover:bg-gray-600 text-sm"
                >
                  Reset
                </button>
              </form>
            )}

            {searchType === "currency" && (
              <form onSubmit={searchCurrencySubmit} className="flex items-center ml-4">
                <input
                  type="text"
                  name="filter-by-currency"
                  id="filter-by-currency"
                  placeholder="Search by Currency"
                  value={searchCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="py-2 px-3 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                />
                <input
                  type="submit"
                  value="Search"
                  className="ml-2 py-2 px-3 bg-blue-500 text-white shadow rounded outline-none cursor-pointer hover:bg-blue-600 text-sm"
                />
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 py-2 px-3 bg-gray-500 text-white shadow rounded outline-none cursor-pointer hover:bg-gray-600 text-sm"
                >
                  Reset
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {countries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
