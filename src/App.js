import {useState, useEffect} from 'react'
import Header from "./components/Header"
import CakeCard from "./components/CakeCard";
import SearchBar from "./components/SearchBar";
import CakeForm  from './components/CakeForm';
import CakeDetail from './components/CakeDetail';

function App() {
  const [visible, setVisible] = useState(false)
  const [selectedCake, setSelectedCake] = useState(null)
  const [cakeList, setCakeList] = useState([])

  useEffect(()=> {
    fetch('http://localhost:4000/cakes')
    .then(res => res.json())
    .then(data => setCakeList(data))
  },[])

  function handleAddCake(cake){
    fetch("http://localhost:4000/cakes", {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cake)
    })
    .then(resp => resp.json())
    .then(newCake => {
      //adds the cake to our cakeList
      setCakeList([
        ...cakeList, newCake
      ]);
    });
  };

  function handleDelete(id) {
    fetch(`http://localhost:4000/cakes/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => {
      // removes the cake from our cake list
      const filteredCakes = cakeList.filter(cake => cake.id !== id)
      setCakeList(filteredCakes)
      // removes the cake from the selected cake
      setSelectedCake(null)
    })
  }

  function handleUpdated(cake) {
    fetch(`http://localhost:4000/cakes/${cake.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({liked:!cake.liked}),
    })
    .then(resp => resp.json())
    .then(updatedCake => {
      const updatedCakeList = cakeList.map(clCake => {
        if (clCake.id === cake.id) {
          return updatedCake;
        } else {
          return clCake;
        }
      });
      // updates selectedCake
      setSelectedCake(updatedCake)
      // updates the cake in our cakeList as well
      setCakeList(updatedCakeList)
    });
  };

  function handleClick(cake){   
      setSelectedCake(cake)
  }
  return (
    <>
      <Header />
      <CakeForm handleAddCake={handleAddCake}/>
      {visible?<SearchBar />:null}
      <br/>
      {selectedCake?<CakeDetail cake={selectedCake} handleDelete={handleDelete} handleUpdated={handleUpdated}/>:null}
      <button onClick={() => setVisible(!visible)}>{visible?'x':'Load Search Bar'}</button>
      {cakeList.map(cake => <CakeCard cake={cake} handleClick={handleClick}/>)}
    </>
  );
}

export default App;