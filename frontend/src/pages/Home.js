import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Error from '../components/Error';


const Home = () => {
  const {isLoading, data, error} = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=f23b97dffae445f0b2ed00fc5f353ddf`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    },

    });
  if (isLoading) return <Loading message = "Loading News..." />;

  if (error) return <Error message = "Error : Failed to load the data. Please try again." />;
  
  const newsItems = data.articles;


  
  return (
    <div className="container mx-auto p-3">
      <div className="flex items-center justify-between space-x-6">
        <div className="flex-1 pl-3 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Learning Platform</h2>
          <p className="text-lg mb-4">
            Welcome to your go-to platform to learn the latest in crypto, financial trends, and more. Whether you're new to cryptocurrency or looking to deepen your understanding, we offer easy-to-follow modules that will guide you through its benefits, risks, and potential. Cryptocurrency can seem complex, but we break down the key concepts to help you feel confident in your knowledge.<br></br><br></br>
            Dive deep into various modules that cover everything from basic concepts to advanced strategies. Our platform is designed to help you grasp the fundamentals of blockchain, how crypto markets work, and the risks involved in investing.<br></br><br></br>
            Stay updated with the latest news and trends in the crypto and financial world. Our real-time news feed ensures you're always in the loop on what's happening in the markets.<br></br><br></br>
            With hands-on learning experiences like quizzes, interactive challenges, and real-time content, you'll be ready to make informed decisions. We believe in empowering the younger generation and those inexperienced in this field, helping them gain the knowledge they need to navigate the world of cryptocurrency safely and successfully.<br></br><br></br>
            Track your progress as you go! Our platform lets you monitor your learning journey, showing your achievements, quiz results, and module completions. You'll be able to see how far you've come and where to focus next to continue improving.<br></br><br></br>
            Join us today and start your journey to mastering cryptocurrency!
          </p>

        </div>

        <div className="flex-none h-full rounded-lg shadow-lg">
          <img
            src="bitcoin_cover.jpg"
            alt="Bitcoin"
            className="w-full h- rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="mt-10 items-center">
        <h2 className ="text-3xl font-bold text-center">Cryptocurrency News</h2>
      </div>


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
    </div>

    
    

      
);};

export default Home;