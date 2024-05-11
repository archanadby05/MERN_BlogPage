import React, { useEffect, useState } from 'react';
import './category.css';
import Slider from 'react-slick';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const SampleNextArrow = ({ onClick }) => (
  <div className="control-btn" onClick={onClick}>
    <button className="next">
      <MdNavigateNext className="icon" />
    </button>
  </div>
);

const SamplePrevArrow = ({ onClick }) => (
  <div className="control-btn" onClick={onClick}>
    <button className="prev">
      <GrFormPrevious className="icon" />
    </button>
  </div>
);

const Category = () => {
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

  const [cats, setCat] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category${search}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCat(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [search]);

  return (
    <section className="category">
      <div className="content">
        <Slider {...settings}>
          {cats.map((item) => (
            <div className="boxs" key={item.id}>
              <div className="box">
                <img src={item.cover} alt="cover" />
                <div className="overlay">
                  <Link to={`/?cat=${item.name}`} className="link" key={item.id}>
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

export default Category;
