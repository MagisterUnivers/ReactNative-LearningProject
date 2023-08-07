import { useLayoutEffect, useEffect } from 'react';
import {
	Dimensions,
	StyleSheet,
	Image,
	Text,
	View,
	TouchableOpacity,
	FlatList
} from 'react-native';

import placeholderAvatarSource from '../assets/images/avatar-placeholder.png';
import LogOutButton from '../assets/icons/LogOutButton';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthorized, selectUser } from '../redux/selectors/authSelectors';
import { logout } from '../redux/operations/authOperations';
import { selectPosts } from '../redux/selectors/postsSelectors';
import { readPosts } from '../redux/operations/postsOperations';

function Profile({ avatar, userName, email }) {
	return (
		<View style={styles.userDataWrapper}>
			<Image
				source={avatar ? { uri: avatar } : placeholderAvatarSource}
				style={styles.avatar}
			/>
			<View>
				<Text style={styles.userNameText}>{userName}</Text>
				<Text>{email}</Text>
			</View>
		</View>
	);
}

export default function PostsScreen({ navigation }) {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const isLoggedIn = useSelector(selectAuthorized);

	const {
		avatar = placeholderAvatarSource,
		name = 'undefined',
		email = 'undefined'
	} = useSelector(selectUser);

	const handleLogOut = async () => {
		await dispatch(logout());
		navigation.replace('Auth');
	};

	const handleNavigationToComments = (
		postId,
		authorAvatar,
		image,
		comments
	) => {
		navigation.navigate('CommentsScreen', {
			postId,
			authorAvatar,
			image,
			comments
		});
	};
	const handleNavigationToMap = () => {
		navigation.navigate('MapScreen');
	};

	useEffect(() => {
		if (posts.length === 0) {
			isLoggedIn && dispatch(readPosts());
		}
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.logoutButton}
					activeOpacity={0.5}
					onPress={handleLogOut}
				>
					<LogOutButton />
				</TouchableOpacity>
			),
			headerLeft: () => null
		});
	});
	return (
		<>
			<View style={styles.profileSection}>
				<Profile avatar={avatar} userName={name} email={email} />
			</View>
			<View style={styles.postsSection}>
				<FlatList
					data={posts}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => {
						return (
							<PostCard
								navigateToMap={handleNavigationToMap}
								navigateToComments={handleNavigationToComments}
								postId={item.id}
								authorAvatar={avatar}
								imageFile={{ uri: item.data?.photo }}
								caption={item.data?.title}
								comments={item.data?.comments}
								style={index !== posts?.length - 1 ? null : styles.lastPostItem}
							/>
						);
					}}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	profileSection: {
		width: Dimensions.get('window').width,
		backgroundColor: '#fff',
		paddingHorizontal: 16
	},
	postsSection: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 88 - 92 - 83,
		paddingTop: 32,
		paddingHorizontal: 16,
		backgroundColor: '#fff'
	},
	lastPostItem: {
		flex: 1,
		gap: 8,
		paddingBottom: 43
	},
	userDataWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 8,
		width: 198,
		height: 60,
		marginTop: 32
	},
	userNameText: {
		fontSize: 13,
		fontFamily: 'Roboto-Medium',
		fontStyle: 'normal'
	},
	userEmailText: {
		fontSize: 13,
		fontFamily: 'Roboto-Regular',
		fontStyle: 'normal',
		color: 'rgba(33, 33, 33, 0.8)'
	},
	logoutButton: {
		marginRight: 16
	},
	avatar: {
		width: 60,
		height: 60,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 16,
		backgroundColor: '#f6f6f6'
	}
});
