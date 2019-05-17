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
`;

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 2em;
  list-style: none;
  margin: 0 1em;
  padding: 1em 0;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  li {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 1fr;
    align-items: center;
    background-color: #ffffff;
    border-radius: 1em;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus-within {
      transform: scale(1.04);
      transition: all 0.2s ease-in-out;
    }

    &:focus-within {
      box-shadow: -1px 1px 4px 7px rgba(0, 0, 0, 0.75);

      a {
        outline: 0;
      }
    }

    .text-container {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 1fr;
      padding-left: 1em;
      padding-right: 1em;
      padding-top: 1em;
      height: 100%;
      h3 {
        padding: 0;
        color: #403147;
        font-size: 1.1em;

        a {
          color: #403147;
          margin-bottom: 1.5em;

          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
          }
        }
      }

      span {
        justify-self: right;
        font-size: 0.8em;
      }
    }

    .image-container {
      background-color: #f8f8f8;
      text-align: center;
      border-top-right-radius: 1em;
      border-top-left-radius: 1em;
      padding-top: 2em;
      padding-bottom: 2em;
      height: 100%;

      img {
        max-width: 60%;
      }
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
              <div className="image-container">
                <img src={image} alt="" />
              </div>
              <div className="text-container">
                <h3>
                  <FocusLink
                    to={{
                      pathname: '/menu-items/add',
                      search: `?iceCreamId=${id.toString()}`,
                    }}
                    onClick={onLinkClickHandler}
                  >
                    {name}
                  </FocusLink>
                </h3>
                <span>Select to add</span>
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
