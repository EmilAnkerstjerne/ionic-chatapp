import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import supabase from '../supabase';
import React from 'react';

import { UserStore } from '../store/UserStore';
import { useHistory } from 'react-router';

const Tab1: React.FC = () => {
  const user = UserStore.useState(s => s.user);

  const [present, dismiss] = useIonLoading();

  const history = useHistory()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = async () => {
    present('Signing up...', 0)
    let { user, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      dismiss()
      alert(error.message)
    } else if (user) {
      dismiss()
      alert('User created! Please check your email for the confirmation link.')      
    }
    console.log(error, user)
  }

  const handleLogin = async () => {
    present('Logging in...', 0)
    let { user, error } = await supabase.auth.signIn({
      email,
      password
    })
    if (error) {
      alert(error.message)
    } else if (user) {
      UserStore.update(s => {
        s.user = user!
      })
      history.push('/tab1')
      console.log(user)
    }
    dismiss()
  }


  return (
    <IonPage style={{paddingTop: '10%'}}>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem style={{paddingTop: '50%'}}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={email} type='email' onIonChange={e => setEmail(e.detail.value!)}>
          </IonInput>
        </IonItem>
        
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput value={password} type='password' onIonChange={e => setPassword(e.detail.value!)}>
          </IonInput>
        </IonItem>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '5%', flexDirection: 'column', height: '25%'}}>
          <IonButton onClick={handleLogin}
          style={{
            width: '50%'
          }}
          >
            Login
          </IonButton>
          <IonText> or </IonText>
          <IonButton onClick={handleSignUp} style={{width: '50%'}}>Sign up</IonButton>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Tab1;
