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
  welcome: "It is snowing in Kyiv: when to wait and what will be banned from January 9",
  sample: `Drivers are asked not to use personal cars during the snowfall if possible.
  Snowfall is expected in Kyiv. Rainfall, according to weather forecasters, will begin on the evening of January 8 and will last all day on January 9.
  In this regard, according to the Kyiv City State Administration, from 7:00 on January 9, the entry of large vehicles into the capital will be prohibited.
  It is noted that special equipment of road workers will start treatment of roads, bridges and sidewalks with anti-ice means before the beginning of precipitation.`,
  lang: "Language"
}

const translationHeb = {
  welcome: "יורד שלג בקייב: מתי לחכות ומה ייאסר החל מה-9 בינואר",
  sample: `
  הנהגים מתבקשים לא להשתמש במכוניות אישיות במהלך השלג במידת האפשר.
  צפוי לרדת שלג בקייב. גשמים, על פי חזאי מזג האוויר, יתחילו בערב ה-8 בינואר ויימשכו כל היום ב-9 בינואר.
  בהקשר זה, על פי מינהל מדינת קייב, החל מהשעה 7:00 ב-9 בינואר, תיאסר כניסת כלי רכב גדולים לבירה.
  יצוין כי ציוד מיוחד של עובדי הכביש יתחיל טיפול בכבישים, גשרים ומדרכות באמצעי אנטי קרח לפני תחילת המשקעים.`,
  lang: "שפה"
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
  let componentMounted = true;


  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?id=703448&appid=67e3ff78e41740c6b719b4d4c7c2109d')
      if (componentMounted) {
        setNews(await response.json());
      }
      return () => {
        componentMounted = false

      }

    }
    fetchWeather()
  }, []);

  let mainTemp;

  if(temp) {
     mainTemp = (news.main.temp - 273.15).toFixed(2)
  }



  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value)

  };

  const handleChangeTemp = (event) => {
    setTemp(event.target.checked);
  };


  return (
    <div className="App">
      <Box sx={{ width: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" id="select-label">
            {t('lang')}
          </InputLabel>
          <NativeSelect
            labelId="select-label"
            // defaultValue={}
            onChange={handleChange}
          >
            <option value={'en'}>English</option>
            <option value={'heb'}>עִברִית</option>

          </NativeSelect>
        </FormControl>
      </Box>

      <div>
        <h2>{t('welcome')}</h2>
        <p>{t('sample')}</p>

        <p>{news.name}</p>
        <p>{temp ? `${mainTemp} `: '' }</p>
        <Checkbox
          checked={temp}
          onChange={handleChangeTemp}
          
        />
      </div>
    </div>
  );
}

export default App;
