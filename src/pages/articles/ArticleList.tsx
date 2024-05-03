import { useState } from "react";
import { useArticleState } from "../../context/articles/ArticleContext";
import { useSportState } from "../../context/sports/SportContext";
import { ISLOGGED, PREFERRED_SPORTS } from "../../config/constants";
import ArticleDiv from "./ArticleDiv";
import { Article } from "../../context/articles/types";
import ViewArticle from "../../components/ViewArticle";

type ArticleProps = {
  toggleViewModal: () => void,
  isViewModalOpen: boolean
}

const ArticleList: React.FC<ArticleProps> = ({ isViewModalOpen, toggleViewModal }) => {



  const { articles } = useArticleState();

  const { sports } = useSportState();
  const [selectedTab, setSelectedTab] = useState(0);

  const [currentArticle, setCurrentArticle] = useState<Article>(articles[0]);

  const [selectedTabSport, setSelectedSportTab] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  const preferredSports = JSON.parse(
    localStorage.getItem(PREFERRED_SPORTS) || "[]"
  );

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
    // console.group(sportId);
    if (tabIndex > 0) {
      setSelectedSportTab(sports[tabIndex - 1].name);
    }
    setIsMenuOpen(false)
  };


  const identifyArticle = (article: Article) => {
    setCurrentArticle(article)
    console.log("Current article: ", currentArticle)
    toggleViewModal()
  }



  return (
    <div className="w-5/6 mx-auto">


      <div className="w-full border rounded-md p-2 mx-auto shadow-md mt-2 overflow-y-auto">
       <div className="block md:hidden"> 
          <button
            onClick={handleMenuToggle}
            className="block w-full p-2 flex items-center justify-around text-center border rounded"
          >
            {selectedTab === 0 ? "Your Choice" : selectedTabSport} <i className='bx text-2xl font-normal bxs-chevron-down' ></i>
          </button>
          {isMenuOpen && (
            <ul className="flex flex-col w-full p-2">
              <li
                key={0}
                className={`cursor-pointer ${
                  selectedTab === 0
                    ? "font-bold "
                    : ""
                }`}
                onClick={() => handleTabChange(0)}
              >
                {localStorage.getItem(ISLOGGED) ? "Your Choice" : "All"}
              </li>
              {sports.map((sport, index) => (
                <li
                  key={index + 1}
                  className={`cursor-pointer ${
                    selectedTab === index + 1
                      ? "font-bold "
                      : ""
                  }`}
                  onClick={() => handleTabChange(index + 1)}
                >
                  {sport.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Regular horizontal menu for larger screens */}
        <div className="hidden md:block">
          <ul className="flex w-full p-2 justify-between">
            <li
              key={0}
              className={`cursor-pointer ${
                selectedTab === 0
                  ? "font-bold underline underline-offset-8 decoration-4"
                  : ""
              }`}
              onClick={() => handleTabChange(0)}
            >
              {localStorage.getItem(ISLOGGED) ? "Your Choice" : "All"}
            </li>
            {sports.map((sport, index) => (
              <li
                key={index + 1}
                className={`cursor-pointer ${
                  selectedTab === index + 1
                    ? "font-bold underline underline-offset-8 decoration-4"
                    : ""
                }`}
                onClick={() => handleTabChange(index + 1)}
              >
                {sport.name}
              </li>
            ))}
          </ul>
        </div>
        {(() => {
          // Filter articles based on the selected tab and sport
          const filteredArticles = articles.filter((article) => {
            if (selectedTab === 0) {
              if (localStorage.getItem(ISLOGGED)) {
                const strr = JSON.stringify(article);
                return (
                  preferredSports.some((element: string) =>
                    strr.includes(element)
                  ) ||
                  preferredSports.some((element: string) =>
                    strr.includes(element)
                  )
                );
              }
              // Show all articles if selectedTab is 0
              else {
                return true;
              }
            }
            return article.sport.name === selectedTabSport; // Show articles for selected sport
          });

          // Check if there are any filtered articles
          if (filteredArticles.length > 0) {
            // If there are filtered articles, map and display them
            return filteredArticles.map((article) => (
              <ArticleDiv key={article.id} isViewModalOpen={isViewModalOpen} identifyArticle={identifyArticle} item={article} />
            ));
          } else {
            // If there are no filtered articles, display "No Articles" message
            return (
              <div className="h-52 w-full flex justify-center items-center">
                <h1 className="text-xl text-gray-500 font-semibold">
                  No Articles
                </h1>
              </div>
            );
          }
        })()}
      </div>
      <ViewArticle article={currentArticle} isViewModalOpen={isViewModalOpen} toggleViewModal={toggleViewModal} />
    </div>
  )
}

export default ArticleList