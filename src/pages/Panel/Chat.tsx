"use client"

import React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


export function Chat() {

    return (
        <div>
            <TextField
                label="Please input your question"
                sx={{ m: 1, width: '100%', position: 'fixed', bottom: 0, left: 0 }}
                InputProps={{
                    endAdornment: <InputAdornment position="end"> <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton></InputAdornment>
                }}

            />
        </div>

    );
}