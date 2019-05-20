import React from 'react';
import FocusLink from '../structure/FocusLink';
import { withRouter } from 'react-router-dom';
import { css } from 'emotion/macro';

const cardStyle = css`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  height: 100%;
  align-items: center;
  background-color: #ffffff;
  border-radius: 1em;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 600px) {
    grid-template-rows: 70% 30%;
  }

  &:hover,
  &:focus-within {
    transform: scale(1.04);
    transition: all 0.2s ease-in-out;
  }

  &:focus-within {
    box-shadow: 0 0 4px 7px rgba(0, 0, 0, 0.75);

    a {
      outline: 2px solid transparent;
    }
  }

  .text-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    padding: 1em;
    height: 100%;
    h3 {
      padding: 0.5em;
      margin-bottom: 0.5em;
      color: #403147;
      font-size: 1.5em;

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

    .content {
      padding-left: 0.5em;
      padding-right: 0.5em;
    }

    .action {
      position: absolute;
      justify-self: right;
      font-size: 0.8em;
      bottom: 0.5em;
      right: 0.8em;
    }
  }

  .image-container {
    display: flex;
    align-content: center;
    justify-content: center;
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
`;

const IceCreamCard = ({
  id,
  image,
  heading,
  callToAction,
  to,
  history,
  children,
}) => {
  const onItemClickHandler = () => {
    history.push(to);
  };

  const onLinkClickHandler = e => {
    //This is done to avoid the click handler of the <li>
    //firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <section
      className={cardStyle}
      onClick={() => {
        onItemClickHandler(id);
      }}
    >
      <div className="image-container">
        <img src={image} alt="" />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children && <div className="content">{children}</div>}
        <span className="action">{callToAction}</span>
      </div>
    </section>
  );
};

export default withRouter(IceCreamCard);
