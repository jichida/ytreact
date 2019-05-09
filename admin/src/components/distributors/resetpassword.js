import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import config from "../../env/config.js";
import { showNotification, translate, required } from "react-admin";
import TextField from "@material-ui/core/TextField";

class ResetPassword extends React.Component {
  state = {
    open: false,
    pwdvalue: "",
    pwdvalue2: ""
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      pwdvalue: event.target.value
    });
  };

  handleChange2 = event => {
    this.setState({
      pwdvalue2: event.target.value
    });
  };

  handleSubmit = record => {
    const { showNotification } = this.props;
    if(this.state.pwdvalue ===""){
      showNotification(
        "resources.user.notification.resetuserpassword_required",
        "warning"
      );
      return;
    }
    if (this.state.pwdvalue !== this.state.pwdvalue2) {
      showNotification(
        "resources.user.notification.resetuserpassword_differrentpwd",
        "warning"
      );
      return;
    }
    console.log(`发送重置密码记录:${JSON.stringify(record)}`);
    const { id } = record;
    const data = {
      userid: id,
      password: this.state.pwdvalue
    };

    const token = localStorage.getItem("admintoken");
    fetch(`${config.serverurl}/adminapi/resetuserpassword/distributor`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        res.json().then(data => {
          console.log(data);
          if (data.result) {
            showNotification(
              "resources.user.notification.resetuserpassword_success"
            );
            this.setState({ open: false });
          } else {
            showNotification(
              "resources.user.notification.resetuserpassword_failed",
              "warning"
            );
            this.setState({ open: false });
          }
        });
      })
      .catch(e => {
        console.error(e);
        showNotification(
          "resources.user.notification.resetuserpassword_failed",
          "warning"
        );
      });
  };

  render() {
    console.log(this.props);
    const { record } = this.props;

    return (
      <div>
        <Button color="primary" onClick={this.handleOpen}>重置密码</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>重置密码</DialogTitle>
          <DialogContent>
            <TextField
              id="password"
              type="password"
              validate={required()}
              value={this.state.pwdvalue}
              onChange={this.handleChange}
              label="请输入密码"
              placeholder="请输入密码"
            />
            <br />
            <TextField
              id="password2"
              type="password"
              validate={required()}
              value={this.state.pwdvalue2}
              onChange={this.handleChange2}
              label="请再输入一次密码"
              placeholder="请再输入一次密码"
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              取消
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.handleSubmit(record);
              }}
            >
              重置
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  showNotification: PropTypes.func
};

const enhance = compose(
  connect(
    null,
    {
      showNotification: showNotification
    }
  ),
  translate
);

export default enhance(ResetPassword);
