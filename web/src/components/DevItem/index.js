import React from "react";

import "./styles.css";

function DevItem({ dev, handleDeleteDev }) {
  return (
    <li className="dev-item">
      <header>
        <div className="dev-infos">
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(", ")}</span>
          </div>
        </div>
        <button
          className="delete-button"
          onClick={() => handleDeleteDev(dev._id)}
        >
          <i className="material-icons">delete_forever</i>
        </button>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil do Github
      </a>
    </li>
  );
}

export default DevItem;
