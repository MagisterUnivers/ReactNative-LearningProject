import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentsScreen from './CommentsScreen';

const Tabs = createBottomTabNavigator();

export default Home = () => {
    const navigation = useNavigation();
  return (
    <>
        <Tabs.Navigator
            initialRouteName="PostsScreen"
            screenOptions={{
                tabBarActiveTintColor: '#FF6C00',
            tabBarStyle: {
                height: 83,
                borderTopColor: 'rgba(0, 0, 0, 0.30)',
                borderTopWidth: 1,
                paddingTop: 9,
                alignItems: 'center',
                justifyContent: 'space-around',
                },
            }}
        >
          <Tabs.Screen
            name="PostsScreen"
            component={PostsScreen}
            options={{
                title: 'Публікації',
                tabBarLabel: 'PostsScreen',
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                    <AntDesign name="appstore-o" size={24} color={color} />
                ),
                tabBarBadge: 3,
            }}
          />
          <Tabs.Screen
            name="CreatePostsScreen"
            component={CreatePostsScreen}
            options={{
                title: 'Створити публікацію',
                tabBarLabel: 'CreatePostsScreen',
                tabBarShowLabel: false,
                tabBarStyle: { display: "none" },
                tabBarIcon: ({ color, size }) => (
                    <View
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.buttonTextStyle}>+</Text>
                    </View>
                ),
            }}
          />
          <Tabs.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'ProfileScreen',
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => (
                    <AntDesign name="user" size={24} color={color} />
                ),
            }}
          />
          {/* <Tabs.Screen 
            name="CommentsScreen"
            component={CommentsScreen}
            options={{title: "Коментарі"}}
          /> */}
          </Tabs.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
        backgroundColor: '#FF6C00',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#FF6C00',
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontStyle: 'normal',
    },
});