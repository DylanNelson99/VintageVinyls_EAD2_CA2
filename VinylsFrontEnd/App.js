// import React, { useState } from 'react';

// import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

// import axios from 'axios';

// const App = () => {
// 	// const [ state, setState ] = this.State([]);
// 	this.state = {
// 		Vinyl: [],
// 		Genre: []
// 	};
// axios
// 	.get('https://c26b653c5276.ngrok.io/api/Vinyls/GetVinyls')
// 	.then((res) => {
// 		console.log(res.data);
// 		setState({
// 			Vinyl: res.data
// 		});
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

// 	axios.get('https://c26b653c5276.ngrok.io/api/Genre').then((res) => {
// 		this.setState({ Genre: res.data });
// 	});

// 	const { Vinyl } = this.state;
// 	return (
// 		<View>
// 			<Table className="mt-4" striped bordered hover size="sm">
// 				<thead>
// 					<tr>
// 						<th>VinylID</th>
// 						<th>VinylName</th>
// 						<th>Artist</th>
// 						<th>VinylDescription</th>
// 						<th>ReleaseYear</th>
// 						<th>Genre</th>
// 						<th>Options</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{Vinyl.map((item) => (
// 						<tr key={item.VinylID}>
// 							<td>{item.VinylID}</td>
// 							<td>{item.VinylName}</td>
// 							<td>{item.Artist}</td>
// 							<td>{item.ReleaseYear}</td>
// 							<td>{item.Genre.GenreName}</td>
// 							<td />
// 						</tr>
// 					))}
// 				</tbody>
// 			</Table>
// 		</View>
// 	);
// };

// export default App;

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView, FlatList, Button } from 'react-native';
import axios from 'axios';
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { vinyls: [], genre: [] };

		axios
			.get('https://c26b653c5276.ngrok.io/api/Vinyls/GetVinyls')
			.then((res) => {
				console.log(res.data);
				setState({
					vinyls: res.data
				});
			})
			.catch((err) => {
				console.log(err);
			});

		axios.get('https://c26b653c5276.ngrok.io/api/Genre').then((res) => {
			setState({ genre: res.data });
		});
	}

	render() {
		const { vinyls, genre } = this.state;
		return <View style={styles.container} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20
	},
	productImg: {
		width: 200,
		height: 200
	},
	name: {
		fontSize: 28,
		color: 'red',
		fontWeight: 'bold'
	},
	price: {
		marginTop: 10,
		fontSize: 18,
		color: 'green',
		fontWeight: 'bold'
	},
	description: {
		textAlign: 'center',
		marginTop: 10,
		color: '#696969'
	},
	star: {
		width: 40,
		height: 40
	},
	btnColor: {
		height: 30,
		width: 30,
		borderRadius: 30,
		marginHorizontal: 3
	},
	btnSize: {
		height: 40,
		width: 40,
		borderRadius: 40,
		borderColor: '#778899',
		borderWidth: 1,
		marginHorizontal: 3,
		backgroundColor: 'white',

		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	starContainer: {
		justifyContent: 'center',
		marginHorizontal: 30,
		flexDirection: 'row',
		marginTop: 20
	},
	contentColors: {
		justifyContent: 'center',
		marginHorizontal: 30,
		flexDirection: 'row',
		marginTop: 20
	},
	contentSize: {
		justifyContent: 'center',
		marginHorizontal: 30,
		flexDirection: 'row',
		marginTop: 20
	},
	separator: {
		height: 2,
		backgroundColor: '#eeeeee',
		marginTop: 20,
		marginHorizontal: 30
	},
	shareButton: {
		marginTop: 10,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		backgroundColor: '#00BFFF'
	},
	shareButtonText: {
		color: '#FFFFFF',
		fontSize: 20
	},
	addToCarContainer: {
		marginHorizontal: 30
	}
});
