import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
	StyleSheet,
	Text,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	FlatList,
	Modal,
	Alert,
	View,
	Pressable,
	Form
} from 'react-native';

import { Card, CardTitle, CardContent, CardAction, CardImage } from 'react-native-cards';
import { FAB } from 'react-native-paper';

const App: () => React$Node = () => {
	const [ VinylsCollection, setVinyls ] = useState([]);
	const [ VinylsCollectionSearch, setVinylsSearch ] = useState([]);
	const [ text, setText ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	const [ imageInput, setImageInput ] = useState('');
	const [ nameInput, setNameInput ] = useState('');
	const [ artistInput, setArtistInput ] = useState('');
	const [ descriptionInput, setdescriptionInput ] = useState('');
	const [ yearInput, setyearInput ] = useState('');
	const [ genreInput, setgenreInput ] = useState('');
	const [ setGenre ] = useState([]);

	var ngrok = 'https://a7bcea84c00c.ngrok.io';

	useEffect(() => {
		axios
			.get(`${ngrok}/api/Vinyls/GetVinyls`)
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
			.delete(`${ngrok}/api/Vinyls/?ID=${vinylID}`)
			.then((res) => {
				setVinyls(VinylsCollection.filter((vinyl) => vinyl.vinylID !== vinylID));
			})
			.catch((err) => console.log(err));
	};

	const getGenre = (() => {
		axios
			.get(`${ngrok}/api/Genre`)
			.then((res) => {
				setGenre(res.data);
			})
			.catch((err) => alert(err));
	},
	[]);

	const addVinyl = () => {
		axios
			.post(`${ngrok}/api/Vinyls/AddVinyls`, {
				vinylImage: imageInput,
				vinylName: nameInput,
				artist: artistInput,
				vinylDescription: descriptionInput,
				releaseYear: yearInput,
				genreID: genreInput
			})
			.then(
				(result) => {
					alert(result.data.message);
					setVinyls([ ...VinylsCollection, result.data.vinylResponse ]);
				},
				(error) => {
					alert('Failed');
				}
			);
	};

	const editVinyl = () => {
		axios
			.put(`${ngrok}/api/Vinyls/AddVinyls`, {
				vinylImage: imageInput,
				vinylName: nameInput,
				artist: artistInput,
				vinylDescription: descriptionInput,
				releaseYear: yearInput,
				genreID: genreInput
			})
			.then(
				(result) => {
					alert(result.data.message);
					setVinyls([ ...VinylsCollection, result.data.vinylResponse ]);
				},
				(error) => {
					alert('Failed');
				}
			);
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

						<Modal
							animationType="slide"
							transparent={false}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text style={styles.mainHeadingForAdd}>Vinyls</Text>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<TextInput
										style={styles.modalInput}
										value={imageInput}
										onChangeText={(imageInput) => setImageInput(imageInput)}
										placeholder="Enter vinyl url"
										placeholderTextColor="white"
									/>
									<TextInput
										style={styles.modalInput}
										value={nameInput}
										onChangeText={(nameInput) => setNameInput(nameInput)}
										placeholder="Enter vinyl name"
										placeholderTextColor="white"
									/>
									<TextInput
										style={styles.modalInput}
										value={artistInput}
										onChangeText={(artistInput) => setArtistInput(artistInput)}
										placeholder="Enter artist name"
										placeholderTextColor="white"
									/>
									<TextInput
										style={styles.modalInput}
										value={descriptionInput}
										onChangeText={(descriptionInput) => setdescriptionInput(descriptionInput)}
										placeholder="Enter description"
										placeholderTextColor="white"
									/>
									<TextInput
										style={styles.modalInput}
										value={yearInput}
										onChangeText={(yearInput) => setyearInput(yearInput)}
										placeholder="Enter release year"
										placeholderTextColor="white"
									/>
									<TextInput
										style={styles.modalInput}
										value={genreInput}
										onChangeText={(genreInput) => setgenreInput(genreInput)}
										placeholder="Genre"
										placeholderTextColor="white"
									/>
								</View>
								<Pressable
									style={[ styles.button, styles.appButtonContainer ]}
									onPress={() => {
										setModalVisible(!modalVisible);
										addVinyl();
									}}
								>
									<Text style={styles.appButtonText}>Add Vinyls</Text>
								</Pressable>
								<Pressable
									style={[ styles.button, styles.appButtonContainerClose ]}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.appButtonTextClose}>Close</Text>
								</Pressable>
							</View>
						</Modal>

						<CardAction separator={true} inColumn={false}>
							<TouchableOpacity style={styles.buttonStyleAddDrink} onPress={() => setModalVisible(true)}>
								<Text style={{ fontFamily: 'sans-serif-light', fontSize: 15 }}>Add Drink</Text>
							</TouchableOpacity>

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

				<FlatList data={VinylsCollection} renderItem={displayVinyls} />
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
	mainHeadingForAdd: {
		fontSize: 35,
		fontFamily: 'sans-serif-light',
		textAlign: 'center',
		marginBottom: 20,
		backgroundColor: 'white',

		paddingTop: 10,
		color: 'black'
	},
	button: {
		color: 'white'
	},
	centeredView: {
		backgroundColor: 'grey',
		flex: 1
	},
	modalView: {
		margin: 20,
		backgroundColor: 'orange',
		padding: 35,
		alignItems: 'center',
		shadowColor: 'red',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		width: 250,
		borderRadius: 5,
		height: 40,
		margin: 12,
		borderWidth: 1
	},
	modalInput: {
		width: 250,
		borderRadius: 5,
		height: 40,
		margin: 12,
		borderWidth: 1,
		backgroundColor: 'grey'
	},
	appButtonContainer: {
		elevation: 8,
		backgroundColor: 'white',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 10,
		width: 200,
		marginLeft: 100
	},
	appButtonText: {
		fontSize: 18,
		color: 'black',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase'
	},
	appButtonContainerClose: {
		elevation: 8,
		backgroundColor: 'white',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 50,
		marginLeft: 100,
		width: 200
	},
	appButtonTextClose: {
		fontSize: 18,
		color: 'black',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase'
	}
});

export default App;
