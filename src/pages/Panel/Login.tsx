import React, { useEffect, useRef, useState } from 'react';
import * as msal from '@azure/msal-browser'; // Import the 'msal' package
import { AuthenticationResult } from '@azure/msal-browser';
import { PrimaryButton, Stack, Text } from '@fluentui/react';

const redirectUri = typeof chrome !== "undefined" && chrome.identity ?
    chrome.identity.getRedirectURL() :
    `${window.location.origin}/index.html`;

const msalInstance = new msal.PublicClientApplication({
    auth: {
        authority: "https://login.microsoftonline.com/common/",
        clientId: "ff720151-7e80-42db-9d33-f8ae39d222b7",
        redirectUri,
        postLogoutRedirectUri: redirectUri
    },
    cache: {
        cacheLocation: "localStorage"
    }
});

await msalInstance.initialize();

export function Login() {
    
    const signIn = async () => {

        const url = await getLoginUrl();
        console.log("get login url", url)

        //get id_token from identity provider
        const result = await launchWebAuthFlow(url);
        console.log('logon result', result)

        //get the real authentication token from aad with id_token
        const aadResponse = await fetch(" https://chat-dog.azurewebsites.net/.auth/login/aad", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "access_token": result?.idToken,
            })

        }).then(res => res.json());

        console.log("real authentication token", aadResponse)

        localStorage.setItem("accessToken", aadResponse.authenticationToken);

        window.location.reload();
    }

    async function getLoginUrl(request?: any, reject?: any) {
        return new Promise((resolve) => {
            // library helps splice loginurl
            msalInstance.loginRedirect({
                ...request,
                onRedirectNavigate: (url) => {
                    resolve(url);
                    return false;
                }
            }).catch(reject);
        });
    }

    async function launchWebAuthFlow(url: any) {
        return new Promise<AuthenticationResult | null>((resolve, reject) => {
            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url
            }, (responseUrl) => {

                console.log("responseUrl", responseUrl)
                // Response urls includes a hash (login, acquire token calls)
                if (responseUrl && responseUrl.includes("#")) {
                    // response is object with hash encoded values
                    msalInstance.handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
                        .then(resolve)
                        .catch(reject)
                } else {
                    // Logout calls
                    // resolve();
                }
            })
        })
    }

    return (
        <div>
            <Stack
                horizontalAlign="center"
                verticalAlign="center"
                verticalFill
                styles={{
                    root: {
                        width: '100%',
                        height: '80vh',
                        background: '#fff',
                        overflow: 'hidden',
                        textAlign: 'center',
                    },
                }}
            >
                <Text variant="xLarge" styles={{ root: { marginBottom: '20px' } }}>Welcome</Text>

                {/* Your login form can be added here if needed */}
                {/* For simplicity, only a login button is included */}
                <PrimaryButton text="Login" onClick={signIn} />
            </Stack>
        </div>
    )
}