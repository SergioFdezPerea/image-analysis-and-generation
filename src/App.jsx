import { useState } from "react"
import "./App.css"
import imageAnalysis from "./image-analysis"
import generateImage from "./image-generation"
import _ from "lodash" // Import lodash library for debouncing

function App() {
  // https://imgs.search.brave.com/03DBBbeDubvX-4xtoI-l7qeRyFgiv_Ww-BfenjbxYhE/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9mL2YzL09u/ZV9waWVjZS5wbmcv/NTEycHgtT25lX3Bp/ZWNlLnBuZw
  // https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG

  const [imageUrl, setImageUrl] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // Add a state variable for tracking loading status

  const handleAnalysis = () => {
    setIsLoading(true) // Set loading status to true when starting image analysis
    imageAnalysis(imageUrl)
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
    setIsLoading(true) // Set loading status to true when starting image generation
    generateImage(imageUrl)
      .then((response) => {
        setImageUrl(response)
        setIsLoading(false) // Set loading status to false when image generation is done
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false) // Set loading status to false even if there's an error
      })
  }

  const myJson = {
    created: 1699700242,
    data: [
      {
        revised_prompt:
          "A detailed visual depiction of a feline creature, specifically being of the species commonly known as domestic cat. This medium-sized creature should have soft, dense fur covering its body and a long tail which moves with precision and grace. Its eyes are round and colored with captivating brilliance that reflect a range of emotions. The cat's ears are short and erect, providing it with exceptional hearing ability. The image should capture the uniqueness of the cat's features, its agile body, sharp claws, and the graceful way in which it carries itself.",
        url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-yCawAETLA3n9WeHEPrQvckTr/user-zhSYlVkf8GG0dZNaxj2NRCr0/img-c0AlGuUxvfsJR6pfm2EvSvGX.png?st=2023-11-11T09%3A57%3A22Z&se=2023-11-11T11%3A57%3A22Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-10T22%3A02%3A05Z&ske=2023-11-11T22%3A02%3A05Z&sks=b&skv=2021-08-06&sig=E9CigiTPhJ/EFytOsNpAK7vkyCTqP20YbooZf4/dWfQ%3D",
      },
    ],
  }

  return (
    <>
      <h1>Computer Vision</h1>
      <div className="textAndButton">
        <input
          type="text"
          placeholder="Enter the URL of the image"
          // value={imageUrl}
          onChange={
            // Debounce the onChange event handler to prevent the function from being called too frequently
            _.debounce((e) => setImageUrl(e.target.value), 500)
          }
        />
        <div>
          <button onClick={handleAnalysis}>Submit for Analysis</button>
          <button onClick={handleGenerateImage}>Submit for Generation</button>
        </div>
        {isLoading && <p>Loading...</p>}{" "}
        {/* Display a loading indicator when isLoading is true */}
        <img src={imageUrl}></img>
        <pre>{analysisResult}</pre>
        {/* <img src={myJson.data[0].url}></img> */}
      </div>
    </>
  )
}

export default App
