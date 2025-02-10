import React from "react";

interface teamCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  name: string;
  desription: string;
}
const ServiceCard: React.FC<teamCardProps> = ({ icon, name, desription }) => {
  return (
    <div>
      <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
      <div className="flex justify-between px-10 text-3xl">
          <img className="h-14 w-14" src={icon} alt={name}/>
        <h4 className="uppercase title">
          <a href="">{name}</a>
        </h4>
        </div>
        {/* <div className="icon">
          {icon}
        <h4 className="title">
          <a href="">{name}</a>
        </h4>
        </div> */}
        <p className="description">{desription}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
