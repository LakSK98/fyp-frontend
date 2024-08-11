import axios from 'axios';
import { useState } from 'react';
import styled, { keyframes }  from 'styled-components';

// Styled components with dark mode
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 400px;
  margin: 50px auto;
  color: #e0e0e0;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  color: #b0b0b0;
`;

const FileInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #444;
  border-radius: 5px;
  width: 100%;
  background-color: #333;
  color: #e0e0e0;

  &::file-selector-button {
    background-color: #444;
    color: #e0e0e0;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #555;
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top: 8px solid #ffffff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${rotate} 1s linear infinite;
`;

// eslint-disable-next-line react/prop-types
const ImageUploadForm = ({ onUploadSuccess, setUploadedImage }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    axios.post('http://localhost/predict', formData)
      .then(res => {
        setUploadedImage(image);
        onUploadSuccess(res.data);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })
  };

  return (
    <FormContainer>
      {loading && (
        <LoadingOverlay>
          <div>
            <Spinner />
          </div>
        </LoadingOverlay>
      )}
      <Title>Upload a Fundus Image</Title>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="fileInput">Choose an image</Label>
        <FileInput
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
        />
        <SubmitButton type="submit">Make a Prediction</SubmitButton>
      </form>
      {preview && <ImagePreview src={preview} alt="Image Preview" />}
    </FormContainer>
  );
};

export default ImageUploadForm;
