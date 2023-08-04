import { useState } from 'react';
import { Dimensions, StyleSheet, Image, Text, View } from 'react-native';

import placeholderAvatarSource from '../assets/images/avatar-placeholder.png';
import mockAvatar from '../assets/images/13.png';
import PostCard from '../components/PostCard';

function Profile({ avatar, userName, email }) {
	return (
		<View style={styles.userDataWrapper}>
			<Image source={mockAvatar} style={styles.avatar} />
			<View>
				<Text style={styles.userNameText}>{'Bobby Kotik'}</Text>
				<Text>{'example@email.com'}</Text>
			</View>
		</View>
	);
}

export default function PostsScreen({ navigation, route }) {
	const {
		avatar = mockAvatar,
		name = 'Bobby Kotik',
		email = 'example@email.com'
	} = useState();

	// const { postData } = route.params;

	const postData = {
		id: 1234,
		caption: 'Caption',
		comments: ['Its cool', 'Something weird', 'I hate it']
	};

	const handleLogOut = async () => {
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

	return (
		<>
			<View style={styles.profileSection}>
				<Profile avatar={avatar} userName={name} email={email} />
			</View>
			<View style={styles.postsSection}>
				<PostCard
					navigateToMap={handleNavigationToMap}
					navigateToComments={handleNavigationToComments}
					postId={postData.id}
					authorAvatar={avatar}
					caption={postData.caption}
					comments={postData.comments}
					style={styles.lastPostItem}
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
