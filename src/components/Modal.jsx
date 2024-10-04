import React from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  Card,
  CardHeader,
  Container,
  Divider,
  Fade,
  IconButton,
  Modal as MuiModal,
  Slide,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: "",
      subtitle: "",
      component: null,
      size: "sm",
    };
  }

  open(title, component, size = "sm", subtitle = "") {
    let data = {
      open: true,
      title,
      subtitle,
      component,
      size,
    };

    this.setState(data);
  }

  close() {
    this.setState({
      open: false,
      title: "",
      subtitle: "",
      component: null,
    });
  }

  render() {
    return (
      <MuiModal
        open={this.state.open}
        onClose={() => this.close()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //     timeout: 500,
        // }}
      >
        <Fade in={this.state.open}>
          <Container component="div" maxWidth={this.state.size} py={2}>
            <Card>
              <CardHeader
                title={this.state.title}
                subheader={this.state.subtitle}
                titleTypographyProps={{
                  variant: "h6",
                }}
                subheaderTypographyProps={{
                  variant: "subtitle2",
                }}
                action={
                  <Tooltip title="Close">
                    <IconButton onClick={() => this.close()}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
              <Divider />
              {this.state.component}
            </Card>
          </Container>
        </Fade>
      </MuiModal>
    );
  }
}

export default Modal;
