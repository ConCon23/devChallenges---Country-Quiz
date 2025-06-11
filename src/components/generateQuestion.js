import  Axios  from "axios"
export const generateQuestion = async () => {
    const countries = await Axios.get("https://restcountries.com/v3.1/all").then(res => res.data);
    const selectedCountries = countries.sort(() => 0.5 - Math.random()).slice(0, 15)
    
    const questions = [
           {
            //Question 1
            question: `What is the capital of ${selectedCountries[0]?.name?.common || "Unknown Country"}?`,
            options: [...([...new Set(countries.filter(country => country.capital?.[0] && country.capital[0].trim() !== "" && 
              country.capital?.[0] !== selectedCountries[0]?.capital?.[0] &&
              country?.name?.common !== selectedCountries[0]?.name?.common
            )
                .map(option => option?.capital?.[0]))].slice(0, 3)), 
                selectedCountries[0]?.capital?.[0]].sort(() => 0.5 - Math.random()),
            correctAnswer: selectedCountries[0]?.capital?.[0]
            },
            {
                //Question 2
                question: `What continent does ${selectedCountries[1]?.name?.common || "Unknown Country"} belong?`,
                options: [...[...new Set(countries.filter(country => country.continents?.[0] && country.continents?.[0] !== selectedCountries[1]?.continents?.[0])
                    .map(option => option.continents[0]))].slice(0, 3), 
                    selectedCountries[1]?.continents?.[0]].sort(() => 0.5 - Math.random()),
                correctAnswer: selectedCountries[1]?.continents?.[0]
            },
            {
                // Question 3
                question: `What is the currency used in ${selectedCountries[2]?.name?.common || "Unknown Country"}?`,
                options: [
                  ...([...new Set(countries
                    .filter(country => country?.currencies && country?.name?.common !== selectedCountries[2]?.name?.common &&
                    Object.values(country.currencies).every(currency => currency.name !== Object.values(selectedCountries[2]?.currencies || {})[0]?.name)
                    )
                    .map(country => {
                      const currency = Object.values(country.currencies)[0];
                      return currency?.name;
                    })
                    .filter(Boolean))].slice(0, 3)),
                  Object.values(selectedCountries[2]?.currencies || {})[0]?.name
                ].sort(() => 0.5 - Math.random()),
                correctAnswer: Object.values(selectedCountries[2]?.currencies || {})[0]?.name
              },
              {
                // Question 4
                question: `What is an official language of ${selectedCountries[3]?.name?.common}?`,
                options: (() => {
                    const correctLang = Object.values(selectedCountries[3]?.languages || {})[0]?.toLowerCase().trim();
                    return [
                      ...([...new Set(
                        countries
                          .flatMap(country => Object.values(country?.languages || {}))
                          .map(language => language.toLowerCase().trim())
                          .filter(language => language && language !== correctLang)
                      )].slice(0, 3)),
                      correctLang
                    ].sort(() => 0.5 - Math.random());
                  })(),
                correctAnswer: Object.values(selectedCountries[3]?.languages || {})[0]?.toLowerCase().trim()
              },
              {
                // Question 5
                question: `Which of the following countries has the highest population?`,
                options: [
                  selectedCountries[4]?.name?.common,
                  ...countries
                    .filter(country => country?.name?.common !== selectedCountries[4]?.name?.common)
                    .sort((a, b) => b.population - a.population)
                    .slice(0, 3)
                    .map(country => country.name.common)
                ].sort(() => 0.5 - Math.random()),
                correctAnswer: countries
                  .filter(country => [selectedCountries[4], ...countries]
                    .map(c => c?.name?.common)
                    .includes(country?.name?.common))
                  .sort((a, b) => b.population - a.population)[0]?.name?.common
              },
              {
                // Question 6
                question: `Which timezone does ${selectedCountries[5]?.name?.common} belong to?`,
                options: [
                  ...([...new Set(countries
                    .filter(country => country?.timezones?.[0] && country?.name?.common !== selectedCountries[5]?.name?.common &&
                      country?.timezones?.[0] !== selectedCountries[5]?.timezones?.[0]
                    )
                    .map(country => country?.timezones?.[0])
                    .filter(Boolean))]
                    .slice(0, 3)),
                  selectedCountries[5]?.timezones?.[0]
                ].sort(() => 0.5 - Math.random()),
                correctAnswer: selectedCountries[5]?.timezones?.[0]
              },
              {
                // Question 7
                question: `Which country shares a border with Germany?`,
                options: [
                  ...([...new Set(countries
                    .filter(country => !country?.borders?.includes(country.cca3))
                    .map(country => country.name.common))]
                    .slice(0, 3)),
                    countries.find(country => country?.name?.common === "Denmark")?.name?.common,
                ].sort(() => 0.5 - Math.random()),
                correctAnswer:  countries.find(country => country?.name?.common === "Denmark")?.name?.common
              },
              {
                //Question 8
                question: `Which continent is ${selectedCountries[6]?.name?.common} located in?`,
                options: [
                  ...([...new Set(countries
                    .filter(country => country.region && country.region !== selectedCountries[6]?.region)
                    .map(country => country.region)
                    .filter(Boolean))]
                    .slice(0, 3)),
                  selectedCountries[6]?.region
                ].sort(() => 0.5 - Math.random()),
                correctAnswer: selectedCountries[6]?.region
              },
              {
                //Question 9
                question: `What is the area of ${selectedCountries[7]?.name?.common} in square kilometers?`,
                options: [
                  selectedCountries[7]?.area,
                  ...([...new Set(countries
                    .filter(c => c.area && c.name.common !== selectedCountries[7]?.name?.common)
                    .map(c => c.area))]
                    .slice(0, 3))
                ].sort(() => 0.5 - Math.random()),
                correctAnswer: selectedCountries[7]?.area
              },
              {
                //Question 10
                question: `Which of the following countries is home to the famous landmark "Machu Picchu"?`,
                options: [
                  "Peru", 
                  ...([...new Set(countries
                    .filter(country => country.name.common !== "Peru"))]
                    .slice(0, 3))
                    .map(country => country.name.common)
                ].sort(() => 0.5 - Math.random()),
                correctAnswer: "Peru"
              }
        ];
    
    return questions
}

