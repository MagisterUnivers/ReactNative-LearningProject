import { useState, createRef, useEffect, useLayoutEffect } from 'react';
import {
  Keyboard, 
  TouchableWithoutFeedback, 
  KeyboardAvoidingView, 
  Dimensions, 
  StyleSheet, 
  Image,  
  View,
  FlatList, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRoute } from '@react-navigation/native';
import Comment from '../components/Comment';
import ArrowTop from '../assets/icons/ArrowTop';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../redux/selectors/postsSelectors';
import { createComment } from '../redux/operations/postsOperations';
import ArrowLeft from '../assets/icons/ArrowLeft';

export default function CommentsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { params: { postId, authorAvatar, image, comments } } = useRoute();
  const commentsToThePost = useSelector(selectPosts)?.filter(post => post.id === postId)[0]?.data?.comments;
  const [comment, setComment] = useState('');

  const commentInputRef = createRef();
  
  const headerHeight = useHeaderHeight();

  const handleCommentSubmit = async (postId, authorAvatar, comment) => {
    if (!comment) return;
    await dispatch(createComment({ postId, authorAvatar, comment }))
    Keyboard.dismiss();
    setComment('');
  }

  useLayoutEffect(() => {
    const handleGoBack = () => {
        navigation.goBack();
    }
        navigation.setOptions({
            headerLeft: () => (
                    <TouchableOpacity
                      style={{marginLeft: 16}}
                      activeOpacity={0.5}
                      onPress={() => handleGoBack()}>
                      <ArrowLeft />
                    </TouchableOpacity>
            ),
        })
  })
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.keyboardWrapper}
      keyboardVerticalOffset={headerHeight}
    >
        <View style={styles.inner}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Image
              source={image}
              style={styles.postCardImage}
              />
          </TouchableWithoutFeedback>
          <FlatList
            data={commentsToThePost}
            style={{marginTop: 32}}
            contentContainerStyle={styles.commentsWrapper}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return <Comment
                profilePicture={item.authorAvatar}
                comment={item.comment}
                date={item.date}
                style={index === 0 && {paddingTop: 0}}
              />
            }}
            keyExtractor={(item, index) => index}
          />
          <View style={styles.iconAndInputWrapper} automaticallyAdjustContentInsets={false}>
            <TextInput
              style={styles.postDataInputStyle}
              onChangeText={(comment) => setComment(comment)}
              placeholder="Коментувати…"
              placeholderTextColor="#BDBDBD"
              ref={commentInputRef}
              value={comment}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[styles.buttonStyle, comment && styles.readyToPuplish]}
              activeOpacity={0.5}
              onPress={() => handleCommentSubmit(postId, authorAvatar, comment)}
            >
              <ArrowTop />
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1,
  },
  commentsWrapper: {

  },
  inner: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  postCardImage: {
    height: 240,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  iconAndInputWrapper: {
    paddingTop: 32,
  },
  buttonStyle: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 40,
    borderRadius: 50,
    backgroundColor: '#bdbdbd',
  },
  readyToPuplish: {
    backgroundColor: '#FF6C00',
  },
  postDataInputStyle: {
    width: Dimensions.get('window').width - 32,
    height: 50,
    paddingLeft: 16,
    paddingRight: 42,
    borderRadius: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
});