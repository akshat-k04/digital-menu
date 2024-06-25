import React, { createContext, useState } from 'react';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ChapterContext = createContext();

const ChapterProvider = ({ children }) => {
    const [chapter_global, setC] = useState({});

    function updateChapter(temp_chapter) {
        console.log("context is running");
        setChapter(temp_chapter);
        if (temp_chapter == null) {
            console.log("bach gaya bhai data");
        }
        fetch(`${baseURL}/api/chapters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(temp_chapter),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    function setChapter(temp) {
        setC(temp);
        console.log(temp);
    }

    return (
        <ChapterContext.Provider value={{ chapter_global, updateChapter, setChapter }}>
            {children}
        </ChapterContext.Provider>
    );
};

export { ChapterContext, ChapterProvider };
