"use client"

import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { chatService } from '../../services/openai'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ChatMessage } from '@azure/openai';



export function Chat() {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const send = () => {
        //copy the latest chatList
        const historyChatList = [...chatList];
        setChatList([
            ...historyChatList,
            {
                role: 'user',
                content: inputValue
            }
        ]);

        chatService.chat(inputValue)
            .then(result => {
                setChatList(result);
            }).catch((err) => {
                console.error("The sample encountered an error:", err);
            });
        setInputValue("");
    }

    const handleEnterPress = (e: any) => {
        // handle enter press
        if (e.key === 'Enter') {
            // send message inputValue
            send();
            console.log('press enter and send message:', inputValue);
        }
    };

    return (
        <div>
            <List>
                {
                    chatList.filter((each) => each.role !== 'system').map((each, index) => <ChatItem key={index} role={each.role} content={each.content}></ChatItem>)
                }
            </List>

            <div style={{ backgroundColor: 'white', position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
                <TextField
                    label="Please input your question"
                    sx={{ m: 1, width: '96%' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterPress}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"> <IconButton type="button" aria-label="send" onClick={() => send()}>
                            <SendIcon />
                        </IconButton></InputAdornment>
                    }}
                />
            </div>
        </div>

    );
}

function ChatItem(chatMessage: ChatMessage) {

    return <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
            primary={chatMessage.role}
            secondary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {chatMessage.content}
                    </Typography>

                </React.Fragment>
            }
        />
    </ListItem>

}