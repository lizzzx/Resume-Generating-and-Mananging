import React, { useState } from "react";

const UploadAndDisplayImage = ({ header }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="Upload failed"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
      <br />
      <h1>{header}</h1>
      <input
        type="file"
        name="myImage"
        onChange={event => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
