"use client"

import React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from 'react';
import { chatService } from '../../services/openai'


export function Chat() {
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [response, setResponse] = useState('');     //State to hold the chat response

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const send = () => {
        chatService.chat(inputValue)
            .then(result => {
                setResponse(result);

            }).catch((err) => {
                console.error("The sample encountered an error:", err);
            });
    }

    return (
        <div>
            <p> Answer: {response}</p>
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