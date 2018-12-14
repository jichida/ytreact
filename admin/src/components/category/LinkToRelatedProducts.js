import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';

// import ProductIcon from '@material-ui/svg-icons/image/collections';

const LinkToRelatedProducts = ({ record, translate }) => (
    <Button
        primary
        label={translate('resources.category.fields.product')}
        containerElement={<Link to={{ pathname: "/product", query: { filter: JSON.stringify({ categoryid: record.id }) } }} />}
    />
);

export default translate(LinkToRelatedProducts);
