import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { createProcessor } from "../utils/api";
import { useState } from "react";

export default function CreatePage() {
  const navigate = useNavigate();
  const [igpuVisible, setigpuVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await createProcessor({
        model: formData.get("model"),
        manufacturer_name: formData.get("manufacturer"),
        igpu_name: igpuVisible ? formData.get("iGPU") : null,
        igpu_base_clock: igpuVisible ? formData.get("ibase") : null,
        igpu_boost_clock: igpuVisible ? formData.get("iboost") : null,
        igpu_flops: igpuVisible ? formData.get("flops") : null,
        type_name: formData.get("type"),
        socket_name: formData.get("socket"),
        cores: formData.get("cores"),
        threads: formData.get("threads"),
        base_clock: formData.get("base"),
        boost_clock: formData.get("boost"),
        process: formData.get("process"),
        tdp: formData.get("tdp"),
        released: formData.get("released"),
      });
      if (response.status === 200) navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Model
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="model"
                    id="model"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="manufacturer"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Manufacturer
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socket"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Socket
                </label>
                <div className="mt-2">
                  <input
                    id="socket"
                    name="socket"
                    required
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Desktop</option>
                    <option>Server</option>
                    <option>Laptop</option>
                    <option>Mobile</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="released"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Release date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="released"
                    required
                    id="released"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="cores"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cores
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="cores"
                    required
                    id="cores"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="threads"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Threads
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="threads"
                    required
                    id="threads"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="base"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Base clock, GHz
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="base"
                    required
                    id="base"
                    step="0.1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="boost"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Boost clock, GHz
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="boost"
                    required
                    id="boost"
                    step="0.1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="process"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Process, nm
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="process"
                    required
                    id="process"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="tdp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  TDP, W
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="tdp"
                    required
                    id="tdp"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="iGPU"
                  className="flex text-lg font-medium leading-6 text-gray-900"
                >
                  iGPU
                  <label className="flex ml-3 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onClick={() => setigpuVisible(!igpuVisible)}
                    ></input>
                    <div
                      className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                     dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white
                       after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </label>
              </div>
              {igpuVisible && (
                <>
                  <div className="mt-2 col-span-full">
                    <label
                      htmlFor="iGPU"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Model
                    </label>
                    <input
                      type="text"
                      name="iGPU"
                      id="iGPU"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="ibase"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Base clock, GHz
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="ibase"
                        id="ibase"
                        required
                        step="0.1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="iboost"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Boost clock, GHz
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="iboost"
                        id="iboost"
                        required
                        step="0.1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="flops"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Permormance, GFLOPS
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="flops"
                        id="flops"
                        required
                        step="0.1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="my-6 flex items-center justify-end gap-x-6">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
