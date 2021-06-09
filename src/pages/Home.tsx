import { IonContent, IonGrid, IonRow, IonHeader, IonPage, IonTitle, IonLoading, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonFab, IonFabButton, IonIcon, IonCardSubtitle } from '@ionic/react';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react'
import './Home.css';
import { findData, createData, updatePhotoFB } from '../firebase.config'
import { camera } from 'ionicons/icons';
import { takePhoto } from "../hooks/usePhotoGallery";

const Home: React.FC = () => {
  // some might applicable with redux
  const history = useHistory()
  const email: any = localStorage.getItem('currentUser')
  const uid: any = localStorage.getItem('currentUserUID')
  const [username, setUsername] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')
  const [photo, setPhoto] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // checking if the user already login or not, if true directed to login page
  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      history.replace('/login')
    }
    else {
      let username = email.split('@')[0]
      setUsername(username)

      const firebaseData = findData(uid.toString())
      firebaseData.on('value', (dataSnapshot) => {
        // if name and birthday already exist
        if (dataSnapshot.val()) {
          //find the autogenerate ID
          const objKey: any = Object.keys(dataSnapshot.val())[0]
          setKey(objKey)
          //find the value ID
          const snapshot: any = Object.values(dataSnapshot.val())[0]
          setBirthday(snapshot.birthday);
          setName(snapshot.name)
          setPhoto(snapshot.photo)
        }
        // if not exist creating new data
        else {
          createData(uid.toString(), {
            name: "",
            birthday: "",
            photo: ""
          })
        }
      });

    }
  }, [])

  const updatePhoto = async () => {
    setLoading(true)
    let base64Photo = await takePhoto()
    updatePhotoFB(uid.toString(), key, base64Photo)
    setLoading(false)
  }

  const goToEditPage = () => {
    history.push('/home/edit')
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentUserUID')
    history.replace('/login')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonTitle>Home Profile</IonTitle>
              <IonButton color="danger" onClick={() => logout()}>Logout</IonButton>

            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="loading" duration={100} isOpen={loading}/>
      <IonContent fullscreen>
        <div className='text-center'>
          <h1>Profile</h1>
        </div>
        <IonGrid>
          <IonRow className="justify-center">
            <IonCard className="ion-padding">
              {
                photo ?
                  <img src={photo} />
                  :
                  <IonCardSubtitle>photo currently not set</IonCardSubtitle>
              }
              <IonCardHeader>
                {
                  username ?
                    <IonCardTitle>{`${username[0].toUpperCase()}${username.slice(1)}`}</IonCardTitle>
                    : null
                }
              </IonCardHeader>
              <IonCardContent>
                Name: {name || 'not set yet'}
                <br />
                Birthday: {birthday || 'not set yet'}
              </IonCardContent>
              <IonButton onClick={() => goToEditPage()}>Edit</IonButton>
            </IonCard>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => updatePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
