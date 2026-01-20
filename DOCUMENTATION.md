# 🩺 MediScan — AI Skin Disease Detection

**Repository**: [GitHub](https://github.com/itssmdsh/MediScan/tree/main) | **Live Frontend**: [https://ai-mediscan.vercel.app](https://ai-mediscan.vercel.app) | **Live API**: [https://skin-disease-api-j0l8.onrender.com/predict/](https://skin-disease-api-j0l8.onrender.com/predict/)

---

## 1. Abstract

| Aspect | Details |
|---|---|
| **What** | Full-stack AI platform predicting 6 skin diseases from images using ResNet18 deep learning |
| **Why** | Users need accessible, fast preliminary skin disease detection with confidence metrics |
| **Outcome** | Production-ready platform with Next.js frontend, FastAPI backend, CORS-protected API, 6-class prediction, ~87% accuracy |
| **Status** | ✅ Live (Vercel + Render) |

---

## 2. System Architecture

### High-Level Design (HLD)

**System Architecture Overview**:

```
┌─────────────────────────────────────────────────────────────────┐
│                     🖥️  CLIENT LAYER (Vercel)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Web Browser → Next.js 15 (React 19 + Tailwind)         │   │
│  │  • User uploads skin image (JPEG/PNG/WebP)              │   │
│  │  • Frontend validates MIME type                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         FormData (File)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  🔗 API GATEWAY LAYER (Vercel)                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  POST /api/analyze - Validation + CORS Proxy            │   │
│  │  • Check file exists                                    │   │
│  │  • Validate MIME: JPEG/PNG/WebP                         │   │
│  │  • Enforce size limit: ≤ 4MB                            │   │
│  │  • Set timeout: 25 seconds                              │   │
│  │  • Wrap in FormData for FastAPI                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                      ↓ HTTP POST Multipart
┌─────────────────────────────────────────────────────────────────┐
│                ⚙️ ML BACKEND LAYER (Render)                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  FastAPI /predict/ - Image Processing + Inference       │   │
│  │                                                          │   │
│  │  ┌─ Load Model ─────────────────────────────────────┐  │   │
│  │  │ Model Cache (In-Memory)                          │  │   │
│  │  │ ├─ First load: Download from Dropbox (45MB)     │  │   │
│  │  │ └─ Subsequent: Use cached ResNet18              │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌─ Image Processing ──────────────────────────────┐    │   │
│  │  │ 1. Convert to RGB (PIL.Image)                   │    │   │
│  │  │ 2. Resize to 224×224                            │    │   │
│  │  │ 3. Normalize: ImageNet stats                    │    │   │
│  │  │ 4. Create tensor: [1, 3, 224, 224]             │    │   │
│  │  └────────────────────────────────────────────────────┘    │   │
│  │                                                          │   │
│  │  ┌─ ResNet18 Inference ────────────────────────────┐    │   │
│  │  │ Forward pass: Extract 6-class logits           │    │   │
│  │  │ Softmax activation: Get confidence %           │    │   │
│  │  │ Output: {prediction, confidence_percentages}   │    │   │
│  │  └────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                      ↑ JSON Response 200
┌─────────────────────────────────────────────────────────────────┐
│                 📦 EXTERNAL STORAGE (Dropbox)                    │
│  • Model Weights: resnet18_6class.pth (45MB)                    │
│  • Auto-downloaded on first request                            │
│  • Cached in memory for subsequent requests                    │
└─────────────────────────────────────────────────────────────────┘
```

```mermaid
graph TB
    subgraph Frontend["🖥️ FRONTEND LAYER - Vercel"]
        direction TB
        A["<b>Web Browser</b><br/>User Interface"]
        B["<b>Next.js 15</b><br/>React 19 | Tailwind CSS"]
    end
    
    subgraph Gateway["🔗 API GATEWAY - Vercel"]
        direction TB
        C["<b>POST /api/analyze</b><br/>Validation + CORS<br/>Timeout: 25s | Size: 4MB"]
    end
    
    subgraph Backend["⚙️ ML BACKEND - Render"]
        direction TB
        D["<b>FastAPI Server</b><br/>Async Processing"]
        E["<b>ResNet18</b><br/>6-Class Classifier<br/>~87% Accuracy"]
        F["<b>Model Cache</b><br/>In-Memory"]
    end
    
    subgraph Storage["📦 STORAGE - Dropbox"]
        G["<b>Model Weights</b><br/>45MB ResNet18"]
    end
    
    A -->|"Image Upload"| B
    B -->|"FormData"| C
    C -->|"HTTP POST"| D
    D -->|"Load"| F
    F -->|"Inference"| E
    E -->|"Softmax Output"| D
    D -->|"JSON Response"| C
    C -->|"Transform"| B
    B -->|"Display Results"| A
    F -.->|"First Load"| G
    
    style Frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    style Gateway fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#000
    style Backend fill:#e8f5e9,stroke:#388e3c,stroke-width:3px,color:#000
    style Storage fill:#fff3e0,stroke:#f57c00,stroke-width:3px,color:#000
    
    style A fill:#64b5f6,stroke:#0066cc,stroke-width:2px,color:#fff
    style B fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    style C fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style D fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style E fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style F fill:#43a047,stroke:#388e3c,stroke-width:2px,color:#fff
    style G fill:#ffa726,stroke:#f57c00,stroke-width:2px,color:#fff
```

**Data Flow**:
1. User uploads image → Browser validates MIME
2. FormData sent to API Gateway
3. API validates: file exists, MIME type, size ≤ 4MB, timeout 25s
4. Valid request → FastAPI /predict/ endpoint
5. FastAPI loads ResNet18 (first time from Dropbox, then cached)
6. Image processing: RGB conversion → Resize 224×224 → Normalize
7. Model inference: Forward pass → Softmax → 6 disease confidence scores
8. Response: `{prediction: "Eczema", confidence_percentages: {...}}`
9. Frontend transforms 0-1 → 0-100% and displays color-coded bars

**Layer Responsibilities**:

| Layer | Component | Role |
|---|---|---|
| **Presentation** | Next.js + React | User interface, form handling, results display |
| **Gateway** | Next.js Route Handler | CORS proxy, file validation, error handling |
| **Inference** | FastAPI + PyTorch | Model loading, image preprocessing, prediction |
| **Storage** | Dropbox | Model weights persistence |

### Low-Level Design (LLD)

#### 2.1 Frontend Architecture

**Component Hierarchy & Data Flow**:

```
┌─────────────────────────────────────────────────────────────────┐
│  page.tsx (Main Orchestrator)                                    │
│  • State: scanResult, isLoading                                 │
│  • Handler: handleImageUpload(file)                             │
│                                                                 │
│  ├─ ScanSection (UI Container)                                  │
│  │  ├─ ImageUploader                                            │
│  │  │  • Drag-drop upload zone                                  │
│  │  │  • File validation: JPG/JPEG/PNG                          │
│  │  │  • Preview rendering                                      │
│  │  │  • Clear button                                           │
│  │  │  └─ onImageUpload callback                                │
│  │  │                                                           │
│  │  └─ ResultsDisplay                                           │
│  │     • Prediction: Disease name (top match)                   │
│  │     • Confidence bars (6 diseases)                           │
│  │     • Color coding:                                          │
│  │       🟢 Green: Healthy (>80%)                               │
│  │       🔴 Red: Disease (>80%)                                 │
│  │       🟡 Yellow: Moderate (40-80%)                           │
│  │       ⚫ Gray: Low (<40%)                                     │
│  │     • Sorting: By confidence (descending)                    │
│  │                                                              │
│  └─ ScanSection handlers                                        │
│     └─ POST /api/analyze                                        │
│        • FormData with file                                     │
│        • Response transform: 0-1 → 0-100%                       │
│        • State update: scanResult                               │
└─────────────────────────────────────────────────────────────────┘
```

**Frontend Data Flow**:
```
1. User selects/drags image
   ↓
2. ImageUploader validates MIME (client-side)
   ├─ Valid: Show preview
   └─ Invalid: Alert "Only JPEG/PNG/JPG"
   ↓
3. User clicks "Analyze"
   ↓
4. POST /api/analyze with FormData
   ├─ Show loading spinner
   └─ Set isLoading = true
   ↓
5. API response received
   ├─ Parse JSON
   └─ Transform confidence: 0-1 → 0-100%
   ↓
6. Update state: scanResult = {
     prediction: "Eczema",
     confidence_percentages: {
       Acne: 5.2,
       Eczema: 82.34,
       Psoriasis: 8.1,
       ...
     }
   }
   ↓
7. ResultsDisplay re-renders
   ├─ Sort by confidence
   ├─ Apply color coding
   └─ Animate bars
   ↓
8. User sees results
```

```mermaid
graph LR
    subgraph Frontend["🖥️ FRONTEND LAYER"]
        direction TB
        A["<b>page.tsx</b><br/>Orchestrator"]
        B["<b>ScanSection</b><br/>Container"]
        C["<b>ImageUploader</b><br/>Upload Component"]
        D["<b>ResultsDisplay</b><br/>Results Component"]
    end
    
    subgraph State["📊 STATE MANAGEMENT"]
        direction TB
        E["<b>scanResult</b><br/>{prediction, confidence}"]
        F["<b>isLoading</b><br/>true | false"]
    end
    
    subgraph Network["🔌 NETWORK REQUEST"]
        direction TB
        G["<b>POST /api/analyze</b><br/>FormData + File"]
    end
    
    A --> B
    B --> C
    B --> D
    C -->|"onImageUpload()"| E
    E -->|"Render"| D
    F -->|"Loading State"| C
    C -->|"Upload"| G
    G -->|"Response"| E
    
    style Frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    style State fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#000
    style Network fill:#fff3e0,stroke:#f57c00,stroke-width:3px,color:#000
    
    style A fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    style B fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    style C fill:#64b5f6,stroke:#0066cc,stroke-width:2px,color:#fff
    style D fill:#64b5f6,stroke:#0066cc,stroke-width:2px,color:#fff
    style E fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style F fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style G fill:#ffb74d,stroke:#f57c00,stroke-width:2px,color:#000
```

#### 2.2 API Route Handler

```python
# web_v0/app/api/analyze/route.ts

export const maxDuration = 30
export const dynamic = "force-dynamic"

POST(request: NextRequest):
  Step 1: Extract FormData
    - Get file from request.formData()
    - Check file exists else return 400

  Step 2: Validate File Format
    - Check MIME type ∈ [image/jpeg, image/png, image/webp]
    - If invalid → return 400 "Only JPEG, PNG, or WEBP..."

  Step 3: Validate File Size
    - Check size ≤ 4 * 1024 * 1024 (4MB)
    - If oversized → return 400 "Image must be smaller than 4MB"

  Step 4: Create New FormData
    - Wrap file in new FormData for external API
    
  Step 5: Timeout Protection
    - Set AbortController with 25000ms (25s) timeout
    
  Step 6: Fetch from FastAPI
    - POST to https://skin-disease-api-j0l8.onrender.com/predict/
    - Pass signal (for abort on timeout)
    - Catch AbortError → return 504 "Prediction timed out"
    
  Step 7: Validate Response
    - Check response.ok
    - Parse JSON
    - Validate structure: { prediction, confidence_percentages }
    - If invalid → throw error
    
  Step 8: Return Result
    - NextResponse.json(result)
    
  Fallback (Development):
    - If NODE_ENV === "development" → Return MOCK_RESPONSE
```

#### 2.3 FastAPI Backend

```python
# model_api/app/main.py

Startup Phase:
  ├─ Check if model.pth exists
  ├─ If not → download_model_from_dropbox()
  │  └─ Download from Dropbox URL
  │     Save to ./model.pth
  └─ Load model into memory (cached)

Model Loading:
  ├─ ResNet18(pretrained=False)
  ├─ Replace FC layer: 512 → 6 (disease classes)
  ├─ Load weights from model.pth
  ├─ Set to eval mode
  └─ Move to CPU (optimized for inference)

Image Transform Pipeline:
  ├─ Resize to (224, 224)
  ├─ Convert to Tensor
  └─ Normalize with ImageNet stats:
     mean=[0.485, 0.456, 0.406]
     std=[0.229, 0.224, 0.225]

@app.post("/predict/")
async def predict(file: UploadFile):
  Step 1: Open Image
    - PIL Image.open(file.file).convert("RGB")
    - Ensures 3-channel RGB regardless of input
    
  Step 2: Apply Transforms
    - image = transform(image)
    - Add batch dimension: unsqueeze(0)
    - Shape: [1, 3, 224, 224]
    
  Step 3: Forward Pass
    - with torch.no_grad():
        outputs = model(image)
        probabilities = F.softmax(outputs, dim=1)
        
  Step 4: Get Prediction
    - _, predicted = torch.max(probabilities, 1)
    - prediction = class_names[predicted.item()]
    
  Step 5: Extract Confidences
    - For each class:
      confidence = probabilities[0][i].item() * 100
      Round to 2 decimals
      
  Step 6: Return JSON
    - {
        "prediction": "Eczema",
        "confidence_percentages": {
          "Acne": 5.2,
          "Eczema": 82.34,
          ...
        }
      }
```

#### 2.4 Image Processing Pipeline

```mermaid
graph LR
    Raw["Raw Image<br/>JPEG/PNG/WebP"] -->|PIL Open| RGB["Convert RGB<br/>3-Channel"]
    RGB -->|Resize| Size["224×224<br/>Fixed Size"]
    Size -->|ToTensor| Tensor["Normalize<br/>ImageNet Stats"]
    Tensor -->|Add Batch| Batch["[1,3,224,224]<br/>Ready for Model"]
    Batch -->|ResNet18| Model["Feature Maps<br/>→ FC Layer"]
    Model -->|Softmax| Probs["Probabilities<br/>0-1 range"]
    Probs -->|×100| Percent["Percentages<br/>0-100 range"]
    Percent -->|Return| JSON["JSON Response<br/>6 Classes"]
    
    style Raw fill:#ffe0b2,stroke:#e65100,stroke-width:3px,color:#000
    style RGB fill:#ffe0b2,stroke:#e65100,stroke-width:3px,color:#000
    style Size fill:#ffe0b2,stroke:#e65100,stroke-width:3px,color:#000
    style Tensor fill:#c8e6c9,stroke:#1b5e20,stroke-width:3px,color:#000
    style Batch fill:#c8e6c9,stroke:#1b5e20,stroke-width:3px,color:#000
    style Model fill:#a5d6a7,stroke:#1b5e20,stroke-width:3px,color:#000
    style Probs fill:#bbdefb,stroke:#0d47a1,stroke-width:3px,color:#000
    style Percent fill:#bbdefb,stroke:#0d47a1,stroke-width:3px,color:#000
    style JSON fill:#e1bee7,stroke:#4a148c,stroke-width:3px,color:#000
    
    linkStyle 0,1,2,3,4,5,6,7 stroke:#0d47a1,stroke-width:3px
```

---

## 3. Data Structures & API Contracts

### Request/Response Format

**Frontend → Next.js API**:
```
POST /api/analyze
Content-Type: multipart/form-data

Body:
  file: <binary image data>
  Size: ≤ 4MB
  Type: JPEG, PNG, or WebP
```

**Next.js API → FastAPI**:
```
POST https://skin-disease-api-j0l8.onrender.com/predict/
Content-Type: multipart/form-data

Body:
  file: <binary image data>
  (Same file from request)
```

**FastAPI → Next.js API**:
```json
{
  "prediction": "Eczema",
  "confidence_percentages": {
    "Acne": 5.2,
    "Eczema": 82.34,
    "Psoriasis": 8.1,
    "Warts": 2.3,
    "SkinCancer": 1.5,
    "Unknown_Normal": 0.63
  }
}
```

**Next.js API → Frontend**:
```json
{
  "prediction": "Eczema",
  "confidence_percentages": {
    "Acne": 5.2,
    "Eczema": 82.34,
    "Psoriasis": 8.1,
    "Warts": 2.3,
    "SkinCancer": 1.5,
    "Unknown_Normal": 0.63
  }
}
```

### Error Response Format

```json
{
  "error": "Error message",
  "details": "Optional additional context"
}
```

**Possible Errors**:
| Code | Error Message | Cause |
|---|---|---|
| 400 | "No file uploaded" | Missing file in request |
| 400 | "Only JPEG, PNG, or WEBP..." | Invalid MIME type |
| 400 | "Image must be smaller than 4MB" | File exceeds limit |
| 504 | "Prediction timed out (25s limit)" | API exceeded timeout |
| 500 | "Server error: fetch failed" | Network/API error |

---

## 4. Validation & Security

**Three-Layer Validation & Security Pipeline**:

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 1: CLIENT VALIDATION (Browser)                           │
│                                                                 │
│  User uploads file                                              │
│  ├─ MIME Check: JPEG | PNG | JPG                               │
│  │  ├─ ✓ Valid: Show preview                                    │
│  │  └─ ✗ Invalid: Alert "Only JPEG/PNG/JPG supported"          │
│  │                                                              │
│  └─ User confirms upload                                        │
│     └─ Pass to Layer 2                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 2: API GATEWAY VALIDATION                                │
│  POST /api/analyze                                              │
│                                                                 │
│  ┌─ Step 1: File Exists? ──────────────────────────────┐       │
│  │ ✓ Yes → Continue                                   │       │
│  │ ✗ No → Return 400 "No file provided"               │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 2: MIME Valid? ──────────────────────────────┐        │
│  │ Accepted: image/jpeg, image/png, image/webp        │        │
│  │ ✓ Valid → Continue                                 │        │
│  │ ✗ Invalid → Return 400 "Bad MIME type"             │        │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 3: Size Check ───────────────────────────────┐        │
│  │ Max: 4 * 1024 * 1024 bytes (4MB)                   │        │
│  │ ✓ ≤ 4MB → Continue                                 │        │
│  │ ✗ > 4MB → Return 400 "Image too large"             │        │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 4: Timeout Protection ────────────────────────┐       │
│  │ AbortController: 25 seconds                         │       │
│  │ ✓ Within time → Continue                            │       │
│  │ ✗ Timeout → Return 504 "Request timeout"            │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 5: Wrap FormData ────────────────────────────┐        │
│  │ Create new FormData with file                       │        │
│  │ POST to FastAPI /predict/                           │        │
│  └─────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3: FASTAPI BACKEND PROCESSING                            │
│  @app.post("/predict/")                                         │
│                                                                 │
│  ┌─ Step 1: Receive Upload ────────────────────────────┐       │
│  │ Extract file from FormData                          │       │
│  │ Validate file object                                │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 2: Convert to RGB ────────────────────────────┐       │
│  │ PIL.Image.open(file.file).convert("RGB")            │       │
│  │ Ensures 3-channel regardless of input format        │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 3: Resize Image ──────────────────────────────┐       │
│  │ Resize to (224, 224) - ResNet18 input size          │       │
│  │ Use bilinear interpolation                          │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 4: Normalize Values ──────────────────────────┐       │
│  │ Apply ImageNet statistics:                          │       │
│  │ Mean: [0.485, 0.456, 0.406]                         │       │
│  │ Std: [0.229, 0.224, 0.225]                          │       │
│  │ Shape: [1, 3, 224, 224]                             │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 5: Model Inference ───────────────────────────┐       │
│  │ with torch.no_grad():                               │       │
│  │   outputs = model(image_tensor)                     │       │
│  │ Returns 6 logits (one per disease class)            │       │
│  │                                                     │       │
│  │ Apply Softmax: Convert logits → probabilities       │       │
│  │ Result: 6 confidence scores (0-1 range)             │       │
│  └─────────────────────────────────────────────────────┘       │
│                      ↓                                          │
│  ┌─ Step 6: Format Response ───────────────────────────┐       │
│  │ JSON: {                                             │       │
│  │   "prediction": "Eczema",  ← Highest confidence     │       │
│  │   "confidence_percentages": {                       │       │
│  │     "Acne": 5.2,                                    │       │
│  │     "Eczema": 82.34,                                │       │
│  │     "Psoriasis": 8.1,                               │       │
│  │     "Warts": 2.3,                                   │       │
│  │     "SkinCancer": 1.5,                              │       │
│  │     "Unknown_Normal": 0.63                          │       │
│  │   }                                                 │       │
│  │ }                                                   │       │
│  └─────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                        ✅ Success
                        (200 JSON response)
```

```mermaid
graph TD
    Start(["🖼️ User Uploads Image"])
    
    subgraph Layer1["🔒 LAYER 1: CLIENT VALIDATION"]
        direction TB
        A["<b>MIME Check</b><br/>JPEG | PNG | JPG"]
        A -->|Valid| A1["✓ Show Preview"]
        A -->|Invalid| A2["✗ Alert Error"]
    end
    
    subgraph Layer2["🔐 LAYER 2: API GATEWAY"]
        direction TB
        B["<b>File Exists?</b>"]
        B -->|No| B1["400<br/>No file"]
        B -->|Yes| C["<b>MIME Valid?</b>"]
        C -->|Invalid| C1["400<br/>Bad type"]
        C -->|Valid| D["<b>Size ≤ 4MB?</b>"]
        D -->|No| D1["400<br/>Too large"]
        D -->|Yes| E["<b>Timeout<br/>Check</b>"]
        E -->|Timeout| E1["504<br/>Timeout"]
        E -->|OK| F["<b>Wrap<br/>FormData</b>"]
    end
    
    subgraph Layer3["⚙️ LAYER 3: FASTAPI PROCESSING"]
        direction TB
        G["<b>Receive</b><br/>File"]
        G --> H["<b>Convert RGB</b><br/>PIL.Image"]
        H --> I["<b>Resize</b><br/>224×224"]
        I --> J["<b>Normalize</b><br/>ImageNet"]
        J --> K["<b>ResNet18</b><br/>Inference"]
        K --> L["<b>Softmax</b><br/>Probabilities"]
        L --> M["<b>Format JSON</b><br/>Response"]
    end
    
    Success(["✅ 200 Response<br/>Predictions"])
    
    Start --> A1
    A1 --> B
    F --> G
    M --> Success
    A2 --> Error(["❌ Error Response"])
    B1 --> Error
    C1 --> Error
    D1 --> Error
    E1 --> Error
    
    style Layer1 fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style Layer2 fill:#fff3e0,stroke:#f57c00,stroke-width:3px
    style Layer3 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
    
    style A fill:#64b5f6,stroke:#0066cc,stroke-width:2px,color:#fff
    style B fill:#ffb74d,stroke:#f57c00,stroke-width:2px,color:#000
    style C fill:#ffb74d,stroke:#f57c00,stroke-width:2px,color:#000
    style D fill:#ffb74d,stroke:#f57c00,stroke-width:2px,color:#000
    style E fill:#ffb74d,stroke:#f57c00,stroke-width:2px,color:#000
    style F fill:#ffb74d,stroke:#f57c00,stroke-width:2px,color:#000
    style G fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style H fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style I fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style J fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style K fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style L fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style M fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    
    style Success fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px
    style Error fill:#ffcdd2,stroke:#c62828,stroke-width:3px
```

**Error Scenarios**:

| Scenario | Layer | Response | HTTP Code |
|----------|-------|----------|-----------|
| File missing | Client → API | Show alert | 400 |
| Invalid MIME | Client → API | Show alert | 400 |
| File > 4MB | Client → API | Show alert | 400 |
| Request timeout | API | Server error | 504 |
| Model error | FastAPI | Server error | 500 |
| Network error | Client | Retry option | 503 |

**Validation Rules**:

| Layer | Rule | Action |
|---|---|---|
| **Client** | MIME: JPEG/PNG/JPG | Alert on invalid |
| **API Route** | File exists | Return 400 |
| **API Route** | MIME: JPEG/PNG/WebP | Return 400 |
| **API Route** | Size ≤ 4MB | Return 400 |
| **API Route** | Timeout 25s | Return 504 |
| **FastAPI** | Convert RGB | Auto-handle |
| **FastAPI** | Resize 224×224 | Auto-handle |
| **FastAPI** | Normalize | Auto-handle |

---

## 5. Key Components

### 📤 Image Uploader Component
- **File**: `web_v0/components/image-uploader.tsx`
- **Validates**: JPG, JPEG, PNG
- **Features**: Drag-drop, click upload, preview, clear button
- **Max Size**: 10MB (frontend hint, API enforces 4MB)

### 📊 Results Display Component
- **File**: `web_v0/components/results-display.tsx`
- **Shows**: Prediction + confidence bars for all 6 diseases
- **Color Coding**: 
  - 🟢 Green: Healthy (Unknown_Normal >80%)
  - 🔴 Red: Disease detected (>80%)
  - 🟡 Yellow: Moderate (>40%)
  - ⚫ Gray: Low confidence
- **Sorting**: By confidence (highest first)

### 🔗 API Route Handler
- **Endpoint**: `POST /api/analyze`
- **Purpose**: CORS proxy + validation gateway
- **Limits**: 4MB file, 25s timeout
- **File**: `web_v0/app/api/analyze/route.ts`

### ⚙️ ML Backend Service
- **Endpoint**: `POST /predict/`
- **Model**: ResNet18 (6-class classifier)
- **Accuracy**: ~87% on test dataset
- **File**: `model_api/app/main.py`
- **Host**: Render.com (containerized)

---

## 6. Disease Classes & Prediction

| Disease | Category | Model Detects | Output |
|---|---|---|---|
| 🔴 **Acne** | Bacterial/Inflammatory | Pimples, blackheads | Confidence % |
| 🔴 **Eczema** | Inflammatory | Red, dry patches | Confidence % |
| 🔴 **Psoriasis** | Autoimmune | Thick scaly patches | Confidence % |
| 🔴 **Warts** | Viral (HPV) | Raised bumps | Confidence % |
| ⚠️ **SkinCancer** | Malignant | Suspicious lesions | Confidence % |
| 🟢 **Unknown/Normal** | Healthy/Unidentified | Normal skin | Confidence % |

**Example Prediction Response**:
```json
{
  "prediction": "Eczema",
  "confidence_percentages": {
    "Acne": 5.2,           ← Low
    "Eczema": 82.34,       ← Highest (Predicted)
    "Psoriasis": 8.1,      ← Moderate
    "Warts": 2.3,          ← Very Low
    "SkinCancer": 1.5,     ← Very Low
    "Unknown_Normal": 0.63 ← Negligible
  }
}
```

---

## 7. How It Works (Visual Flowchart)

| Layer | Service | Region | Status |
|---|---|---|---|
| 🎨 **Frontend** | Vercel | Global CDN | ✅ Live |
| ⚙️ **API** | Render | US | ✅ Live |
| 🧠 **Model** | Dropbox | Cloud | ✅ Auto-download |

**Performance**:
- 🚀 Frontend: Instant (served from CDN)
- 🚀 First prediction: 30-60s (Render cold start)
- 🚀 Subsequent: 1-3 seconds
- 🚀 Model size: ~45MB (ResNet18)

---

## 9. How to Use

### 👤 As a User
1. Visit [ai-mediscan.vercel.app](https://ai-mediscan.vercel.app)
2. Upload a skin image (JPG/PNG)
3. Wait for analysis (1-3 seconds usually)
4. See prediction + confidence scores
5. ⚠️ Consult dermatologist for medical advice

### 🛠️ For Developers

**Frontend Dev**:
```bash
cd web_v0 && npm install && npm run dev
# Opens http://localhost:3000
```

**Backend Dev**:
```bash
cd model_api && pip install -r requirements.txt
python -m uvicorn app.main:app --reload
# Swagger UI: http://localhost:8000/docs
```

---

## 10. Project Structure (Simplified)

```
MediScan/
├── web_v0/              ← Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx     ← Home page
│   │   └── api/analyze/ ← API route
│   ├── components/      ← All UI parts
│   └── package.json
│
├── model_api/           ← Backend (FastAPI)
│   ├── app/main.py      ← Prediction endpoint
│   └── requirements.txt
│
└── ml_training/         ← Model training
    └── train.ipynb      ← Jupyter notebook
```

---

## 11. Validation at Each Step

```mermaid
graph TB
    Step1["🖥️ Step 1: ImageUploader<br/>Client-Side<br/>✓ MIME check: JPG/JPEG/PNG<br/>✓ Quick feedback"]
    Step2["🔗 Step 2: API Route<br/>Next.js<br/>✓ File exists check<br/>✓ MIME: JPEG/PNG/WebP<br/>✓ Size: ≤ 4MB<br/>✓ Timeout: 25s max"]
    Step3["⚙️ Step 3: FastAPI<br/>Backend<br/>✓ Convert to RGB<br/>✓ Resize to 224×224<br/>✓ Normalize with ImageNet<br/>✓ Run ResNet18"]
    Step4["🎨 Step 4: Frontend Display<br/>✓ Transform 0-1 → 0-100%<br/>✓ Color code by disease<br/>✓ Sort by confidence"]
    
    Step1 --> Step2
    Step2 --> Step3
    Step3 --> Step4
    
    style Step1 fill:#bbdefb,stroke:#0d47a1,stroke-width:3px,color:#000
    style Step2 fill:#ffe0b2,stroke:#e65100,stroke-width:3px,color:#000
    style Step3 fill:#a5d6a7,stroke:#1b5e20,stroke-width:3px,color:#000
    style Step4 fill:#f3e5f5,stroke:#4a148c,stroke-width:3px,color:#000
```

---

## 12. Error Handling


| Error | Cause | Solution |
|---|---|---|
| ❌ No file uploaded | Missing file | Select an image first |
| ❌ Only JPEG/PNG/WebP supported | Wrong format | Use JPG, PNG, or WebP |
| ❌ File > 4MB | Too large | Compress your image |
| ❌ Prediction timed out (25s) | Slow connection | Try again or upload smaller image |
| ❌ API error | Render down | Check internet or retry |

---

## 13. Performance Metrics

| Metric | Value | Notes |
|---|---|---|
| 🧠 **Model Accuracy** | ~87% | Test dataset |
| ⚡ **Inference Time** | 1-3s | After warm-up |
| 🔄 **Cold Start** | 30-60s | First request (Render) |
| 💾 **Model Size** | ~45MB | ResNet18 weights |
| 📦 **File Size Limit** | 4MB | Vercel limit |
| ⏱️ **Timeout** | 25s | Hard limit |
| 📐 **Input Resolution** | 224×224 | Fixed size |
| 🏷️ **Output Classes** | 6 | Disease types |

---

## 14. Quick Start

### 🌐 Just Want to Try It?
→ Go to **[ai-mediscan.vercel.app](https://ai-mediscan.vercel.app)** and upload a skin image

### 👨‍💻 Want to Develop?

**1. Clone & Setup Frontend**:
```bash
cd web_v0
npm install
npm run dev    # http://localhost:3000
```

**2. Start Backend Locally**:
```bash
cd model_api
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
# Visit http://localhost:8000/docs for API playground
```

**3. Update API Endpoint** (optional):
In `web_v0/app/api/analyze/route.ts`, change API URL from Render to `http://localhost:8000`

---

## 15. Deployment

```
MediScan/
├── 📁 web_v0/                    # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx              # Main page (HeroSection, ScanSection, etc.)
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   └── api/analyze/
│   │       └── route.ts          # API Route Handler ⭐ KEY
│   ├── components/
│   │   ├── sections/             # Page sections (5 main sections)
│   │   ├── image-uploader.tsx    # Drag-drop component ⭐ KEY
│   │   ├── results-display.tsx   # Results component ⭐ KEY
│   │   └── ui/                   # 40+ Shadcn UI components
│   ├── package.json              # Frontend dependencies
│   └── tsconfig.json             # TypeScript config
│
├── 📁 model_api/                 # FastAPI ML Backend
│   ├── app/
│   │   ├── main.py               # FastAPI app ⭐ KEY
│   │   └── __init__.py
│   ├── requirements.txt          # Python dependencies
│   ├── render.yaml               # Render config
│   └── model.pth                 # Model weights (auto-downloaded)
│
├── 📁 ml_training/               # Model Training
│   ├── train.ipynb               # Jupyter notebook
│   └── dataset_link.md           # Dataset reference
│
└── 📄 DOCUMENTATION.md           # This file
```

**Key Files Summary**:

| File | Purpose | Line Count | Role |
|---|---|---|---|
| `web_v0/app/api/analyze/route.ts` | CORS proxy + validation | ~80 lines | Gateway |
| `model_api/app/main.py` | FastAPI server + inference | ~73 lines | Backend |
| `web_v0/components/image-uploader.tsx` | File upload UI | ~108 lines | UX |
| `web_v0/components/results-display.tsx` | Results visualization | ~80+ lines | UX |
| `web_v0/app/page.tsx` | Main page orchestrator | ~67 lines | Coordinator |

---

## 16. Technologies & Dependencies

**Frontend Stack**:
```json
{
  "framework": "Next.js 15 (App Router)",
  "ui_library": "React 19",
  "styling": "Tailwind CSS + PostCSS",
  "components": "Shadcn UI (40+ Radix UI components)",
  "icons": "Lucide React",
  "deployment": "Vercel (auto-deploy on push)"
}
```

**Backend Stack**:
```
fastapi==0.110.0       # Web framework
uvicorn[standard]==0.29.0  # ASGI server
torch==2.0.1           # PyTorch
torchvision==0.15.2    # Model zoo
Pillow==10.2.0         # Image processing
numpy<2.0              # Numerical computing
python-multipart==0.0.9 # Form data parsing
requests               # HTTP requests
gdown==4.7.1           # Google Drive download
```

**ML Model**:
```
Architecture: ResNet18 (Residual Network, 18 layers)
Input: 3 × 224 × 224 RGB image
Output: 6 logits → Softmax → 6 probabilities
Weights: ~45MB (stored on Dropbox, auto-downloaded)
Training: PyTorch on Kaggle
Accuracy: ~87% on test dataset
```

---

## 17. Future Enhancements

### Phase 1: Core Improvements

| Feature | Description | Impact | Priority |
|---|---|---|---|
| **Model Quantization** | Convert ResNet18 to Int8 | 50% faster inference | 🔴 High |
| **Batch Processing** | Queue multiple images | Better throughput | 🟠 Medium |
| **Prediction Caching** | Cache results by image hash | Reduce redundant calls | 🟠 Medium |
| **Advanced Error Messages** | Detailed debugging info | Better UX | 🟡 Low |
| **Rate Limiting** | Limit requests per IP | Prevent abuse | 🔴 High |

### Phase 2: User Features

**Features**:
- 🔐 User Authentication (Sign up / Login)
- 📊 Prediction History (Track past predictions)
- 📤 Export Results (PDF/CSV download)
- 👨‍⚕️ Doctor Integration (Secure sharing link)
- 📈 Progress Tracking (Monitor changes over time)

### Phase 3: Advanced ML

**Enhancements**:
- 🎯 **Model Ensemble** - Multiple variants with voting for higher accuracy
- 🎨 **Explainability** - Saliency maps & GradCAM visualization
- 🔬 **Custom Training** - Fine-tune model on user datasets
- 🌍 **Multi-language** - 10+ languages with localized UI
- 📱 **Mobile App** - iOS/Android with offline capability

### Phase 4: Enterprise Features

| Feature | Description | Use Case |
|---|---|---|
| 💳 **API Rate Tiers** | Free / Pro / Enterprise plans | Flexible pricing |
| 📦 **Bulk Processing** | Upload 1000s of images | Hospital/Clinic workflows |
| 🔔 **Webhooks** | Real-time callbacks | Integration with EHR systems |
| 📊 **Analytics Dashboard** | Usage metrics & insights | Admin monitoring |
| 👥 **Premium Support** | Email/Chat support | Enterprise customers |
| 🏢 **On-Premise** | Self-hosted option | Privacy compliance |

### Phase 5: Model Optimization & Interpretability

| Feature | Description | Impact | Priority |
|---|---|---|---|
| 📦 **ONNX Export** | Convert ResNet18 to ONNX format | 40-50% faster inference, lightweight | 🔴 High |
| 👁️ **Grad-CAM Heatmaps** | Visual explainability for predictions | Build user trust & transparency | 🔴 High |
| 📊 **Dataset Expansion** | Increase classes & apply balancing | Improved real-world accuracy | 🟠 Medium |
| 📄 **Prediction Reports** | History tracking & PDF export | Better documentation & compliance | 🟠 Medium |

**Key Improvements**:
- 🔧 **ONNX Runtime**: Cross-platform inference optimization
- 🎨 **Explainability**: Visualize which regions influenced predictions
- ⚖️ **Dataset Balancing**: Handle imbalanced classes better
- 📋 **Report Generation**: Downloadable PDFs with full analysis

---

## 18. API Contract

### REST Endpoints

```
Frontend Endpoint:
  POST /api/analyze
  
ML Backend Endpoint:
  POST https://skin-disease-api-j0l8.onrender.com/predict/
```

### Error Handling

```json
// 400 - No file
{ "error": "No file uploaded" }

// 400 - Invalid format
{ "error": "Only JPEG, PNG, or WEBP images are supported" }

// 400 - Too large
{ "error": "Image must be smaller than 4MB" }

// 504 - Timeout
{ "error": "Prediction timed out (25s limit)" }

// 500 - Server error
{ "error": "Server error: fetch failed", "details": "..." }
```
