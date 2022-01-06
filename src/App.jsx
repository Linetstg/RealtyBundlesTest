import React, { useState, useEffect } from 'react';

import './App.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';




function App() {

  const [news, setNews] = useState([]);
  const [lang, setLang] = useState('english')


  useEffect(() => {

    fetch(lang === 'english'
      ? 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=127a189356e44612b058d2ce9182ed38'
      : 'https://newsapi.org/v2/top-headlines?country=il&apiKey=127a189356e44612b058d2ce9182ed38')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server is not response ${response.status}`);
        }

        return response.json();
      })
      .then(data => setNews(data.articles))


  }, [lang])

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  console.log(news)
  return (
    <div className="App">
      <Box sx={{ width: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" id="select-label">
          {lang === 'english' ? 'Language' : 'שפה'}
          </InputLabel>
          <NativeSelect
            labelId="select-label"
            defaultValue={lang}
            onChange={handleChange}
          >
            <option value={'english'}>English</option>
            <option value={'hebrew'}>עִברִית</option>
            
          </NativeSelect>
        </FormControl>
      </Box>
    
      <div>
        {news.map((el) => (
          <section key={el.title}>
            <h2 >{el.title}</h2>
            <p>{el.description}</p>
            <a href={el.url} target="_blank">More Details</a>
          </section>
        ))}
      </div>
    </div>
  );
}

export default App;
