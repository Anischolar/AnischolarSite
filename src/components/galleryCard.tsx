import React from "react";

interface galleryCarProp {
  image: string;
}
const galleryCard: React.FC<galleryCarProp> = ({ image }) => {
  return (
    <>
      <img src={image} className="img-width" alt=""></img>
    </>
  );
};

export default galleryCard;
