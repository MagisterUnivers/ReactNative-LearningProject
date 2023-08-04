import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import CommentsScreen from './screens/CommentsScreen';
import MapScreen from './screens/MapScreen';

const Stack = createStackNavigator();

const Auth = () => {
	return (
		<Stack.Navigator initialRouteName="LoginScreen">
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{ headerShown: false, title: 'Login screen' }}
			/>
			<Stack.Screen
				name="RegistrationScreen"
				component={RegistrationScreen}
				options={{ headerShown: false, title: 'Registration screen' }}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf')
	});
	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Auth">
				<Stack.Screen
					name="Auth"
					component={Auth}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="CommentsScreen"
					component={CommentsScreen}
					options={{ title: 'Коментарі' }}
				/>
				<Stack.Screen
					name="MapScreen"
					component={MapScreen}
					options={{ title: 'Карта' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
