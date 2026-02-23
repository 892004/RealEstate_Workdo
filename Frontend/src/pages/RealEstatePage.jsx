import React from "react";
import { useParams } from "react-router-dom";
import RealEstateHero from "../components/RealestateHeroSection/RealEstateHero";
import Footer from "../components/Footer/Footer";

const RealEstatePage = () => {
  const { id } = useParams();

  return (
    <section className="Real-estate relative  ">
        <RealEstateHero />

    </section>
  );
};

export default RealEstatePage;
