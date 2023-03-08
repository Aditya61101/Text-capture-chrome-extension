import React, { useState } from 'react';
import { goBack, goTo } from 'react-chrome-extension-router';
import "../popup.css";
import ChatGPTResponse from './ChatGPTResponse';
const contentArray = [
    {
        "id": "1",
        "value": "How would Donald Trump say the following"
    },
    {
        "id": "2",
        "value": "Write a haiku using the following information"
    },
    {
        "id": "3",
        "value": "Summarize the following information"
    },
    {
        "id": "4",
        "value": "Check whether spelling of each word is correct or not in the following information"
    },
    {
        "id": "5",
        "value": "Check whether the following information is grammatically correct or not"
    },
    {
        "id": "6",
        "value": "Rewrite the following information in Hindi"
    },
]
const DoSomething = ({ message }: any) => {
    const [radioValue, setRadioValue] = useState<string>('');
    const handleRadioChange = (e: any) => {
        setRadioValue(e.target.value);
    }
    return (<div className="App">
        <h2 className="popup-heading">What do you want to do with this text??</h2>
        <div className='flex flex-col'>
            {
                contentArray.map((item) => {
                    return <span style={{ fontSize: "15px", marginBottom: "5px" }}><input type="radio" value={item.value} onChange={handleRadioChange} /> {item.value}</span>
                })
            }
        </div>
        <div className=' flex flex-row w-[23%] justify-between items-center'>
            <button className='text-[#61dafb] border-2 rounded border-[#61dafb] p-2' onClick={() => { goTo(ChatGPTResponse, { "message": message, "system": radioValue }) }}>
                Do Something!
            </button>
            <button className='text-[#61dafb] border-2 rounded border-[#61dafb] p-2' onClick={() => goBack()}>
                Back
            </button>
        </div>

    </div>)
}
export default DoSomething;