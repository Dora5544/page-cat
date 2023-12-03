"use client"

import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from 'react';
import { chatService } from '../../services/openai'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ChatMessage } from '@azure/openai';


export function Chat() {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [response, setResponse] = useState('');     //State to hold the chat response
    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const send = () => {

        const historyChatList = [...chatList];
        historyChatList.push({
            role: 'user',
            content: inputValue
        });

        setChatList(historyChatList);

        chatService.chat(inputValue)
            .then(result => {
                setResponse(result[-1].content || '');

            }).catch((err) => {
                console.error("The sample encountered an error:", err);
            });
    }

    return (
        <div>
            <List>
                {
                    chatList.map(each => <ChatItem role={each.role} content={each.content}></ChatItem>)
                }
            </List>
            <TextField
                label="Please input your question"
                sx={{ m: 1, width: '96%', position: 'fixed', bottom: 0, left: 0 }}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end"> <IconButton type="button" aria-label="send" onClick={() => send()}>
                        <SendIcon />
                    </IconButton></InputAdornment>
                }}

            />
        </div>

    );
}

function ChatItem(chatMessage: ChatMessage) {

    return <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
            primary="Brunch this weekend?"
            secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
            }
        />
    </ListItem>

}