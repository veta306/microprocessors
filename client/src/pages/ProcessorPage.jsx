import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  deleteProcessor,
  getMicroprocessor,
  getReview,
  addReview,
  deleteReview,
} from "../utils/api";
import Header from "../components/Header";
import { XMarkIcon, StarIcon } from "@heroicons/react/20/solid";
import template from "../assets/template.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProcessorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [processor, setProcessor] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await getMicroprocessor(id);
      setProcessor(response.data[0]);
    };
    getData();
  }, [id]);

  const [reviews, setReviews] = useState();
  const [rating, setRating] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await getReview(id);
      setReviews(response);
      if (response.data.length > 0)
        setRating(
          response.data.reduce(
            (accumulator, review) => accumulator + review.rating,
            0
          ) / response.results
        );
    };
    getData();
  }, [id]);
  useEffect(() => {
    const getData = async () => {
      if (rating) await addReview(id, rating);
    };
    getData();
  }, [id, rating]);
  useEffect(() => {
    const getData = async () => {
      if (rating === 0) {
        await deleteReview(id);
        setRating(null);
      }
    };
    getData();
  }, [id, rating]);
  return (
    processor &&
    reviews && (
      <>
        <Header />
        <div className="flex flex-col w-3/4 items-center text-center mx-auto py-8 flex-wrap justify-around lg:flex-row lg:items-start">
          <div>
            <img className="h-48 w-48" src={template} alt="cpu photo" />
            <div className="flex justify-around my-4">
              <Link
                to={`/edit/${id}`}
                className="block w-20 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-900 border-indigo-500 border-2"
              >
                Edit
              </Link>
              <button
                type="button"
                className="block w-20 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={async () => {
                  try {
                    const response = await deleteProcessor(id);
                    if (response.status === 200) navigate("/");
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{processor.model}</h1>
            <p className="text-gray-600 mb-4">
              Manufacturer: {processor.manufacturer_name}
            </p>
            <p className="text-gray-600 mb-4">Type: {processor.type_name}</p>
            <p className="text-gray-600 mb-4">
              Socket: {processor.socket_name}
            </p>
            <p className="text-gray-600 mb-4">Cores: {processor.cores}</p>
            <p className="text-gray-600 mb-4">Threads: {processor.threads}</p>
            <p className="text-gray-600 mb-4">
              Base Clock: {processor.base_clock} GHz
            </p>
            <p className="text-gray-600 mb-4">
              Boost Clock: {processor.boost_clock} GHz
            </p>
            <p className="text-gray-600 mb-4">
              Process: {processor.process} nm
            </p>
            <p className="text-gray-600 mb-4">TDP: {processor.tdp} W</p>
            <p className="text-gray-600 mb-4">
              Release Date:{" "}
              {new Date(processor.released).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {processor.igpu_id && (
            <div>
              <h1 className="text-3xl font-bold mb-4">iGPU info</h1>
              <p className="text-gray-600 mb-4">
                Cores: {processor.igpu_model}
              </p>
              <p className="text-gray-600 mb-4">
                Base clock: {processor.igpu_base_clock} GHz
              </p>
              <p className="text-gray-600 mb-4">
                Boost Clock: {processor.igpu_boost_clock} GHz
              </p>
              <p className="text-gray-600 mb-4">
                Performance: {processor.igpu_flops} GFLOPS
              </p>
            </div>
          )}
          {/* Reviews */}
          <div>
            <h1 className="text-3xl font-bold mb-4">Rating</h1>
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((current_rating) => (
                  <StarIcon
                    key={current_rating}
                    className={classNames(
                      rating >= current_rating
                        ? "text-yellow-400 cursor-pointer"
                        : "text-gray-200 cursor-pointer",
                      "h-5 w-5 flex-shrink-0 cursor-pointer"
                    )}
                    aria-hidden="true"
                    onClick={() => setRating(current_rating)}
                  />
                ))}
                {rating && (
                  <XMarkIcon
                    className="h-7 w-7 cursor-pointer"
                    onClick={() => setRating(0)}
                  ></XMarkIcon>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
