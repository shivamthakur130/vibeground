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
      <div className="Email text-left px-5 max-w-xl mx-auto mt-0 mb-10 ">
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
        <div className=" ">
          <p className="text-xl py-4 font-PoppinsRegular text-gray-700">
            As a creator, we offer you the possibility of various cooperations
            with us.
          </p>
          <p>Sign up to receive more information!</p>
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
    </PageWrapper>
  );
};

export default Collaborate;
