"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import PageWrapper from "../common/PageWrapper";
import ArrowLeft from "@/assets/images/svg/arrow-left.svg";

const Newcomer = () => {
  return (
    <PageWrapper>
      <div className="Email mx-auto mt-40 mb-40">
        <h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex  mb-10">
          <div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 hover:bg-gray-100 active:bg-gray-200">
            <Link href="/experience">
              <Image src={ArrowLeft} height={32} width={32} alt="#" />
            </Link>
          </div>
          <div className="ml-10">Newcomer of the month</div>
        </h2>
        <div className="space-y-4 text-lg mb-10">
          <p>Welcome to the election of the Newcomer Of The Month!</p>

          <p>
            In our world, it{"'"}s not just about showing the most beautiful
            faces and bodies, but also about highlighting a wide range of
            creators and their different personalities.{" "}
          </p>

          <p>
            We firmly believe that true beauty lies in diversity. That{"'"}s why
            all models, no matter where they come from or what they look like,
            have the opportunity to register with us and showcase their
            uniqueness.
          </p>

          <p>
            By participating in the Newcomer Of The Month, you as a creator have
            the chance to present yourself to a broad audience on Vibeground.
            This means that you will gain more visibility and attention, which
            will benefit you and your reach. It{"'"}s not just about increasing
            your reach, but also about being chosen by fans and creating a
            special connection with them.
          </p>

          <p>
            Our world is not just a place of competition but also one of support
            and unity among models and their fans. We are a community that
            celebrates the beauty and uniqueness of each model.
          </p>

          <p>
            So create a unique experience for your fans and make yourself more
            visible to them!
          </p>
        </div>

        {/* <p className="text-xl">
          This is a special one-time experience that can only be done once
        </p>

        <Link href="/influencer">
          <button className="btn btn-default px-24 py-4 my-10 text-xl text-white bg-303030 rounded-[8px] hover:bg-151515">
            Sign up for the contest
          </button>
        </Link>
        <p className="text-xl">
          This feature is available only for verified pro subscriptions
        </p> */}
      </div>
    </PageWrapper>
  );
};

export default Newcomer;
