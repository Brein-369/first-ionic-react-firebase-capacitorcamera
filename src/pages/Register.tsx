import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast, useIonViewWillLeave } from '@ionic/react';
import React, { useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
// import './Register.css';
import { registerFirebase } from '../firebase.config'

const Register: React.FC = () => {
    const history = useHistory()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [verifyPassword, setVerifyPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [present, dismiss] = useIonToast();

    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            history.replace('/home')
        }
    }, [])

    useIonViewWillLeave(() => {
        setEmail("")
        setPassword("")
        setVerifyPassword("")
    })

    const registerUser = async () => {
        if (verifyPassword === password) {
            setLoading(true)
            const res = await registerFirebase(email, password)
            setLoading(false)
            if (res.result) {
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: `Register Success`
                })
                history.push('/login')
            }
            else {
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: res.data
                })
            }
        }
        else {
            present({
                buttons: [{ text: 'hide', handler: () => dismiss() }],
                message: 'password did not match',
            })
        }
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="loading" duration={100} isOpen={loading}/>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Email"
                    type="email"
                    value={email}
                    onIonChange={(event: any) => setEmail(event.target.value)}
                />
                <IonInput
                    placeholder="Password (min 6 characters)"
                    type="password"
                    value={password}
                    onIonChange={(event: any) => setPassword(event.target.value)}
                />
                <IonInput
                    placeholder="Verify Password (min 6 characters)"
                    type="password"
                    value={verifyPassword}
                    onIonChange={(event: any) => setVerifyPassword(event.target.value)}
                />
                <IonButton expand="block" onClick={() => registerUser()}>Register</IonButton>
                <h5 className="text-center">Already have acount ? <Link to="/login">Login</Link> </h5>
            </IonContent>
        </IonPage>
    );
};

export default Register;
