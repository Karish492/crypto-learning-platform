import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Error from '../components/Error';
import Button from '../components/Button';


//mock data for module page to see how it looks etc.
const modules = [
  { id: 1, name: "Intro to Blockchain", description: "Learn about blockchain basics." },
  { id: 2, name: "Smart Contracts", description: "Understanding smart contracts." },
  { id: 3, name: "DeFi", description: "Explore Decentralized Finance." },
];
const Module = () => {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  // Pass data from Modules to Module using props instead of mock data this is just for testing and front end.
  useEffect(() => {
    const selected = modules.find(m => m.id === parseInt(id));
    setModule(selected);
  }, [id]);

  if (!module) return <Error message = "Error : Module details not found, Please try again later. "/>;

 
  return (
    <div className="flex flex-row min-h-screen p-6 gap-6">
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4">{module.name}</h1>
        <p className="text-lg mb-6">Welcome to this module on Cryptocurrency Fundamentals. In this section, you'll gain a clear understanding of what cryptocurrencies are, how blockchain technology underpins them, and why they have gained so much attention in recent years. Through interactive lessons, real-world examples, and visual aids, we’ll explore key concepts such as decentralization, digital wallets, mining, and the role of cryptographic security. By the end of this module, you’ll be equipped with the foundational knowledge needed to confidently navigate the world of crypto and prepare for more advanced topics in future modules.</p>
        <Button to = {`/quiz/${module.id}`} text = "Start Quiz" />
        
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        <iframe
          src={"https://www.youtube.com/embed/lJrrT83ydeA"}
          title="Module Video"
          className="w-full h-64 md:h-80 rounded-md"
          allowFullScreen
        />
        <img
          src="/bitcoin_cover.jpg"
          alt={module.name}
          className="w-full h-64 object-cover rounded-md shadow"
        />
      </div>
    </div>
  );
};

export default Module;
