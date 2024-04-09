import React from 'react';
import MonthlyEarningGraph from '../../Component/MonthlyEarningChart';
import { useSelector } from 'react-redux';

const Home = () => {
  const data = [
    { month: "Sep 2023", revenue: 12000 },
    { month: "Oct 2023", revenue: 20000 },
    { month: "Nov 2023", revenue: 22000 },
    { month: "Dec 2023", revenue: 25000 },
    { month: "Jan 2024", revenue: 20000 },
    { month: "Feb 2024", revenue: 30000 },
    { month: "Mar 2024", revenue: 52000 }
  ];
  const cardsData = [
    { title: "Today's Revenue", value: "Rs. 50,000" },
    { title: "Number of Orders Today", value: "25" },
    { title: "Returning Customers Today", value: "10" }
  ];
  const username = useSelector(state => state?.auth.user?.username);
    return (
    <div className="px-8 py-6">
      <div className="flex flex-row items-center justify-start text-2xl mb-4 gap-2"><p>Welcome Back, </p> <p className='font-bold capitalize '>{username}</p> </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <div key={index} className="bg-slate-100 shadow-md rounded-lg p-6 select-none">
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{card.title}</h2>
          </div>
        ))}
      </div>
      
        <MonthlyEarningGraph data={data}/>

    </div>
  );
};

export default Home;
