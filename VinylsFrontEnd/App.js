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
	const [ VinylsCollection, setStateVinyls ] = useState([]);

	useEffect(
		() => {
			axios
				.get('https://d890cebd54ce.ngrok.io/api/Vinyls/GetVinyls')
				.then((res) => setStateVinyls(res.data))
				.catch((err) => console.log(err));
		},
		[ VinylsCollection ]
	);

	// Might be a bit tricky
	function editEndpoint(drinkId) {}
	function deleteEndpoint(drinkId) {
		// https://e66f32be20ec.ngrok.io/cocktails/drinkId
	}
	function displayVinyls() {
		return VinylsCollection.map((item) => {
			return (
				<ScrollView>
					<Card>
						<CardImage source={{ uri: 'http://bit.ly/2GfzooV' }} title={item.vinylName} />
						<CardTitle subtitle={item.releaseYear} />

						<CardContent>
							<Text>Genre : {item.vinylName}</Text>
						</CardContent>

						<CardContent>
							<Text>Rareity : {item.vinylDescription}</Text>
						</CardContent>

						<CardContent>
							<Text>Genre : {item.genre.genreName}</Text>
						</CardContent>

						<CardAction separator={true} inColumn={false}>
							<CardButton onPress={() => {}} title="Edit" color="#FEB557" />
							<TouchableOpacity style={styles.buttonStyleDelete}>
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
