import { useState } from "react"
import "./App.css"
import imageAnalysis from "./image-analysis"
import generateImage from "./image-generation"
import _, { set } from "lodash" // Import lodash library for debouncing

function App() {
  // https://imgs.search.brave.com/03DBBbeDubvX-4xtoI-l7qeRyFgiv_Ww-BfenjbxYhE/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9mL2YzL09u/ZV9waWVjZS5wbmcv/NTEycHgtT25lX3Bp/ZWNlLnBuZw
  // https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG

  const [imageUrl, setImageUrl] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // Add a state variable for tracking loading status
  const imgInput = document.getElementById("imgInput")
  const imageToTxt = document.getElementById("imageToTxt")

  // Check if the image is valid
  function checkImage(url) {
    return new Promise((resolve, reject) => {
      var img = new Image()
      img.onload = function () {
        resolve(true)
      }
      img.onerror = function () {
        resolve(false)
      }
      img.src = url
    })
  }

  const handleAnalysis = () => {
    imageToTxt.textContent = ""
    setIsLoading(true) // Set loading status to true when starting image analysis
    imageAnalysis(imgInput.value)
      .then((response) => {
        setAnalysisResult(JSON.stringify(response, null, 2))
        setIsLoading(false) // Set loading status to false when image analysis is done
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false) // Set loading status to false even if there's an error
      })
  }

  const handleGenerateImage = () => {
    imageToTxt.textContent = ""
    console.log(imgInput.value)
    setIsLoading(true) // Set loading status to true when starting image generation
    generateImage(imgInput.value)
      .then((response) => {
        setImageUrl(response)
        setIsLoading(false) // Set loading status to false when image generation is done
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false) // Set loading status to false even if there's an error
      })
  }

  return (
    <>
      <h1>Computer Vision</h1>
      <div className="textAndButton">
        <input
          id="imgInput"
          type="text"
          placeholder="Enter the URL of the image"
          onChange={
            // Debounce the onChange event handler to prevent the function from being called too frequently
            _.debounce(async (e) => {
              const url = e.target.value
              const isValid = await checkImage(url)
              if (isValid) {
                setImageUrl(url)
              } else {
                setImageUrl("")
              }
            }, 500)
          }
        />
        <div>
          <button onClick={handleAnalysis}>Submit for Analysis</button>
          <button onClick={handleGenerateImage}>Submit for Generation</button>
        </div>
        {isLoading && <p>Loading...</p>}{" "}
        {/* Display a loading indicator when isLoading is true */}
        <img src={imageUrl}></img>
        <pre id="imageToTxt">{analysisResult}</pre>
      </div>
    </>
  )
}

export default App
