import { Dimensions, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import placeholderImageSource from '../assets/images/avatar-placeholder.png';
import MessageCircle from '../assets/icons/MessageCircle';
import MapPin from '../assets/icons/MapPin';
import avatarPlaceholder from '../assets/images/avatar-placeholder.png';

export default function Comment({ profilePicture, comment, date, style }) {
    return (
        <View style={[styles.commentCardWrapper, style]}>
            <Image source={profilePicture ? {uri: profilePicture} : avatarPlaceholder} style={styles.userAvatar} />
            <View style={styles.commentAndDateWrapper}>
                <Text style={styles.commentText}>{comment}</Text>
                <Text style={styles.dateText}>{date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentCardWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 32,
        gap: 8,
    },
    userAvatar: {
        width: 28,
        height: 28,
        paddingRight: 16,
        borderRadius: 50,
    },
    commentAndDateWrapper: {
        minWidth: Dimensions.get('window').width - 68,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    commentText: {
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
        fontSize: 13,
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        lineHeight: 18,
    },
    dateText: {
        paddingBottom: 16,
        paddingRight: 16,
        textAlign: 'right',
        fontSize: 10,
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        color: '#bdbdbd',
    },
});