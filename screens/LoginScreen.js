import { useState, createRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	KeyboardAvoidingView,
	TouchableOpacity,
	ImageBackground,
	Platform,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';

import backgroundImage from '../assets/images/background-2x.jpg';

const initialState = {
	email: '',
	password: ''
};

export default function LoginScreen() {
	const navigation = useNavigation();
	const [isUserEmailInFocus, setIsUserEmailInFocus] = useState(false);
	const [isUserPasswordInFocus, setIsUserPasswordInFocus] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [showPassword, setShowPassword] = useState(true);
	const [loginData, setLoginData] = useState(initialState);

	const emailInputRef = createRef();
	const passwordInputRef = createRef();

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const toggleUserEmailFocus = () => setIsUserEmailInFocus(!isUserEmailInFocus);
	const toggleUserPasswordFocus = () =>
		setIsUserPasswordInFocus(!isUserPasswordInFocus);

	const handleSubmitButton = () => {
		setLoginData({
			email: userEmail,
			password: userPassword
		});
	};

	useEffect(() => {
		console.log(loginData);
	}, [loginData]);

	return (
		<ImageBackground
			source={backgroundImage}
			resizeMode="cover"
			style={styles.backgroundImage}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'android' ? 0 : undefined}
				>
					<View style={styles.Wrapper}>
						<Text style={styles.authTitle}>Увійти</Text>
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
							<Text style={styles.buttonTextStyle}>Увійти</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.secondaryButtonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitButton}
						>
							<Text style={styles.secondaryButtonTextStyle}>
								Немає акаунту?{' '}
								<Text
									style={styles.underlinedText}
									onPress={() => navigation.navigate('RegistrationScreen')}
								>
									Зареєструватися
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
	backgroundImage: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	authTitle: {
		marginTop: 32,
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
