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
      className=" shadow-md z-10 mt-2 w-full mx-auto bg-white  border rounded-md overflow-hidden "
    >
      <div className="flex">
        <div className="p-4 w-3/5 flex-1">
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
        <br/>  <button onClick={()=>handleOnClick()} className="font-bold p-1">Read More...</button>
            
      </div>
      <img
        src={item.thumbnail}
        alt="Thumbnail"
        className="w-2/5 object-cover"
      /></div>
    </div>
  );
};

export default ArticleDiv;
