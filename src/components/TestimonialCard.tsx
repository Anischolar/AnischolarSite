import React from "react";

interface testmonialCardProps {
  image: string;
  name: string;
  title: string;
  desription: string;
}
const TestimonialCard: React.FC<testmonialCardProps> = ({image, name, title, desription}) => {
    return (
      <div>
        <div className="testimonial-wrap">
          <div className="testimonial-item">
            <img src={image} className="testimonial-img" alt=""></img>
            <h3>{name}</h3>
            <h4>{title}</h4>
            <p>
              <i className="bx bxs-quote-alt-left quote-icon-left"></i>
              {desription}
              <i className="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
          </div>
        </div>
      </div>
    );
};

export default TestimonialCard;
