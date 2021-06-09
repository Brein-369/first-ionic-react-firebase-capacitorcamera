import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, createGesture, Gesture } from '@ionic/react';
import React, { } from 'react'
import { useHistory } from 'react-router';
import './Splash.css';
const Splash: React.FC = () => {
    const history = useHistory()


    // something wrong with gesture

    // const gesture:Gesture = createGesture({
    //     el : document.getElementById('splash-root'),
    //     gestureName: 'swipe',
    //     onMove: (event) => (onMoveHandler(event))
    // })
    // gesture.enable();
    // const onMoveHandler = (event: any) => {
    //     const velocityX = event.velocityX;
    //     if (Math.abs(velocityX) > 1) {
    //         console.log('velocity more than 1');
    //         localStorage.setItem("splashed", "true")
    //         history.replace('/login')
    //     } 
    // }
    

    useIonViewWillEnter(() => {
        if (localStorage.getItem("splashed") === "true") {
            history.replace('/login')
        }
        else {
            setTimeout(() => {
                localStorage.setItem("splashed", "true")
                history.replace('/login')
            }, 5000);
        }
    })

    return (
        <IonPage id="splash-root">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Splash Screen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-text-center ion-padding">
                <IonTitle>SPLASH SCREEN</IonTitle>
                <IonTitle color='medium'>swipe to login</IonTitle>
            </IonContent>
        </IonPage>
    );
};

export default Splash;
