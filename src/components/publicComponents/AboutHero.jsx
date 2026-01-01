import React from "react";

const AboutHero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#fdfdfb]">
      <div
        style={{
          backgroundImage: "url('/homeImage/lightstream 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 z-0 "
      ></div>
    </section>
  );
};

export default AboutHero;
