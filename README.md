<h1 align="center">MediScan — AI Skin Disease Detection (Web + ML API)</h1>
<img src="demo1.png" width="100%" alt="My Image">
MediScan is an AI-powered project that predicts **skin diseases** from images using a deep learning model.
It provides a modern web interface (Next.js) where users can upload an image and receive a predicted disease label along with confidence scores.

---

## 🔥 Live Demo

- **Frontend (Web):** [MediScan | Advanced Skin Disease Detection](https://ai-mediscan.vercel.app/) *(Replace with your actual Vercel URL)*
- **ML API (Render):** [https://skin-disease-api-j0l8.onrender.com/predict/](https://skin-disease-api-j0l8.onrender.com/docs)

---

## ✨ Features

✅ **Image Upload:** Easy upload from browser or mobile.  
✅ **AI Prediction:** Powered by Deep Learning (ResNet18).  
✅ **Detailed Analysis:** Returns predicted disease + confidence percentages for 6 classes.  
✅ **Full Stack:** Complete integration of Next.js Frontend and FastAPI Backend.  
✅ **Clean Architecture:** Organized repository structure for scalability.

---

## 🧠 Diseases Supported (Classes)

The current model predicts the following 6 classes:

* Acne
* Eczema
* Psoriasis
* Warts
* SkinCancer
* Unknown_Normal

---

## 🏗️ Project Architecture

This repository is divided into 3 main parts:

```
MediScan/
├── web/           # Next.js frontend (v0 + Vercel)
├── ml-service/    # FastAPI backend deployed on Render
└── ml-training/   # Kaggle notebook + training code (PyTorch)
```
Application Flow
User uploads an image via the Web Frontend.

Frontend sends the image to the Render API.

API loads the trained model and performs inference.

API returns the predicted disease label and confidence scores.

Frontend displays the diagnostic result to the user.
```

🖥️ Frontend (Web)
📁 Folder: web/

Framework: Next.js (App Router)

Styling: TailwindCSS

Deployment: Vercel

UI Generation: v0 (AI-assisted)

Note: The Frontend UI was created with AI assistance using v0. The ML model training, backend integration, and API deployment were implemented manually.

⚙️ Backend (ML API)
📁 Folder: ml-service/

Framework: FastAPI

Deployment: Render
```

Logic: Downloads model weights (model.pth) and performs PyTorch inference.

API Endpoint
URL: https://skin-disease-api-j0l8.onrender.com/predict/

Method: POST

Input: Image file (multipart/form-data)
```
Sample JSON Response
JSON

{
  "prediction": "Eczema",
  "confidence_percentages": {
    "Acne": 2.14,
    "Eczema": 92.87,
    "Psoriasis": 1.12,
    "Warts": 0.41,
    "SkinCancer": 2.83,
    "Unknown_Normal": 0.63
  }
}
🧪 Model Training
📁 Folder: ml-training/

Framework: PyTorch
```
Architecture: Transfer Learning using ResNet18

Environment: Trained on Kaggle Notebooks

Evaluation Metrics:

Accuracy/Loss tracking

Classification report

Confusion matrix

Model Performance
✅ Result: Achieved ~87% accuracy on the test dataset.

📊 Dataset
Source: https://www.kaggle.com/datasets/pacificrm/skindiseasedataset

Note: The dataset is NOT uploaded to GitHub due to size constraints.
