import React from 'react';
import PropTypes from 'prop-types';
import lodashget from 'lodash.get'
import { Field } from 'redux-form';

// const LatLngInput = () => (
//     <span>
//         <Field name="lat" component="input" type="number" placeholder="latitude" />
//         &nbsp;
//         <Field name="lng" component="input" type="number" placeholder="longitude" />
//     </span>
// );
// export default LatLngInput;

const styles = {
    input: {
        maxWidth: '30px',
        margin: '0.5rem',
        border: 0
    },
};

const InputSpaceField = ({ source, record = {} }) => {
    return (
        <span>
            长: <Field name={`${source}.length`} style={styles.input}  component="input" type="number" placeholder="长" />
            &nbsp;
            宽: <Field name={`${source}.width`} style={styles.input}  component="input" type="number" placeholder="宽" />
            &nbsp;
            高: <Field name={`${source}.height`} style={styles.input}  component="input" type="number" placeholder="高" />
        </span>
    )
    
};

InputSpaceField.defaultProps = {
    addLabel: true,
};

InputSpaceField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};


export default InputSpaceField;