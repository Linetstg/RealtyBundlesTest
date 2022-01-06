const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=127a189356e44612b058d2ce9182ed38';


export const request = (endPoint) => {
  return fetch(`${BASE_URL}${endPoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server is not response ${response.status}`);
      }

      return response.json();
    });
};