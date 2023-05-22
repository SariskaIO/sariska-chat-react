import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import { colors } from "../../assets/styles/colors";
import CreateIcon from "@material-ui/icons/Create";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { AvatarGroup } from "@material-ui/lab";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import FileAttached from "./FileAttached";
import MediaChat from "./MediaChat";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: `${colors.gray}`,
  },
  card: {
    flex: 1,
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    height: "60vh",
  },
  cardHeader: {
    backgroundColor: `${colors.skyblue}`,
  },
  avatarList: {
    display: "flex",
    flexDirection: "row",
  },
  cardContent: {
    flex: 1,
    height: "200px",
    overflow: "auto",
    padding: '16px 73px',
    [theme.breakpoints.down('md')]: {
      padding: '16px',
    }
  },
  cardAction: {
    boxShadow: "0px 4px 4px 2px rgba(0,0,0,0.8)",
    zIndex: "9",
  },
  cardForm: {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
  },
  cardTextField: {
    width: "100%",
    padding: "2px",
  },
  enterText: {
    backgroundColor: `${colors.skyblue}`,
    "&:hover": {
      opacity: "0.8",
      cursor: "pointer",
    },
  },
  box: {
    textAlign: "left",
  },
  chatLine: {
    display: "flex",
  },
  text: {
    background: `${colors.gray}`,
    width: "fit-content",
    padding: "5px",
    borderRadius: "0px 5px 10px",
    marginBottom: "10px",
    maxWidth: "70%",
    marginLeft: "10px",
  },
  userAvatar: {
    height: "29px",
    width: "29px",
    backgroundColor: `${colors.blue}`,
  },

  userAvatar1: {
    height: "26px",
    width: "26px",
    backgroundColor: `${colors.white}`,
    color: `${colors.blue}`,
  },
  customWidth: {
    maxWidth: 100,
    color: "#fff",
    backgroundColor: "#000",
    fontWeight: 700,
    fontSize: "110%",
  },
}));

const MessageList = ({ messages, pushMessage, user }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [chat, setChat] = useState("");
  const [room, setRoom] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  let [fileAttached, setFileAttached] = useState([]);
  //const [user, setUser] = useState(null);

  const isMessageEmpty = () => {
    let textLength = adjustTextMessage(text).length;
    let fileLength = fileAttached.length
    if((!textLength && fileLength) || (textLength && !fileLength) || (textLength && fileLength)){
        return false;
    }else{
        return true;
    }
  };

  const adjustTextMessage = (text) => {
    return text.trim();
  };
  const disableButton = isMessageEmpty();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleEmojiPicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handleEmojiClick = (emojiData, event) => {
    setSelectedEmoji(emojiData);
    setText(text + emojiData.emoji);
    setIsPickerVisible(!isPickerVisible);
  };

  const startFileUpload = (fileData) => {
    const index = fileAttached.findIndex((item) => fileData.id === item.id);

    if (index >= 0) {
      const item = fileAttached[index];
      item.status = fileData.status;
      item.url = fileData.url;
      fileAttached[index] = item;
    } else {
      setFileAttached([...fileAttached, fileData]);
    }
  };

  const removeAttachment = (id) => {
    setFileAttached(fileAttached.filter((file) => file.id !== id));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileAttached.find((item) => item.status === "loading")) {
      return;
    }
    if (!disableButton) {
      text && pushMessage(text);
      if (fileAttached.length) {
        fileAttached.map((item) => {
          if (item.status === "done") {
            pushMessage(item.url);
          }
        });
      }
    }
    setChat((chat) => [...chat, text]);
    if (!disableButton) {
      setText("");
      setFileAttached([]);
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const roomDetails = JSON.parse(localStorage.getItem("room"));
    //setUser(userDetails);
    setRoom(roomDetails);
  }, []);

  const scrollRef = useRef(null);
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [text]);
  
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <div className={classes.avatarList}>
              <Tooltip
                TransitionComponent={Zoom}
                title={user.name}
                arrow
                classes={{ tooltip: classes.customWidth }}
              >
                <AvatarGroup max={2}></AvatarGroup>
              </Tooltip>
            </div>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`Room Name: ${room?.session_id}, Name: ${user?.name}`}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
          <Box className={classes.box}>
            {messages.map((message, id) => {
              return <MessageItem message={message} id={id} user={user} />;
            })}
          </Box>
          <Typography ref={scrollRef} style={{ height: "18px" }}></Typography>
        </CardContent>
            {
                fileAttached.length>0 && (
                    <Box className={classes.cb__chatWrapper__attachements}>
                        {
                            fileAttached.map((file, index)=>(
                                <FileAttached 
                                    key={index}
                                    fileData={file}
                                    removeAttachment={removeAttachment}
                                />
                            ))
                        }
                    </Box>
                )
            }
        <CardActions disableSpacing className={classes.cardAction}>
        {<MediaChat
                                    startFileUpload={startFileUpload}
                                    currentMessage={text}
                                />}
          <form
            noValidate
            autoComplete="off"
            className={classes.cardForm}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              style={{ width: "100%", alignItems: "center" }}
            >
              <Grid item>
                <Button
                  style={{
                    padding: "2px",
                    borderRadius: "50%",
                    minWidth: "50%",
                  }}
                  onClick={handleEmojiPicker}
                >
                  <Emoji unified="1f600" size="32" />
                </Button>
              </Grid>
              <Grid item style={{ flex: 1 }}>
                {isPickerVisible ? (
                  <Box
                    sx={{ position: "absolute", left: "60px", bottom: "145px" }}
                  >
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      emojiStyle="apple"
                      searchDisabled
                      previewConfig={{
                        showPreview: false,
                      }}
                      height={350}
                    />
                  </Box>
                ) : null}
                <TextField
                  id="text"
                  label="Enter Text Here"
                  variant="outlined"
                  className={classes.cardTextField}
                  onChange={handleChange}
                  value={text}
                />
              </Grid>
              <Grid item>
                <Avatar
                  className={classes.enterText}
                  onClick={handleSubmit}
                  disabled={disableButton}
                >
                  <DoneAllIcon />
                </Avatar>
              </Grid>
            </Grid>
          </form>
        </CardActions>
      </Card>
      {/* {messages.map((message, id) => <MessageItem message={message} key={id}/>)} */}
    </div>
  );
};

export default MessageList;
