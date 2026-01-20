"""
Generate professional diagrams using PlantUML format converted to SVG/PNG
Alternative: Use high-quality mermaid with better styling
"""

import json

# ============================================
# 1. HLD - High Quality Mermaid
# ============================================

hld_mermaid = """
graph TB
    subgraph Frontend["🖥️ FRONTEND LAYER - Vercel"]
        direction TB
        A["<b>Web Browser</b><br/>User Interface"]
        B["<b>Next.js 15</b><br/>React 19 | Tailwind CSS<br/>TypeScript"]
    end
    
    subgraph Gateway["🔗 API GATEWAY - Vercel Edge"]
        direction TB
        C["<b>POST /api/analyze</b><br/>Validation + CORS Proxy<br/>Timeout: 25s | Size: 4MB"]
    end
    
    subgraph Backend["⚙️ ML BACKEND - Render Container"]
        direction TB
        D["<b>FastAPI Server</b><br/>Async Processing<br/>Port: 8000"]
        E["<b>ResNet18 Model</b><br/>6-Class Classifier<br/>Accuracy: ~87%"]
        F["<b>Model Cache</b><br/>In-Memory Storage"]
    end
    
    subgraph Storage["📦 MODEL STORAGE - Dropbox"]
        G["<b>Model Weights</b><br/>45MB ResNet18<br/>Auto-Download"]
    end
    
    A -->|"<b>Image Upload</b>"| B
    B -->|"<b>FormData</b><br/>JPG/PNG/WebP"| C
    C -->|"<b>HTTP POST</b><br/>Multipart"| D
    D -->|"<b>Load</b>"| F
    F -->|"<b>Inference</b>"| E
    E -->|"<b>Softmax Output</b><br/>6 Confidence Scores"| D
    D -->|"<b>JSON Response</b><br/>{prediction, confidence%}"| C
    C -->|"<b>Transform</b><br/>0-1 → 0-100%"| B
    B -->|"<b>Display Results</b><br/>Color-Coded Bars"| A
    
    F -.->|"<b>First Load Only</b>"| G
    
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
"""

# ============================================
# 2. LLD - Low Level Design
# ============================================

lld_mermaid = """
graph TB
    subgraph Layer1["LAYER 1: Frontend Components (Next.js)"]
        direction TB
        L1A["<b>page.tsx</b><br/>Main Orchestrator<br/>State: scanResult, isLoading<br/>Handler: handleImageUpload"]
        L1B["<b>ScanSection</b><br/>UI Container"]
        L1C["<b>ImageUploader</b><br/>Drag-Drop Upload<br/>MIME Validation"]
        L1D["<b>ResultsDisplay</b><br/>Confidence Bars<br/>Color-Coded"]
    end
    
    subgraph Layer2["LAYER 2: API Gateway (/analyze Route)"]
        direction TB
        L2A["<b>Step 1: Extract FormData</b><br/>Get file from request"]
        L2B["<b>Step 2: MIME Validation</b><br/>✓ JPEG/PNG/WebP only"]
        L2C["<b>Step 3: Size Check</b><br/>✓ Max 4MB limit"]
        L2D["<b>Step 4: Timeout Protection</b><br/>25 second AbortController"]
        L2E["<b>Step 5: POST to FastAPI</b><br/>https://api.render.com/predict/"]
        L2F["<b>Step 6: Response Handling</b><br/>Parse JSON → Validate structure"]
    end
    
    subgraph Layer3["LAYER 3: FastAPI Backend (/predict Endpoint)"]
        direction TB
        L3A["<b>Image Processing</b><br/>• PIL.Image.open().convert(RGB)<br/>• Resize to 224×224<br/>• Normalize: ImageNet stats"]
        L3B["<b>Model Preparation</b><br/>• Load ResNet18<br/>• FC layer: 512 → 6 classes<br/>• Set to eval mode"]
        L3C["<b>Inference</b><br/>• Forward pass<br/>• Extract features<br/>• Softmax activation"]
        L3D["<b>Format Response</b><br/>• Confidence % for each class<br/>• Prediction: top class<br/>• JSON structure"]
    end
    
    L1A -->|"Props"| L1B
    L1B -->|"onImageUpload"| L1C
    L1C -->|"FormData (File)"| L2A
    L2A --> L2B
    L2B --> L2C
    L2C --> L2D
    L2D --> L2E
    L2E --> L3A
    L3A --> L3B
    L3B --> L3C
    L3C --> L3D
    L3D -->|"JSON Response"| L2F
    L2F -->|"Transform 0-1 → 0-100%"| L1D
    L1D -->|"State Update"| L1A
    
    style Layer1 fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    style Layer2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#000
    style Layer3 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px,color:#000
    
    style L1A fill:#64b5f6,stroke:#0066cc,stroke-width:2px,color:#fff
    style L1B fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    style L1C fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    style L1D fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    
    style L2A fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style L2B fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style L2C fill:#8e24aa,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style L2D fill:#7b1fa2,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style L2E fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style L2F fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    
    style L3A fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style L3B fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style L3C fill:#43a047,stroke:#388e3c,stroke-width:2px,color:#fff
    style L3D fill:#2e7d32,stroke:#388e3c,stroke-width:2px,color:#fff
"""

# ============================================
# 3. Validation & Security Flow
# ============================================

security_mermaid = """
graph LR
    subgraph Client["🔵 CLIENT VALIDATION"]
        direction TB
        A["📤 File Upload<br/>Drag & Drop"]
        B{"✓ MIME Type?<br/>JPEG|PNG|JPG"}
        C["👁️ Show Preview"]
        D["❌ Invalid<br/>Alert User"]
    end
    
    subgraph API["🟣 API GATEWAY VALIDATION"]
        direction TB
        E{"✓ File<br/>Exists?"}
        F{"✓ MIME Valid?<br/>JPEG|PNG|WebP"}
        G{"✓ Size<br/>≤ 4MB?"}
        H["⏱️ Timeout<br/>≤ 25s?"]
        I["📦 Prepare<br/>Multipart"]
    end
    
    subgraph Backend["🟢 FASTAPI BACKEND"]
        direction TB
        J["📨 Receive<br/>Upload"]
        K["🔄 Convert to RGB<br/>3-Channel"]
        L["📐 Resize Image<br/>to 224×224"]
        M["⚙️ Normalize<br/>ImageNet Stats"]
        N["🧠 ResNet18<br/>Inference"]
        O["✅ Format<br/>Response"]
    end
    
    subgraph Output["📊 OUTPUT"]
        direction TB
        P["✅ Success<br/>200 JSON<br/>{prediction,<br/>confidence}"]
        Q["❌ Error<br/>400 Bad Request<br/>or 504 Timeout"]
    end
    
    A -->|"File"| B
    B -->|"Valid"| C
    B -->|"Invalid"| D
    C -->|"Submit<br/>FormData"| E
    D -->|"Stop"| Q
    
    E -->|"✓"| F
    E -->|"✗"| Q
    F -->|"✓"| G
    F -->|"✗"| Q
    G -->|"✓"| H
    G -->|"✗"| Q
    H -->|"✓"| I
    H -->|"✗"| Q
    
    I -->|"HTTP POST<br>/predict/"| J
    J --> K
    K --> L
    L --> M
    M --> N
    N --> O
    O --> P
    
    style Client fill:#e3f2fd,stroke:#1976d2,stroke-width:3px,color:#000
    style API fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px,color:#000
    style Backend fill:#e8f5e9,stroke:#388e3c,stroke-width:3px,color:#000
    style Output fill:#fff9c4,stroke:#f57f17,stroke-width:3px,color:#000
    
    style A fill:#64b5f6,stroke:#0066cc,stroke-width:2px,color:#fff
    style B fill:#42a5f5,stroke:#0066cc,stroke-width:2px,color:#fff
    style C fill:#1976d2,stroke:#0066cc,stroke-width:2px,color:#fff
    style D fill:#ef5350,stroke:#c62828,stroke-width:2px,color:#fff
    
    style E fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style F fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style G fill:#8e24aa,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style H fill:#7b1fa2,stroke:#7b1fa2,stroke-width:2px,color:#fff
    style I fill:#ab47bc,stroke:#7b1fa2,stroke-width:2px,color:#fff
    
    style J fill:#66bb6a,stroke:#388e3c,stroke-width:2px,color:#fff
    style K fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style L fill:#43a047,stroke:#388e3c,stroke-width:2px,color:#fff
    style M fill:#2e7d32,stroke:#388e3c,stroke-width:2px,color:#fff
    style N fill:#1b5e20,stroke:#388e3c,stroke-width:2px,color:#fff
    style O fill:#388e3c,stroke:#388e3c,stroke-width:2px,color:#fff
    
    style P fill:#66bb6a,stroke:#2e7d32,stroke-width:3px,color:#fff
    style Q fill:#ef5350,stroke:#c62828,stroke-width:3px,color:#fff
"""

# Save all diagrams
diagrams = {
    "hld_professional": hld_mermaid,
    "lld_professional": lld_mermaid,
    "security_professional": security_mermaid
}

for name, code in diagrams.items():
    with open(f"{name}.md", 'w', encoding='utf-8') as f:
        f.write(f"# {name.replace('_', ' ').title()}\n\n```mermaid\n{code}\n```\n")
    print(f"✅ {name}.md created")

print("\n📋 Created 3 professional mermaid diagrams with:")
print("   ✓ Better colors (blue, purple, green)")
print("   ✓ Clear labeled arrows")
print("   ✓ Detailed sub-graphs")
print("   ✓ Professional styling")
print("\nThese will render perfectly on GitHub!")
