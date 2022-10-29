import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, IonVirtualScroll } from '@ionic/react';
import { send } from 'ionicons/icons';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { UserStore } from '../store/UserStore';
import supabase from '../supabase';
import './Tab1.css';

const Tab1: React.FC = () => {
  const history = useHistory()
  const user = UserStore.useState(s => s.user);

  const [messages, setMessages] = React.useState<any[]>([])
  const [message, setMessage] = React.useState('')

  
  useEffect(() => {
    const messagesSub = supabase
      .from('messages')
      .on('*', (payload) => {
        setMessages(prev => [...prev, payload.new])
        if (liste) {
          setTimeout(() => {
            listRef.current?.scrollToBottom()
          }, 100)
        }
      })
      .subscribe()
      
      setTimeout(() => {console.log(messagesSub.state)}, 1000)
      
      return (
        () => {
        messagesSub.unsubscribe()
      }
    )
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    let { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    setMessages(messages!)
    setTimeout(() => {
      listRef.current?.scrollToBottom()
    }, 100)
    console.log(messages)
  }

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    } else {
      UserStore.update(s => {
        s.user = {}
      })
      console.log(user)
      // history.push('/')
    }
  }

  const handleSendMessage = async () => {
    const messageTemp = message
    setMessage('')
    const { data, error } = await supabase
    .from('messages')
    .insert([
      { message: messageTemp, author: user.id },
    ])
    if (error) {
      alert(error.message)
    }
  }

  const listRef = useRef<HTMLIonContentElement | null>(null)
  const liste = useRef<HTMLIonListElement | null>(null)

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonHeader style={{display: 'flex', alignItems: 'center'}} collapse="condense">
        <IonToolbar style={{paddingTop: '10%'}}>
          <IonTitle size="large">All chat</IonTitle>
        </IonToolbar>
        <IonText onClick={handleLogout} style={{paddingRight: '2%'}}>Logout</IonText>
      </IonHeader>
      <IonContent ref={listRef} fullscreen>
        <IonList ref={liste}>
        {messages.map((object, i) => {
          return (
            <IonItem style={{display: 'flex', flexDirection: 'column', minHeight: 100, justifyContent: 'flex-start'}} key={object.id}>
              <div style={{display: 'flex', flexDirection: 'column', minHeight: 100, justifyContent: 'flex-start'}}>
              <IonText style={{color: object.author === user.id ? 'lightblue' : 'coral', fontWeight: 700, fontSize: 12 }}>
                {object.author === user.id ? 'You:' : 'Stranger:'}
              </IonText>
              <IonText>
                {object.message}
              </IonText>
              </div>
            </IonItem>
          )
        })}
        </IonList>
      </IonContent>
      <div style={{display: 'flex', width: '100%', flex: '0 1 auto'}}>
        <IonItem style={{width: '100%'}}>
          <IonTextarea value={message} onIonChange={e => setMessage(e.detail.value!)}></IonTextarea>
        </IonItem>
        <IonButton onClick={handleSendMessage}>
          <IonIcon icon={send}></IonIcon>
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Tab1;
