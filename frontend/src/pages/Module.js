import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Error from '../components/Error';
import Button from '../components/Button';
import { useQuery } from '@tanstack/react-query';

//mock data for module page to see how it looks etc.
/*const modules = [
  { id: 1, name: "Intro to Blockchain", description: "Learn about blockchain basics." },
  { id: 2, name: "Smart Contracts", description: "Understanding smart contracts." },
  { id: 3, name: "DeFi", description: "Explore Decentralized Finance." },
]; */

const Module = () => {
  const {id} = useParams();
  const [module, setModule] = useState(null);
  // Pass data from Modules to Module using props instead of mock data this is just for testing and front end.
  const {isLoading, error, data} = useQuery({
        queryKey: ['modules'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:8000/api/module/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
    
        });
  
        if (isLoading) {
          return <h1> Loading...</h1>
        }
      
        if (error) {
          return 'An Error Has Occured: ' + error.message
        }


 
  return (
    <div className="flex flex-row min-h-screen p-6 gap-6">
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-lg mb-6">{data.description}</p>
        <Button to = {`/quiz/${data.module_id}`} text = "Start Quiz" />
        
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
          alt={data.title}
          className="w-full h-64 object-cover rounded-md shadow"
        />
      </div>
    </div>
  );
};

export default Module;
