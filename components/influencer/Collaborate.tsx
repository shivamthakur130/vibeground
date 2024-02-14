"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Post3 from "@/assets/images/p03.png";
import Image from "next/image";
import { getAvailable } from "@/services/collaborate.service";
import { ErrorMessage } from "@/components/layout/ToastifyMessages";
import ArrowLeft from "@/assets/images/svg/arrow-left.svg";
import PageWrapper from "../common/PageWrapper";

const Collaborate = () => {
  const [loading, setLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);

  const fetchData = async () => {
    (async () => {
      setLoading(true);
      const { data, error } = await getAvailable();
      if (error) {
        setLoading(false);
        setCheckStatus(false);
        handleError(error);
        return;
      }
      if (typeof data === "object" && data !== null && "data" in data) {
        if (data?.success && data?.data?.status === "active") {
          setCheckStatus(true);
        } else {
          setCheckStatus(false);
        }
      }
      setLoading(false);
    })();
  };
  useEffect(() => {
    fetchData().catch((err) => {
      console.log(err);
      setLoading(false);
      setCheckStatus(false);
    });
  }, []);

  const handleError = (error: any) => {
    if (error.response) {
      let message = error.response.data.message;
      ErrorMessage("Collaborate", message);
    } else if (error.request) {
      ErrorMessage(
        "Collaborate",
        "Network Error. Please check your internet connection."
      );
    } else {
      ErrorMessage(
        "Collaborate",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto sm:mt-10 sm:mb-24 mb-20 px-5">
          <h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center mb-8 mt-10">
            <div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50">
              <Link href="/influencer">
                <Image src={ArrowLeft} height={32} width={32} alt="#" />
              </Link>
            </div>
            <div className="ml-10">Collaborate</div>
          </h2>
          <div className="bg-gray-950 mx-auto flex items-center justify-center rounded-md">
            <Image src={Post3} width={500} height={500} alt="meet&greet" />
          </div>
          <div className=" space-y-4 text-lg mt-3">
            <p>
              Welcome to the exciting world of collaborating with Vibeground!
              Here you have the unique opportunity to choose different
              collaborations that can take your career to a new level. This is
              the chance you should not miss - be part of this exciting journey.
            </p>
            <p>
              Our collaborations are more than just opportunities, they are
              partnerships that open the door to endless possibilities. We
              firmly believe that models should reach their full potential and
              that{"'"}s why we offer them the platform to realize their dreams.
            </p>

            <p>
              By choosing to work with Vibeground, you as a creative can not
              only increase your reach, but also showcase your unique talents
              and skills.
            </p>

            <p>
              It{"'"}s an opportunity to collaborate with creative minds,
              develop new ideas and build a network that will support your
              career in the long term.
            </p>

            <p>
              Our community of models and creatives is a vibrant and inspiring
              environment where talent flourishes and success is achieved. It
              {"'"}s all about turning visions into reality and impressing the
              world with your unique style.
            </p>

            <p>
              So don{"'"}t hesitate any longer and sign up for the exciting
              collaborations with Vibeground. This opportunity could be the key
              to international reach and we are here to embark on this exciting
              journey with you. Become part of a community and experience
              extraordinary collaborations with Vibeground.
            </p>

            <p className="text-base py-2  font-PoppinsRegular text-gray-700">
              Sign up to receive more information!
            </p>
            {!checkStatus && !loading && (
              <div className="mx-auto flex items-center justify-center">
                <Link href="/influencer/collaborate-details">
                  <button className="btn btn-default px-24 py-4 mt-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
                    Sign me up
                  </button>
                </Link>
              </div>
            )}

            {checkStatus && !loading && (
              <div className="text-xl font-PoppinsRegular text-gray-700 py-4">
                {"You’re"} already signed up. we will contact you soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Collaborate;
