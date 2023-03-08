import React, { useEffect, useState } from 'react';
import { goBack } from 'react-chrome-extension-router';
import { secret } from './apiSecret';

const ChatGPTResponse = ({ message, system }: any) => {
    const [gptMessage, setGptMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleText = async (capturedText: string, systemContent: string) => {
        let url = `https://api.openai.com/v1/chat/completions`;
        const apiKey = secret.ApiKey;
        console.log(apiKey);
        const systemMessage = {
            role: 'system',
            content: systemContent,
        };
        let requestBody = {
            messages: [systemMessage, { role: 'user', content: capturedText }],
            model: 'gpt-3.5-turbo',
        };
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                console.log(data.choices[0].message.content);
                setIsLoading(false);
                setGptMessage(data.choices[0].message.content);
                chrome.storage.local.set({
                    gptMessage: data.choices[0].message.content,
                });
            } else {
                setIsLoading(false);
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        handleText(message, system);
    }, [])

    return (
        <div className="App">
            {isLoading ? (<p className='text-white'>Loading something for you from ChatGPT!!!</p>) : (
                <div>
                    <h3 style={{ color: 'white' }}>
                        Here is a message from Chat GPT!
                    </h3>
                    <p style={{ color: 'white' }}>{gptMessage}</p>
                    <button
                        onClick={() => {
                            goBack();
                        }}
                        className=" button-content"
                    >
                        Go Back!
                    </button>
                </div>

            )}
        </div>
    )
}
export default ChatGPTResponse;