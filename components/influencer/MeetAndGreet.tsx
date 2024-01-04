"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Post1 from "@/assets/images/p01.png";
import Image from "next/image";
import { getAvailable } from "@/services/meetAndGreet.service";
import { ErrorMessage } from "@/components/layout/ToastifyMessages";
import ArrowLeft from "@/assets/images/svg/arrow-left.svg";
import PageWrapper from "../common/PageWrapper";

const MeetAndGreet = () => {
  const [loading, setLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);

  const fetchMeetAndGreet = async () => {
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
    fetchMeetAndGreet().catch((err) => {
      console.log(err);
      setLoading(false);
      setCheckStatus(false);
    });
  }, []);

  const handleError = (error: any) => {
    if (error.response) {
      let message = error.response.data.message;
      ErrorMessage("Meet & greet", message);
    } else if (error.request) {
      ErrorMessage(
        "Meet & greet",
        "Network Error. Please check your internet connection."
      );
    } else {
      ErrorMessage(
        "Meet & greet",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <PageWrapper>
      <div className="Email text-left px-5 max-w-xl mx-auto mt-0 mb-10 ">
        <h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center mb-8 mt-10">
          <div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50">
            <Link href="/influencer">
              <Image src={ArrowLeft} height={32} width={32} alt="#" />
            </Link>
          </div>
          <div className="ml-10">Meet & Greet</div>
        </h2>
        <div className="bg-gray-950 mx-auto flex items-center justify-center rounded-md">
          <Image src={Post1} width={500} height={500} alt="meet&greet" />
        </div>
        <div className=" ">
          {/* <div className="text-2xl font-PoppinsSemiBold text-111 py-2 pt-10">
					Meet & Greet
				</div> */}
          <p className="text-xl py-4 font-PoppinsRegular text-gray-700">
            {
              "It's every fan's dream to meet their favorite creator in person once in a lifetime."
            }
          </p>
          <ul className="list space-y-2 font-PoppinsRegular text-gray-700">
            <li>
              For you as a creator, however, this harbours some risks, which is
              why you have refrained from doing so until now.
            </li>
            <li>
              Vibeground Meet & Greet offers creators the opportunity to make
              their {"fans'"} dreams come true.
            </li>
            <li>
              You can show your fans that you are approachable and thus collect
              many plus points with your fans to make them even more loyal
              followers.
            </li>
            <li>
              We take care of everything! We organize an exclusive location and
              the corresponding supporting programme, which enables you to have
              a nice and safe meet & greet with your fans.
            </li>
            <li>Sign up to receive more information from us.</li>
          </ul>
          {!checkStatus && !loading && (
            <div className="mx-auto flex items-center justify-center">
              <Link href="/influencer/meet-greet-details">
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
    </PageWrapper>
  );
};

export default MeetAndGreet;
