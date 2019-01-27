import React from 'react';
import _ from 'lodash';
import { array, string } from 'prop-types';

const WaitingList = ({ list, className }) => (
  <div className={className}>
    <div className="sub-section">
      {!_.isEmpty(list) &&
        list.map((item, index) => {
          const { rank, patient } = item;
          return <p key={index}>{`${rank}. ${patient}`}</p>;
        })}
    </div>
  </div>
);

WaitingList.propTypes = {
  list: array.isRequired,
  className: string
};

WaitingList.defaultProps = {
  list: [],
  className: ''
};

export default WaitingList;
