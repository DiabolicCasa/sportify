import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/ArticleContext";
import { fetchArticles } from "../../context/articles/actions";
import ArticleDiv from "./ArticleDiv";

const LandingPage: React.FC = () => {
  const { articles } = useArticleState();
  const articleDispatch = useArticleDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
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
            <div className=" w-9/10 border rounded-md p-2 mx-auto shadow-md mt-2 overflow-y-auto">
              {articles.map((item) => {
                return   <ArticleDiv item={item}/>
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
