import { Credentials } from "./helper/Credentials";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./components/Dropdown";
import ListBox from "./components/ListBox";
import Detail from "./components/Detail";

function App() {
	const spotify = Credentials();

	const [token, setToken] = useState("");
	const [genres, setGenres] = useState({
		selectedGenre: "",
		listOfGenresFromAPI: [],
	});
	const [playlist, setPlaylist] = useState({
		selectedPlaylist: "",
		listOfPlaylistFromAPI: [{ name: "hey" }, { name: "hello" }],
	});
	const [tracks, setTracks] = useState({
		selectedTracks: "",
		listOFTracksFromAPI: [],
	});
	const [trackDetail, setTrackDetail] = useState(null);

	useEffect(() => {
		axios("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
			},
			data: "grant_type=client_credentials",
		})
			.then((tokenResponse) => {
				setToken(tokenResponse.data.access_token);
				axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
					method: "GET",
					headers: {
						Authorization: "Bearer " + tokenResponse.data.access_token,
					},
				}).then((genreResponse) => {
					setGenres({
						selectedGenre: genres.selectedGenre,
						listOfGenresFromAPI: genreResponse.data.categories.items,
					});
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

	const genreChanged = (value) => {
		setGenres({
			selectedGenre: value,
			listOfGenresFromAPI: genres.listOfGenresFromAPI,
		});

		axios(
			`https://api.spotify.com/v1/browse/categories/${value}/playlists?limit=10`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		).then((playlistResponse) => {
			setPlaylist({
				selectedPlaylist: playlist.selectedPlaylist,
				listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
			});
		});
	};

	const playlistChanged = (value) => {
		setPlaylist({
			selectedPlaylist: value,
			listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
		});
	};

	const handleClick = (event) => {
		event.preventDefault();

		axios(
			`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((tracksResponse) => {
			setTracks({
				selectedTracks: tracks.selectedTracks,
				listOFTracksFromAPI: tracksResponse.data.items,
			});
		});
	};

	const listBoxClicked = (value) => {
		const currentTracks = [...tracks.listOFTracksFromAPI];
		const trackInfo = currentTracks.filter((track) => track.track.id === value);

		setTrackDetail(trackInfo[0].track);
	};

	return (
		<div className="bg-black">
			<form
				onSubmit={handleClick}
				className="min-h-screen max-w-3xl px-10 mx-auto text-white pt-10"
			>
				Not-Spotify
				<Dropdown
					label="Genres: "
					options={genres.listOfGenresFromAPI}
					selectedValue={genres.selectedGenre}
					changed={genreChanged}
				/>
				<Dropdown
					label="Playlists: "
					options={playlist.listOfPlaylistFromAPI}
					selectedValue={playlist.selectedPlaylist}
					changed={playlistChanged}
				/>
				<div>
					<button
						type="submit"
						className="bg-green-500 font-semibold rounded-full px-8 py-2 my-2"
					>
						Search
					</button>
					<div className="flex justify-between">
						<ListBox
							items={tracks.listOFTracksFromAPI}
							clicked={listBoxClicked}
						/>
						{trackDetail && <Detail {...trackDetail} />}
					</div>
				</div>
			</form>
		</div>
	);
}

export default App;
