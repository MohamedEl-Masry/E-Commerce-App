import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
const Brands = () => {
  const [allBrands, setAllBrands] = useState(null);
  let getAllBrands = async function () {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setAllBrands(data.data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(function () {
    getAllBrands();
  }, []);
  return (
    <>
      {allBrands ? (
        <div className="container my-5 pt-5">
          <div className="row gx-3">
            <div className="col-md-3 ">
              <div className="bg-body-tertiary rounded-2 shadow px-2 pt-3 pb-4 my-3">
                <h2 className="text-main">Our Brands</h2>
                <h5>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laboriosam delectus ex pariatur sint necessitatibus commodi.
                </h5>
              </div>
            </div>
            {allBrands.map(function (brand, idx) {
              return (
                <div className="col-md-3 " key={idx}>
                  <Link to={`/productsofbrand/${brand._id}`}>
                    <div className="bg-body-tertiary rounded-2 overflow-hidden shadow p-2 my-3">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-100 pt-1"
                      />
                      <h5 className="text-center pt-2 fw-bold text-main">
                        {brand.name}
                      </h5>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Brands;
