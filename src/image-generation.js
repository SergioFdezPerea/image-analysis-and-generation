import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

// Create a funtion that generates an image with the given text using OpenAI's image API
const imageGeneration = async (text) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: text,
    n: 1,
    size: "1024x1024",
  })

  console.log(response)
  return response.data[0].url
}

export default imageGeneration
