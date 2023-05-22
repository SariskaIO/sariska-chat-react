import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { colors } from '../../assets/styles/colors';
import { getRandomColor, linkify } from '../../utils';

const useStyles = makeStyles((theme)=>({
    chatLine: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px'
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
        height: '24px', 
        width: '24px',
        fontSize: '1rem',
        backgroundColor: `${getRandomColor()}`
    },
}))

const MessageItem = ({user, message, id}) => {
    const classes = useStyles();
    return (
        <Box className={classes.chatLine} key={id}>
            <Avatar aria-label="user" className={classes.userAvatar}>
                {message.created_by_name?.toUpperCase().slice(0,1)}
            </Avatar>
            {/* <Typography key={id} className={classes.text}>
                {message.content}
            </Typography> */}
            <p style={{fontSize: '1rem', marginLeft: '16px'}} className="MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock"
                            dangerouslySetInnerHTML={{__html: linkify(message?.content, {className: classes.link})}}>
                            </p>
        </Box>
    );

}

export default MessageItem;
