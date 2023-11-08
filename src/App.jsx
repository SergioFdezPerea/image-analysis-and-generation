import "./App.css"

function App() {
  return (
    <>
      <h1>Computer Vision</h1>
      <div className="textAndButton">
        <input type="text" placeholder="Enter the URL of the image" />
        <div>
          <button>Submit for Analysis</button>
          <button>Submit for Generation</button>
        </div>
      </div>
    </>
  )
}

export default App
