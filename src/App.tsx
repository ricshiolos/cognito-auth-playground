import React, { useMemo, useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { OlosCognitoAuthProvider, IOlosCognitoAuth, CognitoAuthEvents, OlosCognitoAuthForm } from '@olostecnologia/olos-cognito-auth';
import { getConfig } from './services/getConfig';

function App() {

  const [config, setConfig] = useState<any>(null)

  const cognitoAuthProviderConfig:IOlosCognitoAuth | null = useMemo(() => {

    if(!config) return null

    return {
      appId: "1hd7h1lssk84q253mpu3kaeu21",
      xApiKey: "3EwVYhMYbLQ0qx9ynESP8nhB0=oZeXfRsy=qRR/-Rw9gt5g6wAICC?mD6r88WxRu",
      tenantId: "eaglle-ad",
      environment: "DEV",
      locale: "pt-BR"
    }
  }, [config])

  const eventEmitter = useCallback((response:any) => {
    const {event, data} = response;

    switch (event) {
      case CognitoAuthEvents.SIGN_IN:
        
        break;
      
      case CognitoAuthEvents.SIGN_OUT:
        break;
  
      case CognitoAuthEvents.TOKEN_REFRESH:
        break;
    }
  }, [])

  useEffect(() => {
    getConfig()
      .then((config) => {
        setConfig(config);
      })
      .catch((error) =>{
        setConfig(error)
      })
    
  }, [])

  console.log(cognitoAuthProviderConfig)

  return (
    <div className="App">
      {!!cognitoAuthProviderConfig && !!eventEmitter && <OlosCognitoAuthProvider configuration={cognitoAuthProviderConfig} eventEmitter={eventEmitter} >
        <OlosCognitoAuthForm />
      </OlosCognitoAuthProvider>}
    </div>
  );
}

export default App;
