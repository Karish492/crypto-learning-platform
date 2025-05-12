import { useState } from 'react';

function ModuleCards({id,name,image}) {
    const [bg, setBg] = useState("white");
    const [txt, setTxt] = useState("grey");

    const handleMouseEnter = () => {
        setBg("lightgrey");  
        setTxt("blue");    
    };

    const handleMouseLeave = () => {
        setBg("white");      
        setTxt("black");    
    };
     return (
     <div key={id} className="bg-white p-5 rounded-lg shadow-lg" style={{ backgroundColor: bg, color: txt }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover rounded-lg mb-4 shadow-lg"
        />
        <h3 className="text-xl font-bold mb-3">{name}</h3>            
    </div>
)};

export default ModuleCards;
