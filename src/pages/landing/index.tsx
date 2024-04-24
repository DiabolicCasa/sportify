import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/ArticleContext";
import { fetchArticles } from "../../context/articles/actions";
import ArticleDiv from "./ArticleDiv";
import {
  useSportDispatch,
  useSportState,
} from "../../context/sports/SportContext";
import { fetchSports } from "../../context/sports/actions";

const LandingPage: React.FC = () => {
  const { articles } = useArticleState();
  const articleDispatch = useArticleDispatch();

  const { sports } = useSportState();
  const sportDispatch = useSportDispatch();

  const [selectedTab, setSelectedTab] = useState(0);



  
  const [articlesCopy, setArticlesCopy] = useState(articles);


  const handleTabChange = (index : number,id:number) => {
    setSelectedTab( index);
    console.log(`Tab changed to ${index}`);
    if(index===0){
      setArticlesCopy(articles)
    }else{

      let newArticles = articles.map(item => ({ ...item }));

     newArticles =  newArticles.filter((item)=>{
        return item.sport.id === id
      })

      setArticlesCopy(newArticles)
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchArticles(articleDispatch);
      await fetchSports(sportDispatch);
    };
  
    fetchData().then(() => {
      // Access updated articles state directly
    
      setArticlesCopy([...articles]);
      console.log("Articles : ", updatedArticles);
    });
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="w-5/6 mx-auto bg-offwhite">
        <div className="w-full h-52 m-2 ">
          <h1 className="text-xl text-black font-bold">Live Games</h1>
          <div className="h-5/6 w-9/10 rounded-md p-2 mx-auto shadow-md border">
            {/* Create todo div here */}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-3/4 m-2">
            <h1 className="text-xl text-black font-bold">Trending News</h1>
            <div className="w-9/10 border rounded-md p-2 mx-auto shadow-md mt-2 overflow-y-auto">
              <ul className="flex w-full p-2 justify-between">
              <li
                      key={0}
                      className={`cursor-pointer ${
                        selectedTab === 0 ? "font-bold" : ""
                      }`}
                      onClick={() => handleTabChange(0,0)}
                    >
                     All
                    </li>
                {sports.map((sport, index) => {
                  return (
                    <li
                      key={index+1}
                      className={`cursor-pointer ${
                        selectedTab === index+1 ? "font-bold" : ""
                      }`}
                      onClick={() => handleTabChange(index+1,sport.id)}
                    >
                     {sport.name}
                    </li>
                  );
                })}
              </ul>

              {articlesCopy.map((item) => {
                return <ArticleDiv key={item.id} item={item} />;
              })}
            </div>
          </div>
          <div className="w-1/4 m-2">
            <h1 className="text-xl text-black font-bold">Your Favourites</h1>
            <div className="h-5/6 w-9/10 border rounded-md p-2 mx-auto shadow-md mt-2">
              {/* Create News Filter here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
