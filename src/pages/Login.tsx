import { IonButton, IonContent, IonHeader, IonInput, IonPage, useIonToast, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { loginFirebase } from '../firebase.config'

const Login: React.FC = () => {
    const history = useHistory()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [present, dismiss] = useIonToast();
    
    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            history.replace('/home')
        }
    }, [])

    const loginUser = async() => {
        // if email and password filled
        if (email && password) {
            setLoading(true)
            const res = await loginFirebase(email, password)
            setLoading(false)
            if(res.result) {
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: `Login Success`
                })
                
                localStorage.setItem("currentUser", res.data.email)
                localStorage.setItem("currentUserUID", res.data.uid)
                history.replace('/home')
            }   
            else {
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: `Wrong Email or Password`
                })
            }        
        }
        else {
            present({
                buttons: [{ text: 'hide', handler: () => dismiss() }],
                message: `Please fill all input`
            })
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="loading" duration={100} isOpen={loading}/>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Email"
                    type="email"
                    onIonChange={(event: any) => setEmail(event.target.value)}
                />
                <IonInput
                    placeholder="Password"
                    type="password"
                    onIonChange={(event: any) => setPassword(event.target.value)}
                />
                <IonButton expand='block' onClick={() => loginUser()}>Login</IonButton>
                <h5 className="text-center">Dont have acount ? <Link to="/register">Register</Link> </h5>
            </IonContent>
        </IonPage>
    );
};

export default Login;
