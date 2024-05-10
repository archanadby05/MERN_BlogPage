import React, { useEffect, useState } from "react";
import "./category.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <MdNavigateNext className='icon' />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <GrFormPrevious className='icon' />
      </button>
    </div>
  );
};

export const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [cats, setCats] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category" + search);
        setCats(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error here (e.g., set error state)
      }
    };

    fetchCategories();
  }, [search]);

  return (
    <section className='category'>
      <div className='content'>
        <Slider {...settings}>
          {cats.map((item) => (
            <div className='boxs' key={item.id}>
              <div className='box'>
                <img src={item.cover} alt='cover' />
                <div className='overlay'>
                  <Link to={`/?cat=${item.name}`} className='link'>
                    <h4>{item.category}</h4>
                  </Link>
                  <p>{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
