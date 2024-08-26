import React, { useRef } from "react";
import Footer from "./Footer";
import fake from "../../public/fake.png";
import suc from "../../public/suc.png";

import axios from "axios";

const DeepFakeDetect = (e) => {
  const output = useRef();

  const inputVideo = (e) => {
    e.preventDefault();
    const video = e.currentTarget.files[0];
    const url = URL.createObjectURL(video);

    document.querySelector("#videoDetect").classList.add("mt-24");
    document.querySelector("#videoDetect").classList.add("mb-16");

    document.querySelectorAll("label")[0].classList.add("hidden");
    document.querySelectorAll("label")[1].classList.add("hidden");
    document.querySelector(".playVideo").classList.remove("hidden");

    const playVideo = document.querySelector("#playVideo");
    playVideo.src = url;
    playVideo.play();

    document.querySelector(".submitBtn").classList.remove("hidden");
  };

  const subumitVideo = async (e) => {
    e.preventDefault();
    const files = e.currentTarget.querySelector("input").files;
    const formData = new FormData();
    formData.append("video", files[0]);
    document.querySelector("#loader").classList.remove("hidden")
    const res = await axios.post("http://localhost:8000/video", formData);
    // const res = await fetch('http://localhost:8000/video', {
    //   method: "POST",
    //   body: formData,
    // })
    document.querySelector("#loader").classList.add("hidden")
    document.querySelector(".output").classList.remove("hidden");
    const outputVideo = document
      .querySelector(".output")
      .querySelector("video");
    outputVideo.src = URL.createObjectURL(files[0]);
    outputVideo.play();
    console.log(res.data.data.response.data);
    if (res.data.data.response.data === "1") {
      document
        .querySelector(".output")
        .querySelector(".isfaked")
        .classList.remove("hidden");
    } else {
      document
        .querySelector(".output")
        .querySelector(".suc")
        .classList.remove("hidden");
    }
  };

  return (
    <>
      <div
        id="videoDetect"
        className=" relative flex flex-col justify-center items-center mt-24"
        style={{ minHeight: `${window.innerHeight * 0.8}px` }}
      >
        <div className=" w-full flex justify-center  ">
          <div
            className=" videoSubmit md:w-6/12 sm:w-10/12 w-full mx-2 rounded-3xl py-14 px-6 border-2 border-dashed border-blue-500"
            style={{}}
          >
            <form
              encType="multipart/form-data"
              action=""
              onSubmit={subumitVideo}
              className=" w-full h-full flex flex-col items-center justify-center "
            >
              <input
                onChange={inputVideo}
                className=" hidden"
                type="file"
                id="videoUpload"
                name="video"
                accept="video/*"
              />

              <label htmlFor="videoUpload" className=" cursor-pointer ">
                <div className="svg ">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                  >
                    <path
                      fill="#000000"
                      d="M0 0 C31.68 0 63.36 0 96 0 C96 27.72 96 55.44 96 84 C64.32 84 32.64 84 0 84 C0 56.28 0 28.56 0 0 Z M4 4 C4 5.98 4 7.96 4 10 C5.98 10 7.96 10 10 10 C10 8.02 10 6.04 10 4 C8.02 4 6.04 4 4 4 Z M14 4 C14 5.98 14 7.96 14 10 C16.64 10 19.28 10 22 10 C22 8.02 22 6.04 22 4 C19.36 4 16.72 4 14 4 Z M26 4 C26 5.98 26 7.96 26 10 C28.64 10 31.28 10 34 10 C34 8.02 34 6.04 34 4 C31.36 4 28.72 4 26 4 Z M38 4 C38 5.98 38 7.96 38 10 C40.64 10 43.28 10 46 10 C46 8.02 46 6.04 46 4 C43.36 4 40.72 4 38 4 Z M50 4 C50 5.98 50 7.96 50 10 C52.64 10 55.28 10 58 10 C58 8.02 58 6.04 58 4 C55.36 4 52.72 4 50 4 Z M62 4 C62 5.98 62 7.96 62 10 C64.64 10 67.28 10 70 10 C70 8.02 70 6.04 70 4 C67.36 4 64.72 4 62 4 Z M74 4 C74 5.98 74 7.96 74 10 C76.64 10 79.28 10 82 10 C82 8.02 82 6.04 82 4 C79.36 4 76.72 4 74 4 Z M86 4 C86 5.98 86 7.96 86 10 C87.98 10 89.96 10 92 10 C92 8.02 92 6.04 92 4 C90.02 4 88.04 4 86 4 Z M4 14 C4 32.48 4 50.96 4 70 C33.04 70 62.08 70 92 70 C92 51.52 92 33.04 92 14 C62.96 14 33.92 14 4 14 Z M4 74 C4 75.98 4 77.96 4 80 C5.98 80 7.96 80 10 80 C10 78.02 10 76.04 10 74 C8.02 74 6.04 74 4 74 Z M14 74 C14 75.98 14 77.96 14 80 C16.64 80 19.28 80 22 80 C22 78.02 22 76.04 22 74 C19.36 74 16.72 74 14 74 Z M26 74 C26 75.98 26 77.96 26 80 C28.64 80 31.28 80 34 80 C34 78.02 34 76.04 34 74 C31.36 74 28.72 74 26 74 Z M38 74 C38 75.98 38 77.96 38 80 C40.64 80 43.28 80 46 80 C46 78.02 46 76.04 46 74 C43.36 74 40.72 74 38 74 Z M50 74 C50 75.98 50 77.96 50 80 C52.64 80 55.28 80 58 80 C58 78.02 58 76.04 58 74 C55.36 74 52.72 74 50 74 Z M62 74 C62 75.98 62 77.96 62 80 C64.64 80 67.28 80 70 80 C70 78.02 70 76.04 70 74 C67.36 74 64.72 74 62 74 Z M74 74 C74 75.98 74 77.96 74 80 C76.64 80 79.28 80 82 80 C82 78.02 82 76.04 82 74 C79.36 74 76.72 74 74 74 Z M86 74 C86 75.98 86 77.96 86 80 C87.98 80 89.96 80 92 80 C92 78.02 92 76.04 92 74 C90.02 74 88.04 74 86 74 Z "
                      transform="translate(2,8)"
                    />
                    <path
                      fill="#000000"
                      d="M0 0 C4.9473515 0 5.80671024 0.11866791 9.64453125 2.625 C10.48564453 3.16640625 11.32675781 3.7078125 12.19335938 4.265625 C13.05767578 4.83796875 13.92199219 5.4103125 14.8125 6 C15.69615234 6.57234375 16.57980469 7.1446875 17.49023438 7.734375 C19.66693565 9.14628934 21.83627774 10.56830696 24 12 C23.49355928 16.53837775 23.49355928 16.53837775 21.31347656 18.57739258 C20.59643555 19.01204834 19.87939453 19.4467041 19.140625 19.89453125 C18.35429688 20.37470703 17.56796875 20.85488281 16.7578125 21.34960938 C15.51644531 22.07374023 15.51644531 22.07374023 14.25 22.8125 C13.03183594 23.56563477 13.03183594 23.56563477 11.7890625 24.33398438 C7.27598993 27.03521266 5.5061171 28 0 28 C0 18.76 0 9.52 0 0 Z M4 7 C4 11.62 4 16.24 4 21 C7.23396985 19.70641206 9.88479853 18.59717733 12.8125 16.875 C14.3903125 15.946875 14.3903125 15.946875 16 15 C16 14.34 16 13.68 16 13 C13.82248821 11.40222476 13.82248821 11.40222476 11.125 9.875 C10.22007813 9.33617187 9.31515625 8.79734375 8.3828125 8.2421875 C6.15227978 6.8459107 6.15227978 6.8459107 4 7 Z "
                      transform="translate(40,36)"
                    />
                  </svg>
                </div>
              </label>
              <label htmlFor="videoUpload" className=" cursor-pointer ">
                <div className=" mt-5 px-10 py-3.5 overflow-hidden rounded-full group bg-gradient-to-r from-blue-700 to-blue-950 relative hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-950 text-white transition-all ease-out duration-300">
                  <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-blue-300 opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                  <span className="relative text-xl font-semibold">
                    Select Video
                  </span>
                </div>
              </label>

              <div className="playVideo w-full h-full bg-slate-500 flex justify-center hidden">
                <video
                  className=" w-full h-full border-blue-900 outline-none "
                  id="playVideo"
                  muted
                  controls={false}
                  style={{ borderWidth: "1px" }}
                ></video>
              </div>

              <div className="submitBtn container mx-auto text-center hidden mt-5">
                <button
                  type="submit"
                  className=" mt-5 px-10 py-3.5 overflow-hidden rounded-full group bg-gradient-to-r from-blue-700 to-blue-950 relative hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-950 text-white transition-all ease-out duration-300"
                >
                  <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-blue-300 opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                  <span className="relative text-xl font-semibold">
                    Detect DeepFake
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div id="loader" className=" my-5 hidden">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>

        <div className="output w-full flex justify-center hidden">
          <div className="outputVideo relative md:w-6/12 sm:w-10/12 w-full mx-2 my-5 p-3 border-2 border-blue-500 border-dotted">
            <video className=" w-full" ref={output} muted></video>
            <div className="isfaked absolute w-full h-full top-0 flex justify-center items-center hidden">
              <img src={fake} style={{ height: "100px" }} />
            </div>
            <div className="suc absolute w-full h-full top-0 flex justify-center items-center hidden">
              <img src={suc} style={{ height: "100px" }} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeepFakeDetect;
