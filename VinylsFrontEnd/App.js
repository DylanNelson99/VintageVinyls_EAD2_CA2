/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import {
	StyleSheet,
	Text,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	FlatList,
	Button
} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { State } from 'react-native-gesture-handler';

const App: () => React$Node = () => {
	const [ VinylsCollection, setVinyls ] = useState([]);
	const [ VinylsCollectionSearch, setVinylsSearch ] = useState([]);
	const [ text, setText ] = useState('');
	const [ state, setState ] = useState({ showForm: false });

	useEffect(() => {
		axios
			.get('https://d5ccf3423a1e.ngrok.io/api/Vinyls/GetVinyls')
			.then((res) => {
				setVinyls(res.data), setVinylsSearch(res.data);
			})
			.catch((err) => alert(err));
	}, []);

	function searchFilter(text) {
		setText(text);

		const searchdata = VinylsCollectionSearch.filter((item) => {
			const itemData = item.vinylName.toUpperCase();
			const artist = item.artist.toUpperCase();
			const vinylDescription = item.vinylDescription.toUpperCase();
			const genre = item.genre.genreName.toUpperCase();
			const textData = text.toUpperCase();
			return (
				itemData.includes(textData) ||
				artist.includes(textData) ||
				vinylDescription.includes(textData) ||
				genre.includes(textData)
			);
		});

		setVinyls(searchdata);
	}
	const deleteVinyl = (vinylID) => {
		axios
			.delete(`https://d5ccf3423a1e.ngrok.io/api/Vinyls/?ID=${vinylID}`)
			.then((res) => {
				setVinyls(VinylsCollection.filter((vinyl) => vinyl.vinylID !== vinylID));
			})
			.catch((err) => console.log(err));
	};

	const updateVinyl = () => {
		axios.put();
	};

	function displayVinyls({ item }) {
		{
			return (
				<ScrollView>
					<Card>
						<CardImage source={{ uri: item.vinylImage }} title={item.artist} />
						<CardTitle subtitle={item.releaseYear} />

						<CardContent>
							<Text>Name : {item.vinylName}</Text>
						</CardContent>

						<CardContent>
							<Text>Rarity : {item.vinylDescription}</Text>
						</CardContent>

						<CardContent>
							<Text>Genre : {item.genre.genreName}</Text>
						</CardContent>

						<CardAction separator={true} inColumn={false}>
							<CardButton
								onClick={() => this.setState({ showForm: true })}
								title="Edit"
								color="#FEB557"
							/>

							{/* <CardButton onClick={() => this.deleteItem(this.state.itemToDelete.id)}>Remove</CardButton> */}

							<TouchableOpacity
								style={styles.buttonStyleDelete}
								onPress={() => deleteVinyl(item.vinylID)}
							>
								<Text style={styles.button}>Delete</Text>
							</TouchableOpacity>
						</CardAction>
					</Card>
				</ScrollView>
			);
		}
	}
	return (
		<SafeAreaView>
			<ScrollView>
				<Text style={styles.mainHeading}>Vinyls</Text>
				<TextInput
					style={styles.input}
					value={text}
					onChangeText={(text) => searchFilter(text)}
					placeholder="Search"
				/>
				<FlatList
					data={VinylsCollection}
					renderItem={displayVinyls}
					keyExtractor={(item) => item.vinylID.toString()}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	// buttonStyleSearch: {
	// 	backgroundColor: '#ff4e50',
	// 	alignItems: 'center',
	// 	width: 60,
	// 	paddingBottom: 10,
	// 	paddingTop: 10,
	// 	marginLeft: 10,
	// 	borderRadius: 3
	// },
	// mainHeading: {
	// 	fontSize: 35,
	// 	fontFamily: 'sans-serif-light',
	// 	textAlign: 'center',
	// 	marginBottom: 25,
	// 	backgroundColor: '#ff4e50',
	// 	paddingBottom: 10,
	// 	paddingTop: 10
	// },
	// input: {
	// 	width: 250,
	// 	borderRadius: 5,
	// 	height: 40,
	// 	margin: 12,
	// 	borderWidth: 1
	// },
	buttonStyleDelete: {
		backgroundColor: '#ff4e50',
		alignItems: 'center',
		width: 60,
		paddingBottom: 10,
		paddingTop: 10,
		marginLeft: 10,
		borderRadius: 3,
		color: 'white'
	},
	mainHeading: {
		fontSize: 35,
		fontFamily: 'sans-serif-light',
		textAlign: 'center',
		marginBottom: 25,
		backgroundColor: 'white',
		paddingBottom: 10,
		paddingTop: 10,
		color: 'black'
	},
	button: {
		color: 'white'
	}
});

export default App;
