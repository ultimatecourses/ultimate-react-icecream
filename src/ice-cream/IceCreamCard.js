import React from 'react';
import FocusLink from '../structure/FocusLink';
import IceCreamImage from './IceCreamImage';
import { css } from 'emotion/macro';
import PropTypes from 'prop-types';

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
  border: 1px solid rgba(32, 33, 36, 0.12);
  background-clip: padding-box;

  transform: translate(0) scale(1, 1);
  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 600px) {
    grid-template-rows: 70% 30%;
  }

  &:hover,
  &:focus-within {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    .text-container {
      h3 {
        a {
          text-decoration: underline;
        }
      }
    }
  }

  &:focus-within {
    box-shadow: 0 0 0 3px #ff71ba, 0 0 0 6px rgba(0, 0, 0, 0.6);

    a {
      outline: 2px solid transparent;
    }
  }

  .text-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    padding: 1.5em;
    height: 100%;

    h3 {
      padding: 0;
      color: #403147;
      font-size: 1.25em;
      line-height: 1.4375em;

      a {
        color: #403147;
        margin-bottom: 1.5em;
        text-decoration: none;
      }
    }

    .content {
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
    padding-top: 3em;
    padding-bottom: 3em;
    height: 100%;
    border-bottom: 1px solid rgba(32, 33, 36, 0.1);

    img {
      max-width: 60%;
    }
  }
`;

export const IceCreamCard = ({
  iceCreamId,
  heading,
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
        onItemClickHandler();
      }}
    >
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children && <div className="content">{children}</div>}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  children: PropTypes.node,
};

export default IceCreamCard;
