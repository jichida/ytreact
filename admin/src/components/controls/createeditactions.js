import React from "react";
import Button from "@@material-ui/core/Button";
import NavigationRefresh from "@@material-ui/icons/Refresh";
import ActionDelete from "@@material-ui/icons/Delete";
import ContentAdd from "@@material-ui/icons/Add";
import ActionBack from "@@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import _ from "lodash";

import { CardActions, ListButton, DeleteButton, RefreshButton } from "react-admin";

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right"
};

const CreateActions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={ basePath } />
  </CardActions>
);

const EditActions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath = { basePath } />
    {_.get(data, "systemflag", 0) === 0 ? (
      <DeleteButton basePath={basePath} record={data} resource={resource} />
    ) : null}
    <RefreshButton />

  </CardActions>
);

const ShowActions = ({ basePath, data, resource }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    <RefreshButton icon={NavigationRefresh} />
  </CardActions>
);

export { CreateActions, EditActions, ShowActions };
