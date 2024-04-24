import React from 'react'
import { Article } from '../../context/articles/types'

type Props ={
    item : Article
}

const ArticleDiv: React.FC <Props> = ({item}) => {
  return (
    <div
    key={item.id}
    className=" mt-2 w-full mx-auto bg-white  border rounded-md overflow-hidden flex"
  >
    <div className="p-4 w-3/5 flex-1">
      <h2 className="text-lg font-semibold mb-2">
        {item.title}
      </h2>
      <p className="text-gray-600 mb-1">
        <strong>Sport:</strong> {item.sport.name}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Date:</strong> {item.date}
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
        )
        }
      </p>
    </div>
    <img
      src={item.thumbnail}
      alt="Thumbnail"
      className="w-2/5 object-cover"
    />
  </div>
  )
}

export default ArticleDiv