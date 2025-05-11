import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';


const Home = () => {
  const [newsItems, setNews] = useState([])
  const [prices, setPrices] = useState([])

  const { isLoading, data, error } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8000/api/news/`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },

  });



  useEffect(() => {
    if (data) {
      setNews(data.articles)
    }
  }, [data]);

  useEffect(() => {
    axios.get('https://api.binance.com/api/v3/ticker/price').then(response => {
      setPrices(response.data.slice(0, 7),
      )
    }
    )
  }, [prices]);

  return (
    <div className="container mx-auto p-3">
      <div className="flex items-center justify-between space-x-6">
        <div className="flex-1 pl-3 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Learning Platform</h2>
          <p className="text-lg mb-4">
            Welcome to your go-to platform to learn the latest in crypto, financial trends, and more.
            Whether you're new to cryptocurrency or looking to deepen your understanding, we offer easy-to-follow modules that will guide you through its benefits, risks, and potential.
            Cryptocurrency can seem complex, but we break down the key concepts to help you feel confident in your knowledge.<br /><br />

            Dive deep into various modules that cover everything from basic concepts to advanced strategies. Our platform is designed to help you grasp the fundamentals of blockchain, how crypto markets work, and the risks involved in investing.<br /><br />

            Stay updated with the latest news and trends in the crypto and financial world. Our real-time news feed ensures you're always in the loop on what's happening in the markets.<br /><br />

            With hands-on learning experiences like quizzes, interactive challenges, and real-time content, you'll be ready to make informed decisions. We believe in empowering the younger generation and those inexperienced in this field, helping them gain the knowledge they need to navigate the world of cryptocurrency safely and successfully.<br /><br />

            Track your progress as you go! Our platform lets you monitor your learning journey, showing your achievements, quiz results, and module completions. You'll be able to see how far you've come and where to focus next to continue improving.<br /><br />

            Join us today and start your journey to mastering cryptocurrency!
          </p>
        </div>

        <div className="flex-none h-full rounded-lg shadow-lg">
          <img
            src="bitcoin_cover.jpg"
            alt="Bitcoin"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="mt-10 items-center">
        <h2 className="text-3xl font-bold text-center">Cryptocurrency News</h2>
      </div>

      {isLoading ? (
        <Loading message="Loading News..." />
      ) : error ? (
        <Error message="Error: Failed to load the data. Please try again." />
      ) : (
        <div className="mt-15 overflow-x-auto snap-x snap-mandatory">
          <div className="flex space-x-6 p-5">
            {newsItems.slice(0, 15).map((item, index) => (
              <div key={index} className="flex-none w-80 snap-start">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src={item.urlToImage || 'no_image.jpg'}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm mb-2">
                    {item.description ? item.description.slice(0, 100) + '...' : 'No description available'}
                  </p>
                  <a
                    href={item.url}
                    target="_blan"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      
      )}
      <div>
        <h2 className="text-3xl font-bold text-center">Crypto Exchange Rate</h2>
        <br></br>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
      {prices.map((priceItem, index1) => (
        <div
          key={index1}
          style={{
            border: '1px solid ',
            borderRadius: '10px',
            padding: '60px',
            minWidth: '150px',
          }}
        >
          <h2 className="font-bold text-center">{priceItem.symbol}</h2>
          <p >{priceItem.price}</p>
          
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default Home;