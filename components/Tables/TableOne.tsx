import { useState } from "react";
import data from "@/components/data_exemple2.json";

const TableOne = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Function to handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtered data based on the search term
  const filteredData = data.molecules.map((molecule) => ({
    ...molecule,
    medications: molecule.medications.filter((medication) =>
      medication.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((molecule) => molecule.medications.length > 0); // Only keep molecules with matching medications

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Medications and Price History
      </h4>
      <form action="https://formbold.com/s/unique_form_id" method="POST">
        <div className="relative mb-8 ">
          <button className="absolute left-0 top-1/2 -translate-y-1/2">
            <svg
              className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm} // Controlled input
            onChange={handleSearch} // Call function when input changes
            className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
          />
        </div>
      </form>
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Medication
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Dosage
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Latest Price (EUR)
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Latest Price (USD)
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price Date
            </h5>
          </div>
        </div>

        {/* Table Rows */}
        {filteredData.map((molecule, moleculeIndex) =>
          molecule.medications.map((medication, medicationIndex) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                medicationIndex === molecule.medications.length - 1 &&
                moleculeIndex === filteredData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={`${moleculeIndex}-${medicationIndex}`}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{medication.name}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {medication.dosage}
                </p>
              </div>

              {/* Latest Price (EUR) */}
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  €
                  {medication.priceHistory[
                    medication.priceHistory.length - 1
                  ].priceEUR.toFixed(2)}
                </p>
              </div>

              {/* Latest Price (USD) */}
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">
                  $
                  {medication.priceHistory[
                    medication.priceHistory.length - 1
                  ].priceUSD.toFixed(2)}
                </p>
              </div>

              {/* Price Date */}
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {
                    medication.priceHistory[medication.priceHistory.length - 1]
                      .date
                  }
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TableOne;
