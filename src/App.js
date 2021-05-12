import './App.css'
import SortableList from './components/SortableList'
// import List from './components/List'
import { URIS } from './data/CONSTANTS'

function App() {
  
  return (
    <div className="App">
      {/* <List list={['A', 'B', 'C']} /> */}
      <SortableList fetchDomain={URIS.dataDomain} />
    </div>
  )
}

export default App
