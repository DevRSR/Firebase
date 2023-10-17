import { initializeApp } from 'firebase/app';
import {
  getFirestore,collection,onSnapshot,
  addDoc,deleteDoc,doc,query,orderBy,
  serverTimestamp,updateDoc
  
} from 'firebase/firestore';

import { 
  getAuth,createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBelwO8w3fZ-mKCbGA6syyKKNV28ct9TMY",
  authDomain: "my-project-6d125.firebaseapp.com",
  projectId: "my-project-6d125",
  storageBucket: "my-project-6d125.appspot.com",
  messagingSenderId: "606455977102",
  appId: "1:606455977102:web:1386917463eb7732d765df",
  measurementId: "G-M8FYWT5M4W"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db,'books')
const q = query(colRef, orderBy("createdAt"))
  
  onSnapshot(colRef, (snapshot) => {
    const books=[];
    snapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id })
   })
   books.forEach(book => alert(book.title))
 })
  
  
  const addBookForm = document.querySelector('.add');
  
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    addDoc(colRef,{
      title: addBookForm.title.value,
      Author: addBookForm.author.value,
      createdAt: serverTimestamp(),
    })
    .then(() => {
      addBookForm.reset();
    })
  })
  
  const deleteBookForm = document.querySelector('.delete');
  
  deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset();
    })
    
  })
  
  const updateBook = document.querySelector('.update');
  updateBook.addEventListener('submit',(e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', updateBook.id.value);
    updateDoc(docRef,{
      title: 'Basic Histology',
    })
    .then(() => {
      updateBook.reset();
    })
  })
  
  const signup = document.querySelector('.signup');
  signup.addEventListener('submit',(e) => {
    e.preventDefault();
    const email = signup.email.value;
    const password = signup.password.value;
    
    createUserWithEmailAndPassword(auth,email,password)
    .then((cred) => {
      alert(cred.user)
      signup.reset();
    }).catch(e => alert(e.message))
  })
 
 
  const login = document.querySelector('.login');
  login.addEventListener('submit',(e) => {
    e.preventDefault();
    const email = login.email.value;
    const password = login.password.value;
    
    signInWithEmailAndPassword(auth,email,password)
    .then((cred) => {
      alert(cred.user)
      login.reset();
    }).catch(e => alert(e.message))
  })
  
  const signout = document.querySelector('.logout');
  signout.addEventListener('click',() => {
    signOut(auth)
     .then(() => {
       alert('user sign out');
     })
     .catch(e => alert(e.message))
  })