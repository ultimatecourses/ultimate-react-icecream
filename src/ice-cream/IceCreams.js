import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import FocusLink from '../structure/FocusLink';
import LoaderMessage from '../structure/LoaderMessage';
import { getIceCreams } from '../data/iceCreamData';
import { css } from 'emotion/macro';

const paragraphStyle = css`
  max-width: 60%;
  margin: 0 auto;
  padding-bottom: 3em;
  text-align: center;
  font-size: 3em;
  font-weight: bold;
`;

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 2em;
  list-style: none;
  margin: 0 1em;
  padding: 1em 0;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0a1bab;
    border-radius: 4px;
    border: 4px solid #58d6ff;
    padding: 1.5em;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus-within {
      transform: scale(1.04);
      transition: all 0.2s ease-in-out;
    }

    a {
      color: #ffffff;
      margin-bottom: 1.5em;

      &:focus {
        outline: 2px solid #ffffff;
        outline-offset: 0.5em;
      }
    }

    .image-container {
      padding: 1em;
      background-color: #ffffff;
      max-width: 30%;
      min-width: 30%;
      border-radius: 5em;
    }

    h2 {
      padding: 0;
      text-align: center;
      color: #ffffff;
    }
  }
`;

const IceCreams = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iceCreams, setIceCreams] = useState([]);

  useEffect(() => {
    let didCancel = false;
    getIceCreams().then(iceCreams => {
      if (!didCancel) {
        setIceCreams(iceCreams);
        setIsLoading(false);
      }
    });
    return () => {
      didCancel = true;
    };
  }, []);

  const onItemClickHandler = id => {
    history.push(`/menu-items/add?iceCreamId=${id.toString()}`);
  };

  const onLinkClickHandler = e => {
    //This is done to avoid the click handler of the <li>
    //firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <Main headingText="Choose your poison">
      <LoaderMessage
        loadingMsg="Loading the stock list."
        doneMsg="Loading stock list complete."
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <ul className={containerStyle}>
          {iceCreams.map(({ id, name, image }) => (
            <li
              key={id}
              onClick={() => {
                onItemClickHandler(id);
              }}
            >
              <FocusLink
                to={{
                  pathname: '/menu-items/add',
                  search: `?iceCreamId=${id.toString()}`,
                }}
                onClick={onLinkClickHandler}
              >
                <h2>{name}</h2>
              </FocusLink>
              <div className="image-container">
                <img src={image} alt="" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && (
          <p className={paragraphStyle}>Your menu is fully stocked!</p>
        )
      )}
    </Main>
  );
};

export default IceCreams;
