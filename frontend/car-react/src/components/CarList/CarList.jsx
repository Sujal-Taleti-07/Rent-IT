// import React, { useEffect, useState } from "react";
// import bmwiX from "../../assets/bmwix.png";
// import mg from "../../assets/mg.png";
// import m700 from "../../assets/m700.png";
// import axios from "axios";


// const carList = [
//   {
//     name: "BMW iX",
//     price: 5000,
//     type: "Car",
//     image: bmwiX,
//     aosDelay: "0",
//   },
//   {
//     name: "MG Gloster",
//     price: 4500,
//     type: "Car",
//     image: mg,
//     aosDelay: "500",
//   },
//   {
//     name: "Mahindra XUV 700",
//     price: 3500,
//     type: "Car",
//     image: m700,
//     aosDelay: "1000",
//   },
// ];

// const CarList = () => {

//   // const[vehicle, setVehicle ] = useState([])

//   // useEffect(() => {
//   //   const getVeh = async() => {
//   //     try{
//   //       const res = await axios.get("http://localhost:4001/cars");
//   //       console.log(data);
//   //       setVehicle(res.data.filter((data) => data.type == "bike"))
//   //     }catch(e){
//   //       console.log(e)
//   //     }
//   //   }
//   //   getVeh();
//   // }, []);

//   return (
//     <div className="pb-24">
//       <div className="container">
//         {/* Heading */}
//         <h1
//           data-aos="fade-up"
//           className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
//         >
//           Most Preffered Cars
//         </h1>

//         {/* Car listing */}
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
//             {carList.map((data) => (
//               <div
//                 data-aos="fade-up"
//                 data-aos-delay={data.aosDelay}
//                 className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
//               >
//                 <div className="w-full h-[120px]">
//                   <img
//                     src={data.image}
//                     alt="car_image"
//                     className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <h1 className="text-primary font-semibold">{data.name}</h1>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {data.type}
//                 </p>
//                   <div className="flex justify-between items-center text-xl font-semibold">
//                     <p> &#8377;{data.price}/Day</p>
//                     {/* <a href="#">Details</a> */}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* End of car listing */}
//         <div className="grid place-items-center mt-8">
//           <button data-aos="fade-up" className="button-outline">
//             <a href="/cars">More Collection</a>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarList;



import React from "react";
import bmwiX from "../../assets/bmwix.png";
import mg from "../../assets/mg.png";
import m700 from "../../assets/m700.png";

const carList = [
  {
    name: "BMW iX",
    model: "2023",
    price: 5000,
    type: "Car",
    image: bmwiX,
  },
  {
    name: "MG Gloster",
    model: "2022",
    price: 4500,
    type: "Car",
    image: mg,
  },
  {
    name: "Mahindra XUV 700",
    model: "2023",
    price: 3500,
    type: "Car",
    image: m700,
  },
];

const CarList = () => {
  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl text-center font-semibold font-serif mb-6">
          Most Preferred Cars
        </h1>

        {/* Car listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {carList.map((car, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-contain"
              />
              <div className="bg-slate-300 dark:bg-gray-900 dark:text-white p-4">
                <h2 className="text-lg font-bold">{car.name}</h2>
                <p className="text-sm">Model: {car.model}</p>
                <p className="text-sm">Type: {car.type}</p>
                <p className="text-blue-600 dark:text-yellow-400 text-lg font-semibold mt-2">
                  ₹{car.price} /day
                </p>
                {/* <button className="w-full bg-yellow-400 text-black font-bold py-2 mt-4 rounded">
                  Book Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
        {/* End of car listing */}
        <div className="grid place-items-center mt-8">
          <button className="bg-blue-500 text-white dark:bg-yellow-400 dark:text-black font-bold py-2 px-6 rounded hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-yellow-500">
            <a href="/cars">More Collection</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarList;