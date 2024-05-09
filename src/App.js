
import './App.css';
import SignIn from './components/SignIn';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase.js"
import Line from './components/Line';

// import Camera from "./components/camera.js"
// import UpLoadTest from "./components/UpLoadTest.js";


function App() {
  const [user] = useAuthState(auth);

  return (
    <div >
      {user ? <Line /> :
        <SignIn />};

      {/* <UpLoadTest /> */}
      {/* <Camera /> */}


    </div>
  );
}

export default App;
