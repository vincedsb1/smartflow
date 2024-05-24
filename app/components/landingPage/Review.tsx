import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ReviewProps {
  name: string;
  jobTitle: string;
  consumerPhoto: string;
  review: string;
  grade: number;
}

const Review: React.FC<ReviewProps> = ({
  name,
  jobTitle,
  consumerPhoto,
  review,
  grade,
}) => {
  const stars = Array(grade).fill(0);

  return (
    <div>
      <div
        id="reviewContainer"
        className="flex flex-row w-[390px] justify-center items-center mb-8"
      >
        <div
          id="reviewPhotoContainer"
          className="flex justify-center items-center w-1/3 h-full"
        >
          <div className="w-16 h-16 flex justify-center items-center">
            <Image
              src={consumerPhoto}
              alt={name}
              layout="intrinsic"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        </div>
        <div id="reviewContentContainer" className="flex flex-col w-2/3">
          <div id="reviewCustomerNameCity" className="flex pb-2 font-title">
            <p>
              <span className="text-neutral-950 dark:text-neutral-300 font-bold">
                {name}
              </span>{" "}
              |{" "}
              <span className="text-neutral-500 dark:text-neutral-400">
                {jobTitle}
              </span>
            </p>
          </div>
          <div
            id="reviewText"
            className="flex pb-4 font-title text-neutral-950 dark:text-neutral-300"
          >
            <p>{review}</p>
          </div>
          <div id="reviewScore" className="flex">
            {stars.map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="text-cyan-400 text-2xl pr-2"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
