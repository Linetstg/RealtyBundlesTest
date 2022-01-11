import React, { useState, useEffect } from 'react';

import './App.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';

const translationEn = {
  welcome: "Information about the weather in the city ",
  information: `Access current weather data for any location including over 200,000 cities.
  We collect and process weather data from different sources such as global and local weather models, satellites, radars and a vast network of weather stations`,
  temperature: `Average air temperature`,
  humidity: `Humidity`,
  pressure: `Atmosphere pressure`,
  addInfo: `Additional Information`,
  lang: "Language",
  city: "City"
}

const translationHeb = {
  welcome: "מידע על מזג האוויר בעיר ",
  information: `גישה לנתוני מזג אוויר עדכניים עבור כל מיקום כולל למעלה מ-200,000 ערים
  אנו אוספים ומעבדים נתוני מזג אוויר ממקורות שונים כגון מודלים של מזג אוויר גלובליים ומקומיים, לוויינים, מכ"מים ורשת עצומה של תחנות מזג אוויר`,
  temperature: `טמפרטורת אוויר ממוצעת`,
  humidity: `לחות אוויר`,
  pressure: `לחץ אטמוספירה`,
  addInfo: `מידע נוסף`,
  lang: "שפה",
  city: "עִיר"
}


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      heb: { translation: translationHeb }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });


function App() {

  const [news, setNews] = useState([]);
  const [temp, setTemp] = useState(false);
  const { t } = useTranslation();
  const [city, setCity] = useState('703448')
  let componentMounted = true;


  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=67e3ff78e41740c6b719b4d4c7c2109d`)
      if (componentMounted) {
        setNews(await response.json());
      }
      return () => {
        componentMounted = false

      }

    }
    fetchWeather()
  }, [city]);

  console.log(news)

  let mainTemp;

  if (temp) {
    mainTemp = (news.main.temp - 273.15).toFixed(2)
  }



  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);

  };

  const handleChangeTemp = (event) => {
    setTemp(event.target.checked);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  }


  return (
    <div className="container">
      <div className='settings-box'>
        <Box sx={{ width: 120}}>
          <FormControl fullWidth>
            <InputLabel variant="standard" id="select-lang">
              {t('lang')}
            </InputLabel>
            <NativeSelect
              labelId="select-lang"
              onChange={handleChange}
            >
              <option value={'en'}>English</option>
              <option value={'heb'}>עִברִית</option>

            </NativeSelect>
          </FormControl>
        </Box>

        <Box sx={{ width: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" id="select-city">
              {t('city')}
            </InputLabel>
            <NativeSelect
              labelId="select-city"

              onChange={handleChangeCity}
            >
              <option value={'703448'}>Kyiv</option>
              <option value={'281184'}>Jerusalem</option>
              <option value={'2643743'}>London</option>

            </NativeSelect>
          </FormControl>
        </Box>
        <div>
          {t('addInfo')}
          <Checkbox
            checked={temp}
            onChange={handleChangeTemp}
          />
        </div>


      </div>
      <div>
        <div className="detaile_page--info">
          <h2 className="detaile_page--title">{t('welcome')} {news.name}</h2>
          <p className="detaile_page--summary">{t('information')}</p>
          {temp
            ? <>
              <p className="detaile_page--data">{t('temperature')} {mainTemp + ` \u00b0C`} </p>
              <p className="detaile_page--data">{t('humidity')} {news.main.humidity + `%`}</p>
              <p className="detaile_page--data">{t('pressure')} {news.main.pressure}</p>
            </>

            : <p></p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
