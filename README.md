### [Live Demo](https://todd-gardner.github.io/react_movies)
## Welcome to My Movies App!
This is a REACT movies app. When the app loads it connects to the TMDB to get a list of featured movies and displays them, along with the movie poster and a color coded rating for each movie.
When the user hovers over a movie the description of the movie slides up onto the card.
Users can also search for movies using the search bar at the top of the screen. I added auto search functionallity - after the user has entered in a minimum of 3 letters the relevant movies are displayed and change with each letter entered. When the user deletes letters, the list is updated accordingly and defaults to the featured list when there are less then 3 letters entered. (*This feature may change if it isn't performant or if it is making too many API requests*)

This app was bootstrapped with create-react-app for basic boilerplate code.

### Get your API KEY
Please visit the TMDB website (https://www.themoviedb.org) to obtain your API key. Rename the .env.sample file to .env and enter your API key there.

### Try it out
First clone the repository.
Please visit the TMDB website (https://www.themoviedb.org) to obtain your API key. Rename the .env.sample file to .env and enter your API key there.
Type 'git init' in the directory.
Then type 'npm start' or 'yarn start'.
Open http://localhost:3000/ in your browser if it doesn't automattically open for you.

Feel free to submit PR's, problems or suggestions. Suggestions are always welcome!


Some of the styles and ideas came from Florin Pop - Thank you!
<hr>

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
