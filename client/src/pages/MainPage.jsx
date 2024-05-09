import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import template from "../assets/template.png";

import { useState, useEffect } from "react";
import { Disclosure, Input } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  filterProcessors,
  searchProcessors,
  deleteCategory,
} from "../utils/api";
import { StarIcon, TrashIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainPage() {
  const { microprocessors, types, sockets, manufacturers, reviews } =
    useLoaderData();
  const [processors, setProcessors] = useState(microprocessors);
  const [filters, setFilters] = useState([
    {
      id: "type",
      name: "Types",
      options: types.data.map((type) => {
        return { value: type.name, label: type.name, checked: false };
      }),
    },
    {
      id: "manufacturer",
      name: "Manufacturers",
      options: manufacturers.data.map((manufacturer) => {
        return {
          value: manufacturer.name,
          label: manufacturer.name,
          checked: false,
        };
      }),
    },
    {
      id: "socket",
      name: "Sockets",
      options: sockets.data.map((socket) => {
        return { value: socket.name, label: socket.name, checked: false };
      }),
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await searchProcessors(searchQuery);
      setProcessors(response.data);
    };
    getData();
  }, [searchQuery, filters]);

  const handleFilter = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let manufacturers = [],
      sockets = [],
      types = [];
    for (let pair of formData.entries()) {
      if (pair[0] === "manufacturer[]") manufacturers.push(pair[1]);
      if (pair[0] === "socket[]") sockets.push(pair[1]);
      if (pair[0] === "type[]") types.push(pair[1]);
    }
    const res = await filterProcessors({
      manufacturers: manufacturers,
      sockets: sockets,
      types: types,
    });
    setProcessors(res.data);
  };
  return (
    processors && (
      <>
        <Header />
        <div className="bg-white">
          <div>
            <main className="mx-auto w-3/4">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Processors ({processors.results})
                </h1>
                <div className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
                  <Input
                    placeholder="Search for a model ..."
                    className="w-full"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  ></Input>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form onSubmit={handleFilter}>
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onClick={(e) =>
                                          e.target.form.requestSubmit()
                                        }
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                    {section.name !== "Types" && (
                                      <TrashIcon
                                        className="fill-red-700 w-5 h-5 ml-2 cursor-pointer"
                                        onClick={async () => {
                                          await deleteCategory(
                                            section.name,
                                            option.value
                                          );
                                          setFilters(
                                            filters.map((filter) => {
                                              return {
                                                ...filter,
                                                options: filter.options.filter(
                                                  (inOption) =>
                                                    inOption.value !==
                                                    option.value
                                                ),
                                              };
                                            })
                                          );
                                        }}
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      <Link
                        className="border-blue-100 border-2 rounded-lg cursor-pointer p-4"
                        to={"/create"}
                      >
                        <div className="text-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                          <PlusCircleIcon className="stroke-gray-500"></PlusCircleIcon>
                        </div>
                        <p className="mt-1 text-center text-lg font-medium text-gray-900">
                          Create new
                        </p>
                      </Link>
                      {processors.data.map((processor) => (
                        <Link
                          className="border-blue-100 border-2 rounded-lg cursor-pointer p-4"
                          key={processor.microprocessor_id}
                          to={"/processor/" + processor.microprocessor_id}
                        >
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                            <img
                              src={template}
                              alt="item"
                              className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <h3 className="mt-4 text-sm text-gray-700">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((current_rating) => (
                                <StarIcon
                                  key={current_rating}
                                  className={classNames(
                                    reviews.data.filter(
                                      (review) =>
                                        review.microprocessor_id ===
                                        processor.microprocessor_id
                                    )[0]?.rating >= current_rating
                                      ? "text-yellow-400 cursor-pointer"
                                      : "text-gray-200 cursor-pointer",
                                    "h-5 w-5 flex-shrink-0 cursor-pointer"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {processor.model}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </>
    )
  );
}
