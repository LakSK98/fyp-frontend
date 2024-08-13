import { useState } from 'react';
import styled from 'styled-components';
import ImageUploadForm from './ImageUploadForm'; // Assuming the form component is in the same directory
import NavBar from './NavBar';

// Styled components for the page
const PageContainer = styled.div`
  min-height: 100vh;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: "100%";
`;

const ResponseSection = styled.section`
  margin-top: 40px;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
`;

const ResponseImage = styled.img`
  max-width: 30%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const InputImage = styled.img`
  max-width: 30%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const ReSubmitButton = styled.button`
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

const HomePage = () => {
  const [responseImages, setResponseImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState();
  const [prediction, setPrediction] = useState("");
  const [disease, setDisease] = useState("");

  // Function to handle the response and update the state with new images
  const handleUploadSuccess = (data) => {
    setPrediction(data.prediction);
    setDisease(data.disease)
    setResponseImages(data.urls);
  };

  const handleUploadededImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <NavBar /> {/* Include the NavBar at the top */}
      <PageContainer>
        {responseImages.length == 0 && <ImageUploadForm
          onUploadSuccess={handleUploadSuccess}
          setUploadedImage={handleUploadededImage}
        />}
        {responseImages.length > 0 && (
          <ResponseSection>
            <h3>Input Image:</h3>
            <InputImage src={uploadedImage} />
            <h3>Predicted Main Disease: {disease}</h3>
            <h3>Predicted Sub Type: {prediction}</h3>
            <h4>Preprocessed Results:</h4>
            {responseImages.map((imageSrc, index) => (
              <ResponseImage key={index} src={imageSrc} alt={`Response ${index + 1}`} />
            ))}
          </ResponseSection>
        )}
        {responseImages.length > 0 && <ReSubmitButton onClick={() => setResponseImages([])} >Do another prediction</ReSubmitButton>}
      </PageContainer>
    </>
  );
};

export default HomePage;