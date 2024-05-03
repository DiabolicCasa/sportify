import React from "react";
import { Article } from "../../context/articles/types";

type Props = {
  item: Article,
  setCurrentArticle : (article : Article)=>void,
  toggleViewModal : ()=>void
};

const ArticleDiv: React.FC<Props> = ({ item ,setCurrentArticle,toggleViewModal}) => {

  const handleOnClick = () =>{
    setCurrentArticle(item)
    toggleViewModal()
  }

  const stringToDate = (dateString: string): string => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate
  };
  
  return (
    <div
      key={item.id}
      className="shadow-md mt-2 mx-auto bg-white border rounded-md overflow-hidden "
    >
      <div className="flex flex-col md:flex-row">
        <img
          src={item.thumbnail}
          alt="Thumbnail"
          className="w-full md:w-2/5 object-cover"
        />
        <div className="p-4 md:w-3/5">
          <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-1">
            <strong>Sport:</strong> {item.sport.name}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Date:</strong> {stringToDate(item.date)}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Summary:</strong> {item.summary}
          </p>
          <p className="text-gray-600 mb-1">
            {item.teams.length > 0 ? (
              <React.Fragment>
                <strong>Teams:</strong>{" "}
                {item.teams.map((team, index) => (
                  <span key={team.id}>
                    {team.name}
                    {index !== item.teams.length - 1 ? ", " : ""}
                  </span>
                ))}
              </React.Fragment>
            ) : (
              <b></b>
            )}
          </p>
          <button onClick={handleOnClick} className="font-bold p-1">Read More...</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDiv;
