import React, { useEffect, useRef, useState } from 'react'
import MessageItem from "./MessageItem";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Avatar, Box, Grid, TextField, Tooltip, Zoom } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { colors } from '../../assets/styles/colors';
import CreateIcon from '@material-ui/icons/Create';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { AvatarGroup } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '90vh',
      backgroundColor: `${colors.gray}`
    },
    card: {
      flex: 1,
      width: '80%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column'
    },
    cardHeader: {
        backgroundColor: `${colors.skyblue}`
    },
    avatarList: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardContent: {
        flex: 1,
        height: '80vh'
    },
    cardForm: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
    },
    cardTextField: {
        width: '100%',
        padding: '2px'
    },
    enterText: {
        backgroundColor: `${colors.skyblue}`,
        "&:hover": {
            opacity: '0.8',
            cursor: 'pointer'
        }
    },
    box: {
        textAlign: 'left'
    },
    chatLine: {
        display: 'flex'
    },
    text: {
        background: `${colors.gray}`,
        width: 'fit-content',
        padding: '5px',
        borderRadius: '0px 5px 10px',
        marginBottom: '10px',
        maxWidth: '70%',
        marginLeft: '10px'
    },
    userAvatar: {
        height: '29px', 
        width: '29px',
        backgroundColor: `${colors.blue}`
    },
    customWidth: {
        maxWidth: 100,
        color: '#fff',
        backgroundColor: '#000',
        fontWeight: 700,
        fontSize: '110%'
    }
  }));
  
const MessageList = ({messages, pushMessage, room}) => {
    const classes = useStyles();
    const [names, setNames] = useState([]);
    const [text, setText] = useState('');
    const [user, setUser] = useState('')


    const isMessageEmpty = (text) => {
        return adjustTextMessage(text).length === 0;
    }
    
    const adjustTextMessage = (text) => {
        return text.trim();
    };
    const disableButton = isMessageEmpty(text);

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        !disableButton && 
        setNames([text, ...names]);
        pushMessage(text);
        !disableButton && setText('');
    }

    console.log('user will be', user)

    useEffect(()=> {
       const userDetails = localStorage.getItem("user");
        setUser(userDetails)
    },[])

    console.log('userDetails are', user);
    
    console.log('text is', text);

    console.log('text is', room);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
      <CardHeader
        avatar={
            <div className={classes.avatarList}>
            <Tooltip TransitionComponent={Zoom} title={names.slice(' ').join(', ')} arrow classes={{ tooltip: classes.customWidth }}>
                <AvatarGroup max={3}>
                  <Avatar className={classes.userAvatar}>R</Avatar>
                  <Avatar className={classes.userAvatar}>B</Avatar>
                  <Avatar className={classes.userAvatar}>H</Avatar>
                  <Avatar className={classes.userAvatar}>S</Avatar>
                </AvatarGroup>
                </Tooltip>
        </div>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        //title={`${room.created_by} created ${room.session_id}  ${room.created_at.getDate()}`}
        title ="guru"
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
      <Typography variant="body2" color="textSecondary" component="p">
          Hey ! Gurudeep
        </Typography>
        <Box className={classes.box}>
            {names.map((name, id)=> {
                return (
                    <Box className={classes.chatLine} key={id}>
                    <Avatar aria-label="user" className={classes.userAvatar}>
                        G
                    </Avatar>
                    <Typography key={id} className={classes.text}>
                        {name}
                    </Typography>
                    </Box>
                )
            })}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <form noValidate autoComplete="off" className={classes.cardForm} onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', alignItems: 'center'}}>
          <Grid item>
              <Avatar style={{backgroundColor: `${colors.skyblue}`}}>
                <CreateIcon />
            </Avatar>
          </Grid>
          <Grid item style={{flex: 1}}>
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
          <Avatar className={classes.enterText} onClick={handleSubmit} disabled={disableButton}>
                <DoneAllIcon />
            </Avatar> 
          </Grid>
          
        </Grid>
        </form>
      </CardActions>
      </Card>
            {/* {messages.map((message, id) => <MessageItem message={message} key={id}/>)} */}
        </div>
    )
}


export default MessageList;

const user= {  
    id: "1",
    name: "Gurudeep",
    //Optionally, you can provide user display information for better tracking and user experience
   //  avatar: <user_avatar>, 
   //  email: <user_email>
}