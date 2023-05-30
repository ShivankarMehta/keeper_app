import './App.css'
import Header from "./Components/header/header"
import AddKeeper from "./Components/adddKeeper/addKepper"
import ShowKeeper from "./Components/showKeeper/showKeeper"
import { useState, useEffect  } from "react"
import axios from "axios"

function App() {

  const [ keeperList, setKeeperList ] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/getAll")
    .then(res => setKeeperList(res.data))
  }, [])

  return (
    <div className="App">
      <Header />
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
    </div>
  );
}

export default App;