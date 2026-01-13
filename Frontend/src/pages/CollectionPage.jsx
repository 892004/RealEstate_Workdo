import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Topcontect from "../components/CollectionPage/Topcontect";
import MainContent from "../components/CollectionPage/MainContent";

const CollectionPage = () => {
  const { collection } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
  availability: [], // "in-stock", "out-stock"
  sizes: [], // "1100", "1200", "1300", etc.
  productTypes: [], // "home", etc.
  brands: [], // "real-estate", etc.
});


  // 🔥 FULL DESCRIPTION DATA
  const topContentData = [
    {
      id: 1,
      slug: "best-seller",
      title: "Best Seller",
      desc:
        "A villa is a type of house that was originally an ancient Roman upper class country house. Since its origins in the Roman villa, the idea and function of a villa have evolved considerably. After the fall of the Roman Republic, villas became small farming compounds, which were increasingly fortified in Late Antiquity, sometimes transferred to the Church for reuse as a monastery."
    },
    {
      id: 2,
      slug: "farm-villa",
      title: "Farm Villa",
      desc:
        "A villa is a type of house that was originally an ancient Roman upper class country house. Since its origins in the Roman villa, the idea and function of a villa have evolved considerably. After the fall of the Roman Republic, villas became small farming compounds, which were increasingly fortified in Late Antiquity, sometimes transferred to the Church for reuse as a monastery."
    },
    {
      id: 3,
      slug: "properties",
      title: "Properties",
      desc:
        "A villa is a type of house that was originally an ancient Roman upper class country house. Since its origins in the Roman villa, the idea and function of a villa have evolved considerably. After the fall of the Roman Republic, villas became small farming compounds, which were increasingly fortified in Late Antiquity, sometimes transferred to the Church for reuse as a monastery."
    },
    {
      id: 4,
      slug: "royal-house",
      title: "Royal House",
      desc:
        "A royal household or imperial household is the residence and administrative headquarters in ancient and post-classical monarchies, and papal household for popes, and formed the basis for the general government of the country as well as providing for the needs of the sovereign and their relations. It was the core of the royal court, though this included many courtiers who were not directly employed by the monarch as part of the household."
    }
  ];

  const currentTopContent = topContentData.find(
    item => item.slug === collection
  );

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/products/by-collection/${collection}`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [collection]);

  if (loading) return <h2 className="p-6">Loading...</h2>;

  return (
    <section className="collection-page">
      {/* 🔥 FULL DESC TOP SECTION */}
      <Topcontect data={currentTopContent} />

      {/* 🔥 PRODUCTS GRID */}
      <MainContent
  products={products}
  title={currentTopContent?.title}
  filters={filters}
  setFilters={setFilters}
/>

    </section>
  );
};

export default CollectionPage;
