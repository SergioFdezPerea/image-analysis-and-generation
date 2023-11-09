import React, { useState } from "react"
import "./App.css"
import { API_KEY } from "./config"
import imageAnalysis from "./image-analysis"

function App() {
  // https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG
  const [imageUrl, setImageUrl] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleAnalysis = () => {
    imageAnalysis(imageUrl)
      .then((response) => {
        setAnalysisResult(JSON.stringify(response, null, 2))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <h1>Computer Vision</h1>
      <div className="textAndButton">
        <input
          type="text"
          placeholder="Enter the URL of the image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div>
          <button onClick={handleAnalysis}>Submit for Analysis</button>
          <button>Submit for Generation</button>
        </div>

        <img src={imageUrl}></img>
        <pre>{analysisResult}</pre>
      </div>
    </>
  )
}

export default App
