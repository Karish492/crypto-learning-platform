import React from 'react';
import { Link } from 'react-router-dom';
import ModuleCards from '../components/ModuleCard';
import { useQuery } from '@tanstack/react-query';
const Modules = () => {
    const {isLoading, error, data} = useQuery({
      queryKey: ['modules'],
      queryFn: async () => {
          const response = await fetch(`http://localhost:8000/api/module/`);
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
      if (!Array.isArray(data)) {
        return 'An Error Has Occured: ';
      } //otherwise crashes when going from specific module to all modules

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center"> Modules </h2>
      <div className="grid grid-cols-3 gap-4">
        
        {data.map((data) => (
          <Link to={`/modules/${data.module_id}`} style={{ textDecoration: "none" }}>
            <ModuleCards
              id = {data.module_id}
              name={data.title}
              image={"bitcoin_cover.jpg"}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Modules;
