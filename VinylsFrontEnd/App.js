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
import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const App: () => React$Node = () => {
	const [ VinylsCollection, setVinyls ] = useState([]);
	const [ text, setText ] = useState('');
	// const [ searchVinyls, setSearchVinyls ] = useState([]);

	useEffect(() => {
		axios
			.get('https://cfe084922f0c.ngrok.io/api/Vinyls/GetVinyls')
			.then((res) => {
				setVinyls(res.data);
			})
			.catch((err) => alert(err));
	}, []);

	// const SearchFilter = (name) => {
	// 	axios
	// 		.get(`https://cfe084922f0c.ngrok.io/api/Vinyls?name=${name}`)
	// 		.then((res) => {
	// 			setVinyls(VinylsCollection.filter((vinyl) => vinyl.vinylName === name || vinyl.artist === name));
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	function searchFilter(text) {
		setText(text);
		const searchdata = VinylsCollection.filter((item) => {
			const itemData = item.vinylName.toUpperCase();
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});

		setVinyls(searchdata);
	}

	const deleteVinyl = (vinylID) => {
		axios
			.delete(`https://cfe084922f0c.ngrok.io/api/Vinyls/?ID=${vinylID}`)
			.then((res) => {
				setVinyls(VinylsCollection.filter((vinyl) => vinyl.vinylID !== vinylID));
			})
			.catch((err) => console.log(err));
	};

	const updateVinyl = () => {
		axios.put;
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
								// onPress={() => this.deleteVinyl(this.state.vinylstoDelete.item.vinylID)}
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
				{/* {displayVinyls()} */}
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
