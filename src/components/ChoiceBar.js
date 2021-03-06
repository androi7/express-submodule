import React from 'react';
import PropTypes from 'prop-types';

export default function ChoiceBar({title, count, percent, onClickHandler}) {
    return (
        <div className="ChoiceBar" onClick={onClickHandler}>
            <div className="Progress" style={{'width': percent + '%'}}>
                <div className="ChoiceBarTitle">{title}</div>
            </div>
            <div className="ChoiceBarBadge">{count}</div>
        </div>
    );
}

ChoiceBar.propTypes = {
    title:   PropTypes.string.isRequired,
    count:   PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
};