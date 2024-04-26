import React, { useEffect, useState } from "react";
import { Article } from "../../context/articles/types";
import { API_ENDPOINT } from "../../config/constants";

type ViewArticleProps = {
  toggleViewModal: () => void;
  isViewModalOpen: boolean;
  article: Article;
};

type ArticleContent = {
  id: number | null;
  title: string | null;
  summary: string | null;
  thumbnail: string | null;
  sport: {
    id: number;
    name: string | null;
  } | null;
  date: string | null;
  content: string | null;
  teams:
    | {
        id: number | null;
        name: string | null;
      }[]
    | null;
};

const ViewArticle: React.FC<ViewArticleProps> = ({
  toggleViewModal,
  isViewModalOpen,
  article,
}) => {
  const [articleContent, setArticleContent] = useState<ArticleContent | null>(
    null
  );

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!article) {
        return; // Do nothing if article is null
      }
      const url = `${API_ENDPOINT}/articles/${article.id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: ArticleContent = await response.json();
        setArticleContent(data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setArticleContent(null);
      }
    };

    if (isViewModalOpen) {
      fetchArticleData();
    } else {
      // Reset article content when modal is closed
      setArticleContent(null);
    }
  }, [isViewModalOpen, article]);

  const closeModal = () => {
    setArticleContent(null);
    toggleViewModal();
  };

  if (!isViewModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 mt-10 flex items-center justify-center">
    <div className="fixed inset-0 bg-black opacity-50"></div>
    <div
      className="bg-white w-5/6 p-8 rounded-lg shadow-lg z-10"
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(155, 155, 155, 0.3) rgba(255, 255, 255, 0.2)",
      }}
    >
      {articleContent ? (
        <div>
          <div className="flex ">
            <div className="w-1/2 flex flex-col items-center">
              {" "}
              <h1 className="text-5xl font-bold mb-4">
                {articleContent?.title}
              </h1>
              <p className="mt-5 text-xl mb-4">{articleContent?.summary}</p>
            </div>
            <img
              className="w-1/2"
              src={
                articleContent.thumbnail ??
                "https://images.pexels.com/photos/164250/pexels-photo-164250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="Image"
            ></img>
          </div>

          {articleContent?.content && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Content:</h2>
              <p>{articleContent.content}</p>
            </div>
          )}
          {articleContent?.teams && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Teams:</h2>
              <ul>
                {articleContent.teams.map((team) => (
                  <li key={team.id}>{team.name}</li>
                ))}
              </ul>
            </div>
          )}
          {articleContent?.sport && (
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Sport:</h2>
              <p>{articleContent.sport.name}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-32">
          <h1 className="font-semibold flex items-center text-3xl text-gray-900">
            <i className="bx font-3xl font-bold bx-loader bx-spin"></i>{" "}
            Loading
          </h1>
        </div>
      )}

      <button
        onClick={closeModal}
        className="bg-red-500 p-2 rounded-xl text-white"
      >
        Close
      </button>
    </div>
  </div>
  );
};

export default ViewArticle;
