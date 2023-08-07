import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../config';

export const registerAPI = async ({ avatar, name, email, password }) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
            displayName: name,
            photoURL: avatar,
        });
        return user;
    } catch (error) {
        alert(error.message);
    }
}

export const loginAPI = async ({ email, password }) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        throw error;
    }
};

export const logoutAPI = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        alert(error.message)
    }
}

// export const authStateChanged = async (onChange = () => {}) => {
//     onAuthStateChanged((user) => {
//         onChange(user);
//     });
// };



export const getUserProfileAPI = async (update) => {
    return auth.currentUser;
};


export const updateUserProfileAPI = async (update) => {

  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {

  // оновлюємо його профайл
        try {
            await updateProfile(user, update);
        } catch(error) {
            throw error
        }
  }
};

export const createPostAPI = async ({ photo, title, locationTitle, location }) => {
        try {
            const docRef = await addDoc(collection(db, 'posts'), {
                title,
                photo,
                locationTitle,
                location,
                comments: []
            });
            return docRef.id;
        } catch (e) {
          console.error('Error adding document: ', e);
            throw e;
        }
};
  
export const readPostsAPI = async () => {
    try {
        const response = [];
        const snapshot = await getDocs(collection(db, 'posts'));
            // Перевіряємо у консолі отримані дані
        snapshot.forEach((doc) => response.push({ id: doc.id, data: doc.data() }));
            // Повертаємо масив обʼєктів у довільній формі)
        return response;
    } catch (error) {
      console.log(error);
            throw error;
    }
};
  
const updatePostsInFirestore = async (collectionName, docId) => {
    try {
      const ref = doc(db, collectionName, docId);

            await updateDoc(ref, {
              age: 25
            });
    } catch (error) {
      console.log(error);
    }
};
  
const deletePostInFirestore = async (collectionName, docId) => {
    try {
        const ref = doc(db, collectionName, docId);
        await deleteDoc(ref);
    } catch (error) {
        console.log(error);
    }
}

export const createCommentAPI = async ({ postId, authorAvatar, comment }) => {
    try {
        const postRef = doc(db, 'posts', postId);
        const date = new Date().toUTCString().slice(5, 22);
        await updateDoc(postRef, { comments: arrayUnion({ authorAvatar, comment, date }) })
        return { postId, authorAvatar, comment, date };

    } catch (error) {
        console.log(error)
    }
}