import { Button } from '@mui/material';
import React from 'react';
import { toast, ToastContainer } from './toast';

function App() {

  function showSimpleToast() {
    toast("Hello world!");
  }

  function showActionToast() {
    toast({message: "Action confirmed.", action: <Button size="small">Undo</Button>});
  }

  return (
    <div className="App">
      <Button onClick={showSimpleToast}>Simple Toast</Button>
      <Button onClick={showActionToast}>Action Toast</Button>


      <ToastContainer />
    </div>
  );
}

export default App;
