/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const App: () => React$Node = () => {
	const [ VinylsCollection, setVinyls ] = useState([]);

	useEffect(() => {
		axios
			.get('https://edf68d08102c.ngrok.io/api/Vinyls/GetVinyls')
			.then((res) => setVinyls(res.data))
			.catch((err) => console.log(err));
	}, []);

	function editEndpoint(drinkId) {}

	const deleteVinyl = (vinylID) => {
		axios
			.delete(`https://edf68d08102c.ngrok.io/api/Vinyls/?ID=${vinylID}`)
			.then((res) => {
				setVinyls(VinylsCollection.filter((vinyl) => vinyl.vinylID !== vinylID));
			})
			.catch((err) => console.log(err));
	};

	function displayVinyls() {
		return VinylsCollection.map((item) => {
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
		});
	}
	return (
		<SafeAreaView>
			<ScrollView>
				<Text style={styles.mainHeading}>Vinyls</Text>
				{displayVinyls()}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
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
