import React from 'react';
import PropTypes from 'prop-types';
import lodashget from 'lodash.get'

const TextField = ({ source, record = {} }) => {
    return (
        <span>{lodashget(record, source)? '是': '否'}</span>
    )
    
};

TextField.defaultProps = {
    addLabel: true,
};

TextField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};


export default TextField;