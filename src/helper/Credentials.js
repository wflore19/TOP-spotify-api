export const Credentials = () => {
	return {
		ClientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
		ClientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
	};
};
