"use client"


import { ChatMessage } from '@azure/openai';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';



export function Chat() {

    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [chatList, setChatList] = useState<ChatMessage[]>([]);
    const [sendingMessage, setSendingMessage] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);


    //call when chatList is changed
    useEffect(() => {
        if (inputRef.current) {
            console.log('scroll to bottom', inputRef.current)
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    }, [chatList]);


    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const send = () => {
        setSendingMessage(true);

        setChatList((prevList) => {

            const historyChatList = [...prevList, {
                role: 'user',
                content: inputValue
            }];

            //直接调在TS中实现的后台-openai.ts
            // chatService.chat(inputValue)
            //     .then(result => {
            //         console.log('Response from server:', result);
            //         setChatList(result);
            //     }).catch((err) => {
            //         console.error("The sample encountered an error:", err);
            //     });

            // Fetch API POST request
            const message = {
                Data: inputValue
            };

            fetch('https://chat-dog.azurewebsites.net/chat',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "X-ZUMO-AUTH": localStorage.getItem("accessToken") || "",
                    },
                    body: JSON.stringify(message)
                }
            )
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Response was not ok');
                    }
                    setSendingMessage(false);
                    //the response is text, parse to text
                    return response.text();
                })

                .then(data => {
                    // handle response from server
                    console.log('Response from server:', data);
                    setChatList([
                        ...historyChatList,
                        {
                            role: 'assistant',
                            content: data
                        }
                    ]);

                })
                .catch(error => {
                    // catch error
                    console.error('Fetcg error:', error);
                });

            return historyChatList;
        })

        //clear the message in input box    
        setInputValue("");
    }

    const handleEnterPress = (e: any) => {

        // handle enter press
        if (e.key === 'Enter') {
            // send message
            send();
            console.log('press enter and send message:', inputValue);
        }
    };

    const handleWaitingRsponseIcon = () => {
        if (sendingMessage) {
            return <div>{"it's generating response..."}</div>
        } else {
            return <div></div>
        }
    }

    return (
        <div>
            <List>
                {
                    chatList.filter((each) => each.role !== 'system').map((each, index) => <ChatItem key={index} role={each.role} content={each.content}></ChatItem>)

                }
            </List>

            {/* Scroll to bottom */}
            <div ref={inputRef} ></div>

            <div style={{ backgroundColor: 'white', position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
                <div>
                    {handleWaitingRsponseIcon()}
                </div>

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
            <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} src={chatMessage.role === "user" ? "user.jpg" : "assistant.jpg"} />
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
                        {/* <Markdown rehypePlugins={[rehypeHighlight]}>{chatMessage.content}</Markdown> */}
                        <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}
                            children={chatMessage.content}
                            components={{
                                code(props) {
                                    const { children, className, node, ...rest } = props
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        <SyntaxHighlighter

                                            PreTag="div"
                                            children={String(children).replace(/\n$/, '')}
                                            language={match[1]}
                                            style={materialDark}
                                        />
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                    </Typography>

                </React.Fragment>
            }
        />
    </ListItem>

}






