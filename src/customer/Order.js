import React, { useEffect, useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate ,useLocation} from "react-router-dom";
import { Dishes_context } from "../Context/Dishes_context";
import { TokenVerificationContext } from "../Context/customer_verification";


function Order() {
  const { Dishes_data, get_Dishes } = useContext(Dishes_context);
  const [hide, setHide] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [Catagories, setCatagories] = useState([]);
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();


  const { checkToken } = useContext(TokenVerificationContext);

  const location = useLocation();
  const path = location.pathname;


  useEffect(() => {
    const handleAutoLogin = async () => {
      await checkToken(path, navigate);
    };
    handleAutoLogin();
  }, []);


  useEffect(() => {
    if (Array.isArray(Dishes_data) && Dishes_data.length > 0) {
      const uniqueCatagories = [...new Set(Dishes_data.map((dish) => dish.catagory))];
      setCatagories(uniqueCatagories);
      setCurrent(uniqueCatagories[0]);
    }
  }, [Dishes_data]);



  const filteredDishes = Array.isArray(Dishes_data)
    ? Dishes_data.filter((dish) => {
      return (
        dish.catagory === current &&
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    : [];

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="h-lvh flex flex-col">
      {!hide && <div className="h-2/6"> img</div>}
      <div className="h-1/6">
        <div className="flex justify-between mx-5 items-center">
          <span className="text-4xl font-bold">Menu</span>
          {/* <span>
            <GiHamburgerMenu size={30} />
          </span> */}
        </div>
        <div>
          <input
            type="text"
            className="border-2 w-5/6 my-3 p-2"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setHide(true)}
          />
        </div>
      </div>
      <div className="h-3/6">
        <div className="flex text-3xl h-1/6 gap-4 px-4 z-10 backdrop-blur-10 overflow-x-auto">
          {Catagories.map((item, index) => (
            <span key={index} onClick={() => setCurrent(item)}>
              {item}
            </span>
          ))}
        </div>
        <div className="flex w-full px-4 gap-4 relative z-1 h-5/6 overflow-auto">
          {filteredDishes.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleItemClick(item._id)}
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-auto rounded"
              />
              <span className="font-bold">{item.name}</span>
              <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-1/6 flex justify-center items-center">
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default Order;
