import { IonButton, IonContent, IonHeader, IonInput, IonPage, useIonToast, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { findData, updateDataFB } from '../firebase.config'

const Edit: React.FC = () => {
    const history = useHistory()
    const [name, setName] = useState<string>('')
    const [birthday, setBirthday] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [present, dismiss] = useIonToast();
    const uid: any = localStorage.getItem('currentUserUID')
    const [key, setKey] = useState<string>('')
    
    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            history.replace('/login')
        }
        else {
            const firebaseData = findData(uid.toString())
            firebaseData.on('value', (dataSnapshot) => {
                //find the autogenerate ID
                const objKey: any = Object.keys(dataSnapshot.val())[0]
                setKey(objKey)
                //find the value ID
                const snapshot: any = Object.values(dataSnapshot.val())[0]          
                setBirthday(snapshot.birthday);
                setName(snapshot.name)
            })
        }
    }, [])

    const doUpdate = async() => {
        console.log(name, birthday);
        
        const data = {
            name: name,
            birthday: birthday
        }
        setLoading(true)
        updateDataFB(uid, key, data)
        setLoading(true)
        present({
            buttons: [{ text: 'hide', handler: () => dismiss() }],
            message: `Update Success`
        })
        history.replace('/home')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="loading" duration={100} isOpen={loading}/>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Name"
                    type="text"
                    value={name}
                    onIonChange={(event: any) => setName(event.target.value)}
                />
                <IonInput
                    placeholder="Birthdate"
                    type="date"
                    value={birthday}
                    onIonChange={(event: any) => setBirthday(event.target.value)}
                />
                <IonButton expand='block' onClick={() => doUpdate()}>Update</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Edit;
