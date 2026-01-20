"""
Generate professional diagrams using Graphviz
Better quality with clean arrows and professional styling
"""

import subprocess
import os

# ============================================
# 1. HLD (High-Level Architecture)
# ============================================

hld_dot = """
digraph HLD {
    rankdir=TB;
    splines=ortho;
    nodesep=1;
    ranksep=1;
    
    // Graph styling
    graph [bgcolor="#f8f9fa", fontname="Arial", fontsize=12];
    node [shape=box, style="rounded,filled", fillcolor="#e8f4f8", 
          stroke="#0066cc", strokewidth=2, fontname="Arial", fontsize=11, fontcolor="#000"];
    edge [color="#555555", penwidth=2.5, arrowsize=1.5, fontname="Arial", fontsize=10];
    
    // Layer 1: Frontend
    subgraph cluster_frontend {
        label = "🖥️ FRONTEND LAYER (Vercel)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#e3f2fd";
        color = "#1976d2";
        penwidth = 2;
        
        browser [label="Web Browser\nUser Interface", fillcolor="#64b5f6", fontcolor="white"];
        nextjs [label="Next.js 15\nReact 19 + Tailwind", fillcolor="#42a5f5", fontcolor="white"];
    }
    
    // Layer 2: Gateway
    subgraph cluster_gateway {
        label = "🔗 API GATEWAY (Vercel)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#f3e5f5";
        color = "#7b1fa2";
        penwidth = 2;
        
        route [label="POST /api/analyze\nValidation + CORS\nProxy Gateway", fillcolor="#ab47bc", fontcolor="white"];
    }
    
    // Layer 3: Backend
    subgraph cluster_backend {
        label = "⚙️ ML BACKEND (Render)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#e8f5e9";
        color = "#388e3c";
        penwidth = 2;
        
        fastapi [label="FastAPI Server\nAsync Processing\n(Port 8000)", fillcolor="#66bb6a", fontcolor="white"];
        pytorch [label="ResNet18 Model\n6-Class Classifier\n~87% Accuracy", fillcolor="#4caf50", fontcolor="white"];
        cache [label="Model Cache\nIn-Memory", fillcolor="#43a047", fontcolor="white"];
    }
    
    // External Storage
    subgraph cluster_storage {
        label = "📦 MODEL STORAGE (Dropbox)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#fff3e0";
        color = "#f57c00";
        penwidth = 2;
        
        dropbox [label="Model Weights\n(45MB ResNet18)\nAuto-Download", fillcolor="#ffa726", fontcolor="white"];
    }
    
    // Connections
    browser -> nextjs [label="UI Events", weight=10];
    nextjs -> route [label="FormData\n(Image)", weight=10];
    route -> fastapi [label="HTTP POST\n(Multipart)", constraint=true, weight=10];
    fastapi -> pytorch [label="Load Model", weight=9];
    pytorch -> cache [label="Inference\nOutput", weight=8];
    cache -> fastapi [label="Predictions\n(Softmax)", weight=9];
    fastapi -> route [label="JSON Response\n{prediction, confidence}", weight=10];
    route -> nextjs [label="Parse & Transform\n(0-100%)", weight=10];
    nextjs -> browser [label="Display Results\nColor-Coded Bars", weight=10];
    
    cache -> dropbox [label="First Load", style="dashed", color="#999999", penwidth=1.5];
    
    // Legend
    legend [shape=none, label=<
        <TABLE BORDER="1" CELLBORDER="0" CELLSPACING="8" CELLPADDING="4" BGCOLOR="#f5f5f5">
            <TR><TD COLSPAN="2" ALIGN="CENTER"><B>🎯 System Flow</B></TD></TR>
            <TR><TD>⏱️ End-to-End Latency:</TD><TD>1-3 seconds (cached)</TD></TR>
            <TR><TD>📦 Model Size:</TD><TD>45MB (auto-cached)</TD></TR>
            <TR><TD>🔄 Cold Start:</TD><TD>30-60s (Render spin-up)</TD></TR>
            <TR><TD>📊 Accuracy:</TD><TD>~87% on test set</TD></TR>
            <TR><TD>🌐 Deployment:</TD><TD>Vercel + Render</TD></TR>
        </TABLE>
    >, fontname="Arial"];
}
"""

# ============================================
# 2. LLD (Low-Level Design)
# ============================================

lld_dot = """
digraph LLD {
    rankdir=TB;
    splines=ortho;
    nodesep=0.8;
    ranksep=0.9;
    
    // Graph styling
    graph [bgcolor="#f8f9fa", fontname="Arial", fontsize=12];
    node [shape=box, style="rounded,filled", fillcolor="#e8f4f8", 
          stroke="#0066cc", strokewidth=2, fontname="Arial", fontsize=10, fontcolor="#000"];
    edge [color="#555555", penwidth=2, arrowsize=1.3, fontname="Arial", fontsize=9];
    
    // Layer 1: Frontend Components
    subgraph cluster_layer1 {
        label = "LAYER 1: Frontend (Next.js)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#e3f2fd";
        color = "#1976d2";
        penwidth = 2;
        
        main [label="page.tsx\n(Main Orchestrator)\nState: scanResult\nState: isLoading", fillcolor="#64b5f6", fontcolor="white"];
        scan_section [label="ScanSection\n(UI Container)", fillcolor="#42a5f5", fontcolor="white"];
        uploader [label="ImageUploader\n(Drag-Drop Upload)", fillcolor="#42a5f5", fontcolor="white"];
        results [label="ResultsDisplay\n(Confidence Bars)", fillcolor="#42a5f5", fontcolor="white"];
    }
    
    // Layer 2: API Gateway
    subgraph cluster_layer2 {
        label = "LAYER 2: API Gateway (/analyze)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#f3e5f5";
        color = "#7b1fa2";
        penwidth = 2;
        
        validate [label="Validation\n✓ MIME Check\n✓ Size Check (4MB)\n✓ Timeout (25s)", fillcolor="#ab47bc", fontcolor="white"];
    }
    
    // Layer 3: Backend Processing
    subgraph cluster_layer3 {
        label = "LAYER 3: FastAPI Backend (/predict)";
        labelloc = "t";
        style = "filled";
        fillcolor = "#e8f5e9";
        color = "#388e3c";
        penwidth = 2;
        
        process [label="Image Processing\n• Convert to RGB\n• Resize 224×224\n• Normalize Values", fillcolor="#66bb6a", fontcolor="white"];
        model [label="ResNet18 Inference\n• Forward Pass\n• Extract Features\n• Softmax Output", fillcolor="#4caf50", fontcolor="white"];
        format [label="Format Response\n• Confidence %\n• All Classes\n• Disease Name", fillcolor="#43a047", fontcolor="white"];
    }
    
    // Data Flow
    main -> scan_section [label="Props", weight=10];
    scan_section -> uploader [label="onImageUpload", weight=10];
    uploader -> validate [label="FormData\n(File)", weight=10];
    validate -> process [label="HTTP POST\nto /predict/", weight=10];
    process -> model [label="Tensor\n[1,3,224,224]", weight=10];
    model -> format [label="Logits → Softmax", weight=10];
    format -> validate [label="JSON Response", weight=10];
    validate -> results [label="Transform\n0-1 → 0-100%", weight=10];
    results -> main [label="State Update", weight=10];
    
    // Info box
    info [shape=none, label=<
        <TABLE BORDER="1" CELLBORDER="0" CELLSPACING="6" CELLPADDING="3" BGCOLOR="#fffde7">
            <TR><TD ALIGN="CENTER"><B>📊 Processing Pipeline</B></TD></TR>
            <TR><TD>1️⃣ Receive image (JPEG/PNG/WebP)</TD></TR>
            <TR><TD>2️⃣ Validate: MIME type, size ≤ 4MB, timeout 25s</TD></TR>
            <TR><TD>3️⃣ Convert RGB → Tensor → Resize 224×224</TD></TR>
            <TR><TD>4️⃣ ResNet18 inference (6-class output)</TD></TR>
            <TR><TD>5️⃣ Softmax → Confidence % for each disease</TD></TR>
            <TR><TD>6️⃣ Return: {prediction, confidence_percentages}</TD></TR>
        </TABLE>
    >, fontname="Arial"];
}
"""

# ============================================
# 3. Validation & Security Flow
# ============================================

security_dot = """
digraph Security {
    rankdir=LR;
    splines=ortho;
    nodesep=1.2;
    ranksep=1.2;
    
    // Graph styling
    graph [bgcolor="#f8f9fa", fontname="Arial", fontsize=12];
    node [shape=box, style="rounded,filled", fillcolor="#e8f4f8", 
          stroke="#0066cc", strokewidth=2, fontname="Arial", fontsize=10.5, fontcolor="#000"];
    edge [color="#333333", penwidth=2.5, arrowsize=1.5, fontname="Arial", fontsize=9];
    
    // CLIENT LAYER
    subgraph cluster_client {
        label = "CLIENT VALIDATION LAYER";
        style = "filled";
        fillcolor = "#e3f2fd";
        color = "#1976d2";
        penwidth = 2;
        
        upload [label="User Upload\nDrag & Drop", fillcolor="#64b5f6", fontcolor="white"];
        mime_check [label="MIME Check\n✓ JPEG/PNG/JPG", fillcolor="#42a5f5", fontcolor="white", shape="diamond"];
        preview [label="Show Preview", fillcolor="#1976d2", fontcolor="white"];
    }
    
    // API GATEWAY
    subgraph cluster_api {
        label = "API GATEWAY VALIDATION";
        style = "filled";
        fillcolor = "#f3e5f5";
        color = "#7b1fa2";
        penwidth = 2;
        
        file_check [label="File Exists?\n✓ or ❌", fillcolor="#ab47bc", fontcolor="white", shape="diamond"];
        mime_api [label="MIME Valid?\nJPEG/PNG/WebP", fillcolor="#9c27b0", fontcolor="white", shape="diamond"];
        size_check [label="Size ≤ 4MB?\n✓ or ❌", fillcolor="#7b1fa2", fontcolor="white", shape="diamond"];
        prepare [label="Prepare Multipart\nFormData", fillcolor="#ab47bc", fontcolor="white"];
    }
    
    // BACKEND PROCESSING
    subgraph cluster_backend {
        label = "FASTAPI BACKEND PROCESSING";
        style = "filled";
        fillcolor = "#e8f5e9";
        color = "#388e3c";
        penwidth = 2;
        
        receive [label="Receive Upload\nFile Object", fillcolor="#66bb6a", fontcolor="white"];
        convert [label="Convert RGB\n3-Channel", fillcolor="#4caf50", fontcolor="white"];
        resize [label="Resize Image\n224×224", fillcolor="#43a047", fontcolor="white"];
        normalize [label="Normalize\nImageNet Stats", fillcolor="#2e7d32", fontcolor="white"];
        inference [label="Model Inference\nResNet18 (6 classes)", fillcolor="#1b5e20", fontcolor="white"];
    }
    
    // OUTPUTS
    errors [label="❌ ERRORS\n(400/504 HTTP)", fillcolor="#ef5350", fontcolor="white"];
    success [label="✅ SUCCESS\n(200 JSON)", fillcolor="#66bb6a", fontcolor="white"];
    
    // Client Flow
    upload -> mime_check [label="File", weight=10];
    mime_check -> preview [label="✓ Valid", weight=10];
    mime_check -> errors [label="✗ Invalid MIME", weight=2, color="#d32f2f"];
    preview -> file_check [label="Submit\n(FormData)", weight=10];
    
    // API Flow
    file_check -> mime_api [label="✓ Exists", weight=10];
    file_check -> errors [label="✗ Missing", weight=2, color="#d32f2f"];
    mime_api -> size_check [label="✓ Valid MIME", weight=10];
    mime_api -> errors [label="✗ Bad MIME", weight=2, color="#d32f2f"];
    size_check -> prepare [label="✓ ≤ 4MB", weight=10];
    size_check -> errors [label="✗ Too Large", weight=2, color="#d32f2f"];
    prepare -> receive [label="POST /predict/", weight=10];
    
    // Backend Flow
    receive -> convert [label="PIL.Image", weight=10];
    convert -> resize [label="Tensor", weight=10];
    resize -> normalize [label="Values", weight=10];
    normalize -> inference [label="[1,3,224,224]", weight=10];
    inference -> success [label="6 Logits\n→ Softmax", weight=10];
    
    // Legend
    legend [shape=none, label=<
        <TABLE BORDER="1" CELLBORDER="0" CELLSPACING="8" CELLPADDING="5" BGCOLOR="#f5f5f5">
            <TR><TD COLSPAN="2" ALIGN="CENTER" BGCOLOR="#e8f4f8"><B>🔒 Security & Validation Pipeline</B></TD></TR>
            <TR><TD><B>Layer</B></TD><TD><B>Purpose</B></TD></TR>
            <TR><TD>1️⃣ Client</TD><TD>Quick validation (MIME type)</TD></TR>
            <TR><TD>2️⃣ API Gateway</TD><TD>Strict validation (MIME, size, timeout)</TD></TR>
            <TR><TD>3️⃣ FastAPI</TD><TD>Image processing & ML inference</TD></TR>
            <TR><TD bgcolor="#fffde7"><B>⏱️ Performance</B></TD><TD>1-3s typical latency</TD></TR>
        </TABLE>
    >, fontname="Arial"];
}
"""

def generate_diagram(dot_code, output_name):
    """Generate PNG from Graphviz DOT code"""
    try:
        # Write DOT file
        dot_file = f"{output_name}.dot"
        with open(dot_file, 'w') as f:
            f.write(dot_code)
        
        # Generate PNG using Graphviz
        png_file = f"{output_name}.png"
        result = subprocess.run(
            ['dot', '-Tpng', '-Gdpi=300', dot_file, '-o', png_file],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            file_size = os.path.getsize(png_file) / 1024
            print(f"✅ {output_name}.png created successfully ({file_size:.1f}KB)")
            return True
        else:
            print(f"❌ Error generating {output_name}.png:")
            print(result.stderr)
            return False
    except FileNotFoundError:
        print(f"⚠️ Graphviz not found. Installing...")
        # Try to install graphviz
        subprocess.run(['pip', 'install', 'graphviz'], capture_output=True)
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

# Generate all diagrams
print("🎨 Generating professional diagrams with Graphviz...\n")

print("📐 Generating HLD Diagram...")
generate_diagram(hld_dot, "hld_diagram_new")

print("📐 Generating LLD Diagram...")
generate_diagram(lld_dot, "lld_diagram_new")

print("📐 Generating Security Diagram...")
generate_diagram(security_dot, "validation_security_flow_new")

print("\n✅ All diagrams generated!")
print("\n📁 New files created:")
print("   - hld_diagram_new.png")
print("   - lld_diagram_new.png")
print("   - validation_security_flow_new.png")
