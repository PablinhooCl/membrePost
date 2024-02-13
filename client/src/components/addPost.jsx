import React,{ useState } from 'react'
import addImage from '../assets/addImage.webp'
import axios from 'axios'

const AddPost = () => {
    const [postText, setPostText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/new-post',
          { withCredentials: true }, {
            post_msg: postText,
            media: imageFile
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
          console.log("Post Text:", postText);
          console.log("Image File:", imageFile);
          if (response.status === 200) {
            console.log('Post enviado con exito')
            console.log(response.data.user);
          }
        } catch (error) {
          console.error('Ocurrió un error al realizar la solicitud:', error);
        }
      };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };

      const handleTextChange = (e) => {
        setPostText(e.target.value);
      };

    return (

        <div className="">
            <div className='fixed flex flex-col justify-center items-center z-10 border-2 rounded-none px-14 border-indigo-500/100 p-20 inset-60'
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' } }>
                {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mb-4 w-auto h-40 " />
                )}
            <form onSubmit={handleSubmit} className="w-96">
                <textarea
                value={postText}
                onChange={handleTextChange}
                className="w-full h-40 border border-gray-300 rounded p-2 mb-4"
                maxLength={174}
                placeholder="..."
                required
                />

                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Publicar
                </button>

            </form>
            </div>

            <div className="absolute bottom-10 right-10">
                <button className=
                "inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                    New post
                </button>
            </div>
        </div>
    )
}

export default AddPost