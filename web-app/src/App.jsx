import './App.css'
import KudoList from './components/KudoList';
import CreateKudoForm from './components/CreateKudoForm';
import Stats from './components/Stats';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-kudos">kudos</span> <span className="title-wall">W A L L</span>
        </h1>
        <p className="app-subtitle">Mensajes positivos para tu equipo de trabajo</p>
      </header>

      <main className="main-content">
        <aside className="sidebar">
          <CreateKudoForm />
          <Stats />
        </aside>

        <section className="feed">
          <KudoList />
        </section>
      </main>
    </div>
  )
}

export default App
