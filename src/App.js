import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import { getPlacesData } from "./api/travelAdvisorApi";

function App() {
	const [type, setType] = useState("restaurants");
	const [rating, setRating] = useState("");

	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState(null);

	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [places, setPlaces] = useState([]);

	const [autocomplete, setAutocomplete] = useState(null);
	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coordinates: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);
			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
				setFilteredPlaces([]);
				setRating("");
				setIsLoading(false);
			});
		}
	}, [bounds, type]);

	const onLoad = (autoComplete) => setAutocomplete(autoComplete);

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat();
		const lng = autocomplete.getPlace().geometry.location.lng();

		setCoordinates({ lat, lng });
	};

	return (
		<>
			<CssBaseline />
			<Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
			<Grid container spacing={3} style={{ width: "100%" }}>
				<Grid item xs={12} md={4}>
					<List
						isLoading={isLoading}
						childClicked={childClicked}
						places={filteredPlaces.length ? filteredPlaces : places}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setChildClicked={setChildClicked}
						setBounds={setBounds}
						setCoordinates={setCoordinates}
						coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
