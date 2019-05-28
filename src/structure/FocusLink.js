import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const FocusLink = ({ to, children, activeClassName, ...props }) => {
  const newTo =
    typeof to === 'string'
      ? {
          pathname: to,
          state: { focus: true },
        }
      : {
          ...to,
          state: to.state ? { ...to.state, focus: true } : { focus: true },
        };
  return activeClassName ? (
    <NavLink to={newTo} {...props}>
      {children}
    </NavLink>
  ) : (
    <Link to={newTo} {...props}>
      {children}
    </Link>
  );
};

FocusLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      state: PropTypes.object,
    }),
  ]).isRequired,
  children: PropTypes.node.isRequired,
  activeClassName: PropTypes.string,
};

export default FocusLink;
