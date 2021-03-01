import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { colors } from '../../assets/styles/colors';

const useStyles = makeStyles((theme)=>({
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
}))
const MessageItem = ({user, message, id}) => {
    const classes = useStyles();
    return (
        <Box className={classes.chatLine} key={id}>
            <Avatar aria-label="user" className={classes.userAvatar}>
                {user.name.toUpperCase().slice(0,1)}
            </Avatar>
            <Typography key={id} className={classes.text}>
                {message.content}
            </Typography>
        </Box>
    );

}

export default MessageItem;
