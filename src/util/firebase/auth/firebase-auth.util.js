import {
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

import { auth } from '../firebase-config.util';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChange = callback => onAuthStateChanged(auth, callback);
