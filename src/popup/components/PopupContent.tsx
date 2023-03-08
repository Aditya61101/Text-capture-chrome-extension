import React, { useEffect, useState } from 'react';
import { Link } from 'react-chrome-extension-router';
import DoSomething from './DoSomething';
import '../popup.css';

const PopupContent = () => {
    const [storageData, setStorageData] = useState([]);
    const [isCurr, setIsCurr] = useState(false);

    // Effect 1: Attach/remove storage onChanged listener
    useEffect(() => {
        const listener = () => {
            chrome.storage.local.get(['content'], (result) => {
                if (result && result.content) {
                    setStorageData(result.content);
                } else {
                    setStorageData([]);
                }
            });
        };
        chrome.storage.onChanged.addListener(listener);
        return () => {
            chrome.storage.onChanged.removeListener(listener);
        };
    }, []);

    // Effect 2: Sync local state with storage data on mount
    useEffect(() => {
        showAllWebData();
    }, []);
    const showAllWebData = () => {
        chrome.storage.local.get(['content'], (result) => {
            // to handle the case when the extension is removed or installed for the first time
            if (result && result.content) {
                setStorageData(result.content);
            } else {
                setStorageData([]);
            }
        });
    };
    const showCurrWebData = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTabUrl = tabs[0].url;
            const currWebData = storageData.filter((item) => {
                return item.url.toString() === currentTabUrl.toString();
            });
            setStorageData(currWebData);
            setIsCurr(true);
        });
    };

    const handleSingleDelete = (textId: string) => {
        const newStorageData = storageData.filter((item) => {
            return item.textId !== textId;
        });
        setStorageData(newStorageData);
        chrome.storage.local.set({ content: newStorageData });
        alert('Text content deleted');
    };
    const handleCloseExt = () => {
        chrome.runtime.sendMessage({ "message": "inject_false" },
            () => {
                if (!chrome.runtime.lastError) {
                    console.log("message send from popup to background!");
                } else {
                    console.log(chrome.runtime.lastError);
                    console.log("message send from popup to background2!");
                }
            });
        window.close();
    }
    const handleOpenExt = () => {
        chrome.runtime.sendMessage({ "message": "inject_true" },
            () => {
                if (!chrome.runtime.lastError) {
                    console.log("message send from popup to background!");
                } else {
                    console.log(chrome.runtime.lastError);
                    console.log("message send from popup to background2!");
                }
            });
        window.close();
    }
    return (
        <div className="App">
            <div>
                {storageData?.length === 0 ? (
                    <p className="popup-heading">No data to show</p>
                ) : (
                    <>
                        <p className="popup-heading">Your captured texts</p>

                        {storageData?.map((item) => {
                            return (
                                <div className="capture-card">
                                    <p style={{ fontSize: '15px' }}>
                                        Captured Text: {item.text}
                                    </p>
                                    <p style={{ fontSize: '10px' }}>
                                        Time of Capture: {item.captureTime}
                                    </p>
                                    <p style={{ fontSize: '10px' }}>
                                        Site Url:{' '}
                                        <a href={item.url} target="_blank" rel="noreferrer">
                                            {item.url}
                                        </a>
                                    </p>
                                    <div className=" flex justify-between w-[35%] items-center">
                                        <Link
                                            className=" button-content"
                                            component={DoSomething}
                                            props={{ message: item.text }}
                                        >
                                            Do something!
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleSingleDelete(item.textId);
                                            }}
                                            className=" button-content"
                                        >
                                            Delete Text Content
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
                <div className="flex justify-between w-[60%] m-auto items-center">
                    <button
                        onClick={showAllWebData}
                        disabled={!storageData.length && !isCurr}
                        className=" button-content"
                    >
                        All Website
                    </button>
                    <button
                        onClick={showCurrWebData}
                        disabled={!storageData.length}
                        className=" button-content"
                    >
                        This Website
                    </button>
                    <button
                        onClick={() => {
                            chrome.storage.local.clear();
                        }}
                        disabled={!storageData.length}
                        className=" button-content"
                    >
                        Delete All
                    </button>
                    <button onClick={handleCloseExt} className=" button-content">Close Extension</button>
                    <button onClick={handleOpenExt} className=" button-content">Open Extension</button>
                </div>
            </div>

        </div >
    );
}
export default PopupContent;