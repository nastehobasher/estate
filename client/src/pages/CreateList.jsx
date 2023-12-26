import React from "react";

export default function CreateList() {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">
        Create a Listing{" "}
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className=" rounded-lg p-3 border"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className=" rounded-lg p-3 border"
            id="name"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className=" rounded-lg p-3 border"
            id="name"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3  border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3  border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>discount Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4" >
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal">
              The first image will be the cover (max 6){" "}
            </span>
          </p>
          <div className="flex gap-4">
            <input className="p-3 border border-gray-300 rounded w-full" type="file" accept="image/*" multiple/>
            <button className="p-3 border border-green-800 text-green-700 uppercase rounded hover::bg-dark disabled:opacity-80">Upload</button>
          </div>
          <button className="bg-slate-700 p-3 rounded-lg uppercase text-white mt-5 hover:opacity-95 disabled:opacity-80">create listing</button>
        </div>
      </form>
    </div>
  );
}
