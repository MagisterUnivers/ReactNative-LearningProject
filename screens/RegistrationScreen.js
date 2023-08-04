import React, { useState, createRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	ImageBackground,
	Platform,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import backgroundImage from '../assets/images/background-2x.jpg';
import placeholderAvatarSource from '../assets/images/avatar-placeholder.png';

export default function RegistrationScreen() {
	const navigation = useNavigation();
	const [isUserNameInFocus, setIsUserNameInFocus] = useState(false);
	const [isUserEmailInFocus, setIsUserEmailInFocus] = useState(false);
	const [isUserPasswordInFocus, setIsUserPasswordInFocus] = useState(false);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [showPassword, setShowPassword] = useState(true);
	const [imageFile, setImageFile] = useState(null);

	const emailInputRef = createRef();
	const passwordInputRef = createRef();

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const toggleUserNameFocus = () => setIsUserNameInFocus(!isUserNameInFocus);
	const toggleUserEmailFocus = () => setIsUserEmailInFocus(!isUserEmailInFocus);
	const toggleUserPasswordFocus = () =>
		setIsUserPasswordInFocus(!isUserPasswordInFocus);

	const handleAvatarSelection = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1
		});

		if (!result.canceled) {
			setImageFile(result.assets[0].uri);
		} else {
			alert('You did not select any image.');
		}
	};

	const handleAvatarRemoval = () => {
		setImageFile(null);
	};

	const imageSource =
		imageFile !== null
			? imageFile && { uri: imageFile }
			: placeholderAvatarSource;

	const handleSubmitButton = () => {
		// send user form data to somewhere
	};

	return (
		<ImageBackground
			source={backgroundImage}
			resizeMode="cover"
			style={styles.backgroundImage}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				>
					<View style={styles.Wrapper}>
						<View>
							<Image source={imageSource} style={styles.avatar} />
							{imageFile ? (
								<TouchableOpacity
									style={styles.removeAvatarButton}
									activeOpacity={0.5}
									onPress={handleAvatarRemoval}
								>
									<Text style={styles.removeAvatarButtonText}>✕</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={styles.selectAvatarButton}
									activeOpacity={0.5}
									onPress={handleAvatarSelection}
								>
									<Text style={styles.selectAvatarButtonText}>+</Text>
								</TouchableOpacity>
							)}
						</View>
						<Text style={styles.authTitle}>Реєстрація</Text>
						<View style={styles.SectionStyle}>
							<TextInput
								style={
									isUserNameInFocus
										? styles.inputInFocusStyle
										: styles.inputStyle
								}
								onFocus={toggleUserNameFocus}
								onBlur={toggleUserNameFocus}
								value={userName}
								onChangeText={(UserName) => setUserName(UserName)}
								underlineColorAndroid="#f000"
								placeholder="Логін"
								placeholderTextColor="#8b9cb5"
								autoCapitalize="sentences"
								returnKeyType="next"
								onSubmitEditing={() =>
									emailInputRef.current && emailInputRef.current.focus()
								}
								blurOnSubmit={false}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={
									isUserEmailInFocus
										? styles.inputInFocusStyle
										: styles.inputStyle
								}
								onFocus={toggleUserEmailFocus}
								onBlur={toggleUserEmailFocus}
								value={userEmail}
								onChangeText={(UserEmail) => setUserEmail(UserEmail)}
								underlineColorAndroid="#f000"
								placeholder="Адреса електронної пошти"
								placeholderTextColor="#8b9cb5"
								keyboardType="email-address"
								ref={emailInputRef}
								returnKeyType="next"
								onSubmitEditing={() =>
									passwordInputRef.current && passwordInputRef.current.focus()
								}
								blurOnSubmit={false}
							/>
						</View>
						<View style={[styles.SectionStyle, styles.SectionStyleLast]}>
							<TextInput
								style={
									isUserPasswordInFocus
										? styles.inputInFocusStyle
										: styles.inputStyle
								}
								onFocus={toggleUserPasswordFocus}
								onBlur={toggleUserPasswordFocus}
								value={userPassword}
								onChangeText={(UserPassword) => setUserPassword(UserPassword)}
								underlineColorAndroid="#f000"
								placeholder="Пароль"
								placeholderTextColor="#8b9cb5"
								ref={passwordInputRef}
								returnKeyType="next"
								secureTextEntry={showPassword}
								blurOnSubmit={false}
							/>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={toggleShowPassword}
								style={styles.showPasswordButton}
							>
								<Text style={styles.showPasswordText}>Показати</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={styles.buttonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitButton}
						>
							<Text style={styles.buttonTextStyle}>Зареєструватися</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.secondaryButtonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitButton}
						>
							<Text style={styles.secondaryButtonTextStyle}>
								Вже є акаунт?{' '}
								<Text
									style={styles.underlinedText}
									onPress={() => navigation.navigate('LoginScreen')}
								>
									Увійти
								</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	Wrapper: {
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#fff'
	},
	avatar: {
		position: 'absolute',
		right: 126,
		top: -60,
		width: 120,
		height: 120,
		marginLeft: 'auto',
		marginRight: 'auto',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		borderBottomRightRadius: 25,
		borderBottomLeftRadius: 25,
		backgroundColor: '#f6f6f6'
	},
	selectAvatarButton: {
		position: 'absolute',
		top: 20,
		right: 115,
		width: 25,
		height: 25,
		borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#ff6c00',
		backgroundColor: '#fff'
	},
	selectAvatarButtonText: {
		fontSize: 18,
		alignSelf: 'center',
		color: '#ff6c00'
	},
	removeAvatarButton: {
		position: 'absolute',
		top: 20,
		right: 115,
		width: 25,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#e8e8e8',
		backgroundColor: '#fff'
	},
	removeAvatarButtonText: {
		fontSize: 18,
		alignSelf: 'center',
		color: '#bdbdbd'
	},
	backgroundImage: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	authTitle: {
		marginTop: 92,
		marginBottom: 33,
		color: '#212121',
		textAlign: 'center',
		fontSize: 30,
		fontFamily: 'Roboto-Medium',
		fontStyle: 'normal',
		letterSpacing: 0.3
	},
	SectionStyle: {
		height: 50,
		marginLeft: 35,
		marginRight: 35,
		marginBottom: 16
	},
	SectionStyleLast: {
		marginBottom: 43
	},
	buttonStyle: {
		backgroundColor: '#FF6C00',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#FF6C00',
		height: 51,
		alignItems: 'center',
		borderRadius: 100,
		marginLeft: 35,
		marginRight: 35,
		marginBottom: 16
	},
	buttonTextStyle: {
		paddingVertical: 16,
		color: '#FFFFFF',
		fontSize: 16,
		fontFamily: 'Roboto-Regular',
		fontStyle: 'normal'
	},
	secondaryButtonStyle: {
		height: 19,
		alignItems: 'center',
		marginBottom: 78
	},
	secondaryButtonTextStyle: {
		color: '#1B4371',
		fontSize: 16
	},
	underlinedText: {
		textDecorationLine: 'underline'
	},
	inputStyle: {
		flex: 1,
		paddingLeft: 16,
		paddingRight: 16,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#E8E8E8',
		backgroundColor: '#f6f6f6',
		color: '#BDBDBD',
		fontSize: 16,
		fontFamily: 'Roboto-Regular',
		fontStyle: 'normal'
	},
	inputInFocusStyle: {
		flex: 1,
		paddingLeft: 16,
		paddingRight: 16,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#ff6c00',
		backgroundColor: '#fff',
		color: '#212121',
		fontSize: 16,
		fontFamily: 'Roboto-Regular',
		fontStyle: 'normal'
	},
	showPasswordButton: {
		position: 'absolute',
		top: 16,
		right: 16
	},
	showPasswordText: {
		color: '#1B4371',
		fontSize: 16,
		fontFamily: 'Roboto-Regular',
		fontStyle: 'normal'
		// fontWeight: 400
	}
});
