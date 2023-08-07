import { Dimensions, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import placeholderImageSource from '../assets/images/avatar-placeholder.png';
import MessageCircle from '../assets/icons/MessageCircle';
import MapPin from '../assets/icons/MapPin';


export default function PostCard({ postId, authorAvatar, navigateToMap, navigateToComments, imageFile, caption, comments, style }) {
    return (
        <View style={style ? style : styles.postCardWrapper}>
            <Image
                source={imageFile ? imageFile : placeholderImageSource}
                style={styles.postCardImage}
            />
            <Text style={styles.postCardImageCaption}>{caption ? caption : 'підпис'}</Text>
            <View style={styles.postCardDataWrapper}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigateToComments(postId, authorAvatar, imageFile, comments)}
                    style={styles.showCommentsButton}
                >
                    <MessageCircle fill={comments?.length ? '#FF6C00' : 'none'} stroke={ comments?.length ? '#FF6C00' : '#BDBDBD'} />
                    <Text style={[styles.showCommentsText, comments?.length === 0 && styles.noCommentsTextColor]}>{comments ? comments?.length : 'none'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={navigateToMap}
                    style={styles.showGeoButton}
                >
                    <MapPin />
                    <Text style={styles.showGeoText}>Somewhere, Ukraine</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postCardWrapper: {
        flex: 1,
        paddingBottom: 32,
        gap: 8,
    },
    postCardImage: {
        height: 240,
        width: Dimensions.get('window').width - 32,
        borderRadius: 8,
    },
    postCardImageCaption: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        fontWeight: 500,
    },
    postCardDataWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    showCommentsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    showCommentsText: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
    },
    noCommentsTextColor: {
        color: '#BDBDBD',
    },
    showGeoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    showGeoText: {
        textAlign: 'right',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        fontWeight: 400,
        textDecorationLine: 'underline',
    },
});