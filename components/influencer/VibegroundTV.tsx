"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Post1 from "@/assets/images/Jessica.png";
import ArrowLeft from "@/assets/images/svg/arrow-left.svg";

import Like from "@/assets/images/svg/like.svg";
import PageWrapper from "../common/PageWrapper";
const VibegroundTV = () => {
  return (
    <PageWrapper>
      <div className="Experience max-w-7xl px-5 mx-auto mt-10 md:mt-24 mb-24">
        <h2 className="sm:text-5xl text-3xl font-PoppinsBold text-111 flex items-center mb-10">
          <div className="bg-gray-50 p-2 rounded-2xl shadow-md cursor-pointer border border-gray-50 hover:bg-gray-100 active:bg-gray-200">
            <Link href="/experience">
              <Image src={ArrowLeft} height={32} width={32} alt="#" />
            </Link>
          </div>
          <div className="ml-10">VibegroundTV</div>
        </h2>
        <div className="space-y-4 mb-10 text-lg">
          <p>
            Welcome to the captivating world of Vibeground TV! Here we bring you
            exclusive content from our events around the world, with exciting
            content, thrilling stories, interviews and behind-the-scenes footage
            like you{"'"}ve never experienced before. Immerse yourself in this
            unique world and get ready to experience something truly special.
          </p>
          Get unique behind-the-scenes insights into our events and feel the
          magic that makes these gatherings special. Our content is more than
          just recordings of events. They are stories that are told, emotions
          that are shared and moments that are captured for eternity. We take
          you on a journey that makes you feel like you{"'"}re there live, even
          if you{"'"}re thousands of miles away.
          <p>
            With Vibeground TV, you will become part of our community that loves
            the world of events and entertainment. You will be immersed in a
            world where creativity and passion come together to create
            unforgettable experiences.
          </p>
          <p>Welcome to a world that will do more than just entertain you!</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default VibegroundTV;
