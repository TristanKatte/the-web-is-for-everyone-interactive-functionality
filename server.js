// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

// Maak een GET route voor de index
app.get('/', function (request, response) {
  // Render index.ejs uit de views map
  response.render('index');
});

app.get('/vragen', function (request, response){
response.render ('vragen');
});

app.get('/calculator', function (request, response){

  fetchJson('https://fdnd-agency.directus.app/items/hf_sdgs').then((sdgDataUitDeAPI) => {
		response.render('calculator', {sdgs: sdgDataUitDeAPI.data });
    
	});
  });

  //Een post route
  // app.post()



// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})