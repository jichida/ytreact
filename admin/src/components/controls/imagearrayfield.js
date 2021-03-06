import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import _ from 'lodash';

const styles = {
    container: {
        float: 'left',
    },
    image: {
        maxHeight: '10rem',
        margin: '0.5rem',
    },
};

export const ImageArrayField = ({ elStyle = {}, record, source, title }) => {
    const style = {
        ...styles.container,
        ...elStyle,
    };
    let onClickImage = (url)=>{
        window.open(url);
    }
    const titleValue = get(record, title) || title;
    const srcValuez = get(record, source) || [];

    if (srcValuez.length === 0) {
        return <div />;
    }
    let imgs = [];
    _.map(srcValuez,(srcValue,index)=>{
           imgs.push( <img
                key = {index}
                title={titleValue}
                alt={titleValue}
                src={srcValue}
                style={styles.image}
                onClick={()=>{onClickImage(srcValue)}}
            />);
    });
    return (
        <div style={style}>
            {imgs}
        </div>
    );
};

ImageArrayField.defaultProps = {
    addLabel: true,
}

ImageArrayField.propTypes = {
    elStyle: PropTypes.object,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
    title: PropTypes.string,
    label: PropTypes.string,
};

export default ImageArrayField;
