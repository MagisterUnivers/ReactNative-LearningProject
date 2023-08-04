import { useEffect, useLayoutEffect, useState, createRef } from 'react';
import {
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Dimensions,
	StyleSheet,
	View,
	ScrollView,
	Image,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import ArrowLeft from '../assets/icons/ArrowLeft';
import MapPin from '../assets/icons/MapPin';
import CameraIcon from '../assets/icons/CameraIcon';
import Trash from '../assets/icons/Trash';

export default function CreatePostsScreen({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [title, setTitle] = useState('');
	const [locationTitle, setLocationTitle] = useState('');
	const [location, setLocation] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const titleInputRef = createRef();
	const locationTitleInputRef = createRef();

	const height = useHeaderHeight();

	useLayoutEffect(() => {
		const handleGoBack = () => {
			navigation.goBack();
		};
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={styles.goBackButton}
					activeOpacity={0.5}
					onPress={() => handleGoBack()}
				>
					<ArrowLeft />
				</TouchableOpacity>
			)
		});
	});

	useEffect(() => {
		(async () => {
			const { status: cameraStatus } =
				await Camera.requestCameraPermissionsAsync();
			await MediaLibrary.requestPermissionsAsync();

			setHasPermission(cameraStatus === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	function toggleCameraType() {
		setType((current) =>
			current === Camera.Constants.Type.back
				? Camera.Constants.Type.front
				: Camera.Constants.Type.back
		);
	}

	function removeCurrentPhoto() {
		setPhoto(null);
	}

	const handleSubmitButton = async () => {
		if (!title || !locationTitle || !photo) return;
		let { status: locationStatus } =
			await Location.requestForegroundPermissionsAsync();
		if (locationStatus !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			text = errorMsg;
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);

		if (!photo) {
			alert('Please make a photo');
			return;
		}
		if (!title) {
			alert('Please fill title');
			return;
		}
		if (!locationTitle) {
			alert('Please fill location');
			return;
		}
		const postData = {
			title,
			locationTitle,
			location: JSON.stringify(location),
			photo
		};
		await MediaLibrary.createAssetAsync(photo);
		navigation.replace('Home', {
			screen: 'PostsScreen'
		});
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
			keyboardVerticalOffset={height}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView style={styles.container}>
					{!photo ? (
						<Camera style={styles.camera} type={type} ref={setCameraRef}>
							<View style={styles.cameraWrapper}>
								<TouchableOpacity
									style={styles.flipCameraButtonStyle}
									onPress={toggleCameraType}
								>
									<MaterialIcons
										name="flip-camera-ios"
										size={18}
										color="#fff"
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.cameraButtonStyle}
									onPress={async () => {
										if (cameraRef) {
											const { uri } = await cameraRef.takePictureAsync();
											setPhoto(uri);
										}
									}}
								>
									<CameraIcon />
								</TouchableOpacity>
							</View>
						</Camera>
					) : (
						<Image source={{ uri: photo }} style={styles.imageStyle} />
					)}
					<TouchableOpacity onPress={removeCurrentPhoto}>
						<Text style={styles.hintMessage}>
							{!photo ? 'Завантажте фото' : 'Редагувати фото'}
						</Text>
					</TouchableOpacity>
					<TextInput
						style={[styles.postDataInputStyle, styles.titleInputWidth]}
						onChangeText={(title) => setTitle(title)}
						underlineColorAndroid="#f000"
						placeholder="Назва…"
						placeholderTextColor="#BDBDBD"
						ref={titleInputRef}
						returnKeyType="next"
						blurOnSubmit={false}
					/>
					<View style={styles.iconAndInputWrapper}>
						<View
							style={[
								styles.postDataInputStyle,
								styles.locationTitleInputStyle
							]}
						>
							<MapPin />
						</View>
						<TextInput
							style={[
								styles.postDataInputStyle,
								styles.locationTitleInputStyle,
								styles.locationTitleInputWidth
							]}
							onChangeText={(locationTitle) => setLocationTitle(locationTitle)}
							underlineColorAndroid="#f000"
							placeholder="Місцевість…"
							placeholderTextColor="#BDBDBD"
							ref={locationTitleInputRef}
							returnKeyType="next"
							blurOnSubmit={false}
						/>
					</View>
					<TouchableOpacity
						style={[
							styles.buttonStyle,
							photo && title && locationTitle && styles.readyToPuplish
						]}
						activeOpacity={0.5}
						onPress={handleSubmitButton}
					>
						<Text
							style={[
								styles.buttonTextStyle,
								photo && title && locationTitle && styles.readyToPuplish
							]}
						>
							Опублікувати
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.removeButtonStyle}
						activeOpacity={0.5}
						onPress={() => alert('something')}
					>
						<Trash />
					</TouchableOpacity>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width,
		paddingHorizontal: 16,
		paddingTop: 32,
		backgroundColor: '#fff'
	},
	goBackButton: {
		marginLeft: 16
	},
	camera: {
		flex: 1,
		borderRadius: 8,
		overflow: 'hidden'
	},
	cameraWrapper: {
		height: 240,
		width: Dimensions.get('window').width - 32
	},
	imageStyle: {
		height: 240,
		width: Dimensions.get('window').width - 32,
		borderRadius: 8
	},
	flipCameraButtonStyle: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 3,
		left: Dimensions.get('window').width - 65,
		borderRadius: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.30)'
	},
	cameraButtonStyle: {
		width: 60,
		height: 60,
		position: 'absolute',
		left: (Dimensions.get('window').width - 32) / 2 - 30,
		top: 90,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.30)'
	},
	hintMessage: {
		paddingTop: 8,
		paddingBottom: 32,
		color: '#BDBDBD',
		fontSize: 16,
		fontFamily: 'Roboto-Regular'
	},
	iconAndInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	postDataInputStyle: {
		height: 50,
		marginBottom: 32,
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8'
	},
	locationTitleInputStyle: {
		justifyContent: 'center',
		paddingRight: 4
	},
	titleInputWidth: {
		width: Dimensions.get('window').width - 32
	},
	locationTitleInputWidth: {
		width: Dimensions.get('window').width - 56
	},
	buttonStyle: {
		height: 51,
		width: Dimensions.get('window').width - 32,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F6F6F6',
		borderWidth: 0,
		borderColor: '#FF6C00',
		borderRadius: 100
	},
	readyToPuplish: {
		backgroundColor: '#FF6C00',
		color: '#fff'
	},
	buttonTextStyle: {
		color: '#BDBDBD',
		fontSize: 16,
		fontFamily: 'Roboto-Regular',
		fontStyle: 'normal'
	},
	removeButtonStyle: {
		width: 70,
		height: 40,
		marginTop: 120,
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F6F6F6',
		borderWidth: 0,
		borderColor: '#FF6C00',
		borderRadius: 100
	}
});
