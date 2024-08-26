import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Demo1 from "../assets/videos/Demo1.mp4";
import Demo2 from "../assets/videos/Demo2.mp4";
import deepfakeBg1 from "../assets/images/DeepFakeImg1.webp";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const HomePage = () => {

  const navigate = useNavigate()
  const hero = useRef()
  const section1 = useRef()
  const section2 = useRef()

  const scrollAnime = () => {
    const h1 = hero.current.clientHeight
    const h2 = section1.current.clientHeight
    const h3 = section2.current.clientHeight
    const width = window.scrollY

    width >= h1 * 0.4 ? (() => {
      section1.current.classList.remove("translate-y-20")
      section1.current.classList.remove("opacity-0")
      // setTimeout(() => {

      // section1.current.querySelector(".content").classList.remove("hidden")
      section1.current.querySelector(".content").classList.remove("-translate-x-20")
      section1.current.querySelector(".content").classList.remove("opacity-0")
      // }, 2000);

    })() : ''

    width >= (h1 + h2*0.2) ?
      (() => {
        section2.current.classList.remove("translate-y-20")
        section2.current.classList.remove("opacity-0")
        // setTimeout(() => {

        // section2.current.querySelector(".content").classList.remove("hidden")
        section2.current.querySelector(".content").classList.remove("translate-x-20")
        section2.current.querySelector(".content").classList.remove("opacity-0")
        // }, 2000);
      })() : ''

  }

  useEffect(() => {
    scrollAnime()
    window.addEventListener('scroll', () => {
      scrollAnime()
    })
  }, [])



  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 relative overflow-hidden">

      {/* Hero Section */}

      <section
        ref={hero}
        id="home"
        className="relative flex flex-col items-center justify-center py-32 px-6 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${deepfakeBg1})`, height: `${window.innerHeight}px`, minHeight: "550px" }}
      >
        <div className="relative z-10 flex flex-col items-center text-white">
          <h1 className="text-5xl font-bold my-5">Detecting DeepFakes with Precision</h1>
          <p className="text-lg max-w-2xl mb-8 font-bold">
            DeepFake technology has rapidly evolved, making it increasingly difficult to distinguish between real and manipulated content.
            Our state-of-the-art detection system uses advanced AI techniques to identify and expose these digital forgeries, ensuring the
            authenticity of media content.
          </p>
          <a href="#demos" className="">
            <button
              className=" px-10 py-3.5 overflow-hidden rounded-full group bg-gradient-to-r from-blue-700 to-blue-950 relative hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-950 text-white transition-all ease-out duration-300"
            >
              <span
                className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-blue-300 opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
              ></span>
              <span className="relative text-xl font-semibold">Watch Demos</span>
            </button>
          </a>
        </div>
        <div className="wave bg-no-repeat absolute w-full h-full " style={{ bottom: "-20px", backgroundImage: "url(imageedit_2_4496804147.png)", backgroundSize: "120% 40%", backgroundPosition: "0% 100%" }}>
        </div>
      </section>

      {/* Content and Demo Videos Section */}
      <section ref={section1} id="demos" className="w-full py-16 opacity-0 bg-blue-50 translate-y-20 transition-all duration-500 ease-in">
        <div className="max-w-6xl mx-auto space-y-24">

          <div className={`flex md:flex-row-reverse flex-col md:items-center justify-between space-y-6 md:space-y-0 md:space-x-12 bg-white rounded-xl shadow-lg p-8`}>
            <div className="flex-1 relative bg-black h-full rounded-lg overflow-hidden shadow-2xl">
              <video
                className="  object-cover opacity-70 transition-opacity duration-300 hover:opacity-100"
                autoPlay
                loop
                muted
                src={Demo1}
              />

            </div>
            <div className=" content m-0 flex-1 p-6 opacity-0 transition-all -translate-x-20 duration-1000 delay-100 ">
              <h2 className="text-3xl font-bold mb-4 text-blue-950">The Evolution of DeepFakes</h2>
              <p className="text-lg text-gray-700">DeepFakes use advanced AI to create realistic fake videos by swapping faces and mimicking voices. What started as a novel technology for fun has evolved into a powerful tool with both positive and negative implications.</p>
       
                <button
                  onClick={() => {
                    navigate("/detect-deepfake")
                  }}
                  className=" mt-5 px-10 py-3.5 overflow-hidden rounded-full group bg-gradient-to-r from-blue-700 to-blue-950 relative hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-950 text-white transition-all ease-out duration-300"
                >
                  <span
                    className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-blue-300 opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
                  ></span>
                  <span className="relative text-xl font-semibold">Detect Video</span>
                </button>
              
            </div>
          </div>
        </div>
      </section>

      <section ref={section2} id="demos1" className="w-full py-16 opacity-0 bg-gradient-to-b bg-blue-50  translate-y-20 transition-all duration-500 ease-in">
        <div className="max-w-6xl mx-auto space-y-24">

          <div className={`flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-12 bg-white rounded-xl shadow-lg p-8`}>
            <div className="flex-1 relative bg-black  rounded-lg overflow-hidden shadow-2xl">
              <video
                className=" object-cover opacity-70 transition-opacity duration-300 hover:opacity-100"
                autoPlay
                loop
                muted
                src={Demo2}
              />

            </div>
            <div className=" content  flex-1 p-6 opacity-0 transition-all translate-x-20 duration-1000 delay-100" >
              <h2 className="text-3xl font-bold mb-4 text-blue-950">The Dangers of DeepFakes</h2>
              <p className="text-lg text-gray-700">The potential misuse of DeepFakes includes spreading misinformation, identity theft, and creating malicious content. As DeepFake technology becomes more accessible, it poses a significant risk to privacy, security, and trust in digital media.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;