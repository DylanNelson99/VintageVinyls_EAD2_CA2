import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
	FlatList,
	Modal,
	View,
	Pressable
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Card, CardTitle, CardContent, CardAction, CardImage } from 'react-native-cards';

function Vinyls()
{
	const [VinylsCollection, setVinyls] = useState([]);
	const [VinylsCollectionSearch, setVinylsSearch] = useState([]);
	const [genreCollection, setGenreCollection] = useState([]);

	const [text, setText] = useState('');

	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

	const [populateEditModal, setPopulateEditModal] = useState({
		vinylID: -1,
		vinylImage: '',
		vinylName: '',
		artist: '',
		vinylDescription: '',
		releaseYear: '',
		genre: {
			genreID: -1,
			genreName: ''
		}
	});

	const [imageInput, setImageInput] = useState('');
	const [nameInput, setNameInput] = useState('');
	const [artistInput, setArtistInput] = useState('');
	const [descriptionInput, setdescriptionInput] = useState('');
	const [yearInput, setyearInput] = useState('');
	const [genreInput, setgenreInput] = useState('');

	var ngrok = 'https://vintagevinylsmobileapp.azurewebsites.net';

	useEffect(
		() => {
			getVinyls();
			getGenre();
		},
		[editModal]
	);

	//Reset the field
	const resetAddVinylFields = () => {
		setImageInput('');
		setNameInput('');
		setArtistInput('');
		setdescriptionInput('');
		setyearInput('');
		setgenreInput('');
	}


	//Search functionality
	const searchFilterVinyls = (text) => {
		setText(text);

		const searchdata = VinylsCollection.filter((item) => {
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

		setVinylsSearch(searchdata);
	}

	//Start of CRUD

	const getGenre = () => {
		axios
			.get(`${ngrok}/api/Genre`)
			.then((res) => {
				setGenreCollection(res.data);
			})
			.catch((err) => alert(err));
	};

	const getVinyls = () => {
		axios
			.get(`${ngrok}/api/vinyls/GetVinyls`)
			.then((res) => {
				setVinyls(res.data), setVinylsSearch(res.data);
			})
			.catch((err) => alert(err));
	};

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
					setVinyls([...VinylsCollection, result.data.vinylResponse]);
					setVinylsSearch([...VinylsCollectionSearch, result.data.vinylResponse]);
					resetAddVinylFields();
				},
				(error) => {
					alert('Failed');
				}
			);
	};

	const editVinyl = (e) => {
		axios
			.put(`${ngrok}/api/Vinyls/UpdateVinyl`, {
				vinylID: e.vinylID,
				vinylImage: e.vinylImage,
				vinylName: e.vinylName,
				artist: e.artist,
				vinylDescription: e.vinylDescription,
				releaseYear: e.releaseYear,
				genreID: e.genre.genreID
			})
			.then(
				(result) => {
					alert(result.data);
					const currentVinyls = [
						...VinylsCollection.filter((vinyl) => vinyl.vinylID !== populateEditModal.vinylID),
						populateEditModal
					];
					const currentVinylsSearch = [
						...VinylsCollectionSearch.filter((vinyl) => vinyl.vinylID !== populateEditModal.vinylID),
						populateEditModal
					];
					currentVinyls.sort((left, right) => left.vinylID < right.vinylID);
					currentVinylsSearch.sort((left, right) => left.vinylID < right.vinylID);
					setVinyls(currentVinyls);
					setVinylsSearch(currentVinylsSearch)
				},
				(error) => {
					alert(error);
				}
			);
	};

	const deleteVinyl = (vinylID) => {
		axios
			.delete(`${ngrok}/api/Vinyls/?ID=${vinylID}`)
			.then((res) => {
				setVinyls(VinylsCollection.filter((vinyl) => vinyl.vinylID !== vinylID));
				setVinylsSearch(VinylsCollectionSearch.filter((vinyl) => vinyl.vinylID !== vinylID));
			})
			.catch((err) => console.log(err));
	};

	//End of CRUD

	//Filtering
	const getAll = () => {
		axios
			.get(`${ngrok}/api/vinyls/GetVinyls`)
			.then((res) => {
				setVinylsSearch(res.data);
			})
			.catch((err) => alert(err));
	};


	const getPop = () => {
		axios.get(`${ngrok}/api/Genre/getPop`)
			.then((res) => {
				setVinylsSearch(VinylsCollection.filter((vinyl) => vinyl.genre.genreName == "Pop"));
			})
			.catch(err => alert(err));
	}


	const getJazz = () => {
		axios.get(`${ngrok}/api/Genre/getJazz`)
			.then((res) => {
				setVinylsSearch(VinylsCollection.filter((vinyl) => vinyl.genre.genreName == "Jazz"));
			})
			.catch(err => alert(err));
	}


	const getRock = () => {
		axios.get(`${ngrok}/api/Genre/getRock`)
			.then((res) => {
				setVinylsSearch(VinylsCollection.filter((vinyl) => vinyl.genre.genreName == "Rock"));
			})
			.catch(err => alert(err));
	}


	function displayVinyls({ item }) {
		return (
			<Card style={styles.display}>
				<CardImage style={styles.image} source={{ uri: item.vinylImage }} title={item.artist} />
				<CardTitle subtitle={item.releaseYear} />
				<CardContent>
					<Text>Name : {item.vinylName}</Text>
				</CardContent>
				<CardContent>
					<Text>Description : {item.vinylDescription}</Text>
				</CardContent>
				<CardContent>
					<Text>Genre : {item.genre.genreName}</Text>
				</CardContent>

				<CardAction separator={true} inColumn={false}>
					<TouchableOpacity
						style={styles.buttonStyleDelete}
						onPress={() => {
							setEditModal(true);
							setPopulateEditModal({ ...item });
						}}
					>
						<Text style={styles.button}>Edit</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.buttonDelete} onPress={() => deleteVinyl(item.vinylID)}>
						<Text style={styles.button}>Delete</Text>
					</TouchableOpacity>
				</CardAction>
			</Card>
		);
	}

	return (
		<>

			<Text style={styles.mainHeading}>Vinyls</Text>
			<ScrollView>
				<View style={styles.centeredView}>

					<Modal
						animationType="slide"
						transparent={false}
						visible={editModal}
						onRequestClose={() => {
							setEditModal(!editModal);

						}}

					>
						<Text style={styles.mainHeadingForAdd}>Edit</Text>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>

								<TextInput
									style={styles.modalInput}
									value={populateEditModal.vinylImage}
									onChangeText={(text) =>
										setPopulateEditModal((prevState) => ({
											...prevState,
											vinylImage: text
										}))}
									placeholder="Enter image url"
								/>
								<TextInput
									style={styles.modalInput}
									value={populateEditModal.vinylName}
									onChangeText={(text) =>
										setPopulateEditModal((prevState) => ({
											...prevState,
											vinylName: text
										}))}
									placeholder="Enter Vinyl Name"
								/>
								<TextInput
									style={styles.modalInput}
									value={populateEditModal.artist}
									onChangeText={(text) =>
										setPopulateEditModal((prevState) => ({
											...prevState,
											artist: text
										}))}
									placeholder="Enter Artist Name"
								/>
								<TextInput
									style={styles.modalInput}
									value={populateEditModal.vinylDescription}
									onChangeText={(text) =>
										setPopulateEditModal((prevState) => ({
											...prevState,
											vinylDescription: text
										}))}
									placeholder="Enter Descriptions"
								/>
								<TextInput
									style={styles.modalInput}
									value={populateEditModal.releaseYear}
									onChangeText={(text) =>
										setPopulateEditModal((prevState) => ({
											...prevState,
											releaseYear: text
										}))}
									placeholder="Enter Released Year"
								/>
								<Picker
									selectedValue={populateEditModal.genre.genreID}
									style={{ height: 50, width: 150 }}
									onValueChange={(itemValue, itemIndex) => {
										setPopulateEditModal((prevState) => ({
											...prevState,
											genre: { ...genreCollection.find((g) => g.genreID === itemValue) }
										}));
									}}
								>
									{genreCollection.map((genre) => (
										<Picker.Item label={genre.genreName} value={genre.genreID} key={genre.genreID} />
									))}
								</Picker>
							</View>
							<Pressable
								style={[styles.button, styles.appButtonContainer]}
								onPress={() => {
									setEditModal(!editModal);
									editVinyl(populateEditModal);
								}}
							>
								<Text style={styles.appButtonText}>Edit Vinyl</Text>
							</Pressable>
							<Pressable
								style={[styles.button, styles.appButtonContainerClose]}
								onPress={() => {
									setEditModal(!editModal);
								}}
							>
								<Text style={styles.appButtonTextClose}>Close</Text>
							</Pressable>

						</View>

					</Modal>

				</View>
			</ScrollView>

			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={addModal}
					onRequestClose={() => {
						setAddModal(!addModal);
					}}
				>
					<Text style={styles.mainHeadingForAdd}>Add</Text>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<TextInput
								style={styles.modalInput}
								value={imageInput}
								onChangeText={(imageInput) => setImageInput(imageInput)}
								placeholderTextColor="white"
								placeholder="Enter image url"

							/>
							<TextInput
								style={styles.modalInput}
								value={nameInput}
								onChangeText={(nameInput) => setNameInput(nameInput)}
								placeholderTextColor="white"
								placeholder="Enter Vinyl Name"
							/>
							<TextInput
								style={styles.modalInput}
								value={artistInput}
								onChangeText={(artistInput) => setArtistInput(artistInput)}
								placeholderTextColor="white"
								placeholder="Enter Artist Name"
							/>
							<TextInput
								style={styles.modalInput}
								value={descriptionInput}
								onChangeText={(descriptionInput) => setdescriptionInput(descriptionInput)}
								placeholderTextColor="white"
								placeholder="Enter Descriptions"
							/>
							<TextInput
								style={styles.modalInput}
								value={yearInput}
								onChangeText={(yearInput) => setyearInput(yearInput)}
								placeholderTextColor="white"
								placeholder="Enter Released Year"
							/>

							<Picker
								selectedValue={genreInput}
								style={{ height: 50, width: 150 }}
								onValueChange={(itemValue, itemIndex) => {
									setgenreInput(itemValue)
								}}
							>
								{genreCollection.map((genre) => (
									<Picker.Item label={genre.genreName} value={genre.genreID} key={genre.genreID} />
								))}
							</Picker>
						</View>

						<Pressable
							style={[styles.button, styles.appButtonContainer]}
							onPress={() => {
								setAddModal(!addModal);
								addVinyl();
							}}
						>
							<Text style={styles.appButtonText}>Add Vinyl</Text>
						</Pressable>
						<Pressable
							style={[styles.button, styles.appButtonContainerClose]}
							onPress={() => {
								setAddModal(!addModal);
							}}
						>
							<Text style={styles.appButtonTextClose}>Close</Text>
						</Pressable>
					</View>
				</Modal>
			</View>

			<CardAction separator={true} inColumn={false}>
				<TextInput
					style={styles.input}
					value={text}
					onChangeText={(text) => searchFilterVinyls(text)}
					placeholderTextColor="white"
					placeholder="Search here..."
				/>
				<TouchableOpacity style={styles.buttonadd} onPress={() => setAddModal(true)}>
					<Text style={styles.button}>+</Text>
				</TouchableOpacity>
			</CardAction>

			<FlatList
				data={VinylsCollectionSearch}
				renderItem={displayVinyls}
				keyExtractor={(item) => item.vinylID.toString()}
			/>

			<CardAction separator={true} inColumn={false}>
				<TouchableOpacity style={styles.buttonGenre} >
					<Text style={styles.button} onPress={() => getAll()}>All</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonGenre} >
					<Text style={styles.button} onPress={() => getRock()}>Rock</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonGenre} >
					<Text style={styles.button} onPress={() => getPop()}>Pop</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonGenre} >
					<Text style={styles.button} onPress={() => getJazz()}>Jazz</Text>
				</TouchableOpacity>
			</CardAction>

		</>
);
}

const styles = StyleSheet.create({
	display: {
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 2
	},
	buttonStyleDelete: {
		backgroundColor: '#ffb31a',
		alignItems: 'center',
		width: 60,
		paddingBottom: 10,
		paddingTop: 10,
		marginLeft: 10,
		borderRadius: 3,
		color: 'white',
		marginBottom: 4
	},
	buttonGenre: {
		backgroundColor: '#00cc66',
		alignItems: 'center',
		width: 80,
		paddingBottom: 10,
		paddingTop: 10,
		marginLeft: 18,
		borderRadius: 3,
		color: 'white'
	},
	TextInput: {
		color: 'white'
	},
	buttonDelete: {
		backgroundColor: '#cc0000',
		alignItems: 'center',
		width: 60,
		paddingBottom: 10,
		paddingTop: 10,
		marginLeft: 10,
		borderRadius: 3,
		color: 'white',
		marginBottom: 4
	},
	image: {
		shadowColor: 'red',
		elevation: 25,
		shadowOffset: {
			width: 0,
			height: 10
		},
	},
	mainHeading: {
		fontSize: 35,
		fontFamily: 'sans-serif-light',
		textAlign: 'center',
		marginBottom: 2,
		backgroundColor: 'white',
		paddingBottom: 1,
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
	buttonadd: {
		backgroundColor: '#00cc66',
		alignItems: 'center',
		width: 50,
		paddingBottom: 10,
		paddingTop: 10,
		marginLeft: 5,
		borderRadius: 3,
		color: 'white'
	},
	button: {
		color: 'white',
		alignItems: 'center',

	},
	centeredView: {
		backgroundColor: 'white',
		flex: 1
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		padding: 35,
		alignItems: 'center',
		shadowColor: '#1b2328',
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
		width: 300,
		borderRadius: 5,
		height: 40,
		margin: 12,
		marginBottom: 1,
		marginTop: 1,
		paddingTop: 1,
		backgroundColor: '#1b2328',
		borderWidth: 1,
		color: 'white'
	},
	modalInput: {
		width: 250,
		borderRadius: 5,
		height: 40,
		margin: 12,
		borderWidth: 1,
		backgroundColor: '#1b2328',
		color: 'white'
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

export default Vinyls;