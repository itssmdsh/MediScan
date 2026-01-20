import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

# Set style
plt.rcParams['font.family'] = 'Arial'
plt.rcParams['font.size'] = 10

# ============================================
# 1. HLD (High-Level Architecture)
# ============================================
fig, ax = plt.subplots(figsize=(12, 8))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Title
ax.text(5, 9.5, 'MediScan - High-Level Architecture', fontsize=16, fontweight='bold', ha='center')

# Frontend (User)
frontend_box = FancyBboxPatch((0.5, 7), 2, 1.5, boxstyle="round,pad=0.1", 
                              edgecolor='black', facecolor='#1e3a5f', linewidth=2)
ax.add_patch(frontend_box)
ax.text(1.5, 7.75, 'Frontend\n(Next.js)', fontsize=11, fontweight='bold', 
        ha='center', va='center', color='white')

# API Gateway
gateway_box = FancyBboxPatch((4, 7), 2, 1.5, boxstyle="round,pad=0.1", 
                             edgecolor='black', facecolor='#2563eb', linewidth=2)
ax.add_patch(gateway_box)
ax.text(5, 7.75, 'API Gateway\n(/analyze)', fontsize=11, fontweight='bold', 
        ha='center', va='center', color='white')

# Backend
backend_box = FancyBboxPatch((7.5, 7), 2, 1.5, boxstyle="round,pad=0.1", 
                             edgecolor='black', facecolor='#0d9488', linewidth=2)
ax.add_patch(backend_box)
ax.text(8.5, 7.75, 'Backend\n(FastAPI)', fontsize=11, fontweight='bold', 
        ha='center', va='center', color='white')

# Arrows between top tier
arrow1 = FancyArrowPatch((2.5, 7.75), (4, 7.75), arrowstyle='->', 
                        mutation_scale=20, linewidth=2, color='black')
ax.add_patch(arrow1)
ax.text(3.25, 8.1, 'HTTP', fontsize=9, ha='center', style='italic')

arrow2 = FancyArrowPatch((6, 7.75), (7.5, 7.75), arrowstyle='->', 
                        mutation_scale=20, linewidth=2, color='black')
ax.add_patch(arrow2)
ax.text(6.75, 8.1, 'HTTP', fontsize=9, ha='center', style='italic')

# Backend Components
model_box = FancyBboxPatch((7.5, 5), 2, 1.2, boxstyle="round,pad=0.1", 
                          edgecolor='black', facecolor='#059669', linewidth=2)
ax.add_patch(model_box)
ax.text(8.5, 5.6, 'ResNet18\nModel', fontsize=10, fontweight='bold', 
        ha='center', va='center', color='white')

# PyTorch/Processing
pytorch_box = FancyBboxPatch((7.5, 3.5), 2, 1.2, boxstyle="round,pad=0.1", 
                            edgecolor='black', facecolor='#10b981', linewidth=2)
ax.add_patch(pytorch_box)
ax.text(8.5, 4.1, 'PyTorch\nInference', fontsize=10, fontweight='bold', 
        ha='center', va='center', color='white')

# Arrow from backend to model
arrow3 = FancyArrowPatch((8.5, 7), (8.5, 6.2), arrowstyle='->', 
                        mutation_scale=15, linewidth=1.5, color='gray')
ax.add_patch(arrow3)

# Arrow from model to pytorch
arrow4 = FancyArrowPatch((8.5, 5), (8.5, 4.7), arrowstyle='->', 
                        mutation_scale=15, linewidth=1.5, color='gray')
ax.add_patch(arrow4)

# Frontend Components
upload_box = FancyBboxPatch((0.5, 5), 2, 1.2, boxstyle="round,pad=0.1", 
                           edgecolor='black', facecolor='#60a5fa', linewidth=2)
ax.add_patch(upload_box)
ax.text(1.5, 5.6, 'Image\nUploader', fontsize=10, fontweight='bold', 
        ha='center', va='center', color='white')

# Results Display
results_box = FancyBboxPatch((0.5, 3.5), 2, 1.2, boxstyle="round,pad=0.1", 
                            edgecolor='black', facecolor='#3b82f6', linewidth=2)
ax.add_patch(results_box)
ax.text(1.5, 4.1, 'Results\nDisplay', fontsize=10, fontweight='bold', 
        ha='center', va='center', color='white')

# Arrows from frontend to components
arrow5 = FancyArrowPatch((1.5, 7), (1.5, 6.2), arrowstyle='->', 
                        mutation_scale=15, linewidth=1.5, color='gray')
ax.add_patch(arrow5)

arrow6 = FancyArrowPatch((1.5, 5), (1.5, 4.7), arrowstyle='->', 
                        mutation_scale=15, linewidth=1.5, color='gray')
ax.add_patch(arrow6)

# Model Weights
weights_box = FancyBboxPatch((4, 3.5), 2, 1.2, boxstyle="round,pad=0.1", 
                            edgecolor='black', facecolor='#f59e0b', linewidth=2)
ax.add_patch(weights_box)
ax.text(5, 4.1, 'Model Weights\n(Dropbox)', fontsize=10, fontweight='bold', 
        ha='center', va='center', color='white')

# Arrow from weights to model
arrow7 = FancyArrowPatch((6, 4.1), (7.5, 5.2), arrowstyle='<-', 
                        mutation_scale=15, linewidth=1.5, color='gray', linestyle='dashed')
ax.add_patch(arrow7)

# Data Flow at bottom
flow_text = "📤 User uploads image → 🔍 Validation → 🧠 Model inference → ✅ Confidence scores"
ax.text(5, 1.5, flow_text, fontsize=10, ha='center', 
        bbox=dict(boxstyle='round', facecolor='#f0f0f0', edgecolor='black', linewidth=1))

# Key metrics
ax.text(5, 0.5, '⏱️ Latency: <3s | 📦 Model: 45MB | 🎯 Accuracy: ~87%', 
        fontsize=9, ha='center', style='italic')

plt.tight_layout()
plt.savefig('c:/Users/hones/Downloads/MediScan/hld_diagram.png', dpi=300, bbox_inches='tight', facecolor='white')
print("✅ HLD Diagram saved!")

# ============================================
# 2. LLD (Low-Level Design)
# ============================================
fig, ax = plt.subplots(figsize=(14, 9))
ax.set_xlim(0, 14)
ax.set_ylim(0, 10)
ax.axis('off')

# Title
ax.text(7, 9.5, 'MediScan - Low-Level Design', fontsize=16, fontweight='bold', ha='center')

# Layer 1: Frontend (Next.js)
layer1_title = FancyBboxPatch((0.3, 8), 3, 0.6, boxstyle="round,pad=0.05", 
                              edgecolor='black', facecolor='#1e3a5f', linewidth=2)
ax.add_patch(layer1_title)
ax.text(1.8, 8.3, 'Layer 1: Frontend (Next.js)', fontsize=11, fontweight='bold', 
        ha='center', va='center', color='white')

# Frontend components
components_l1 = [
    ('page.tsx\nOrchestrator', 0.5),
    ('image-uploader\n.tsx', 2),
    ('results-display\n.tsx', 3.5),
]

for comp, x in components_l1:
    box = FancyBboxPatch((x, 6.8), 1.3, 0.9, boxstyle="round,pad=0.05", 
                        edgecolor='black', facecolor='#3b82f6', linewidth=1.5)
    ax.add_patch(box)
    ax.text(x + 0.65, 7.25, comp, fontsize=8, fontweight='bold', 
            ha='center', va='center', color='white')

# Layer 2: API Route (Gateway)
layer2_title = FancyBboxPatch((5.3, 8), 3, 0.6, boxstyle="round,pad=0.05", 
                              edgecolor='black', facecolor='#2563eb', linewidth=2)
ax.add_patch(layer2_title)
ax.text(6.8, 8.3, 'Layer 2: API Route (/analyze)', fontsize=11, fontweight='bold', 
        ha='center', va='center', color='white')

# API components
api_comp = FancyBboxPatch((5.5, 6.8), 2.6, 0.9, boxstyle="round,pad=0.05", 
                         edgecolor='black', facecolor='#1e40af', linewidth=1.5)
ax.add_patch(api_comp)
ax.text(6.8, 7.3, 'CORS Gateway\n(Validation)', fontsize=8, fontweight='bold', 
        ha='center', va='center', color='white')

# Layer 3: Backend (FastAPI)
layer3_title = FancyBboxPatch((10.3, 8), 3, 0.6, boxstyle="round,pad=0.05", 
                              edgecolor='black', facecolor='#0d9488', linewidth=2)
ax.add_patch(layer3_title)
ax.text(11.8, 8.3, 'Layer 3: FastAPI Backend', fontsize=11, fontweight='bold', 
        ha='center', va='center', color='white')

# FastAPI components
components_l3 = [
    ('Image\nProcessing', 10.5),
    ('Model\nInference', 11.9),
    ('Result\nFormatting', 13.2),
]

for comp, x in components_l3:
    box = FancyBboxPatch((x, 6.8), 1.3, 0.9, boxstyle="round,pad=0.05", 
                        edgecolor='black', facecolor='#059669', linewidth=1.5)
    ax.add_patch(box)
    ax.text(x + 0.65, 7.25, comp, fontsize=8, fontweight='bold', 
            ha='center', va='center', color='white')

# Data Flow Section
ax.text(7, 5.8, 'Data Flow', fontsize=12, fontweight='bold', 
        bbox=dict(boxstyle='round', facecolor='#f0f0f0', edgecolor='black', linewidth=1))

# Flow steps
flows = [
    (0.5, 'User\nUpload', '#3b82f6'),
    (2.2, 'Validation\n(MIME/Size)', '#1e40af'),
    (3.9, 'HTTP POST', '#1e40af'),
    (5.6, 'Process\nImage', '#059669'),
    (7.3, 'Resize to\n224×224', '#059669'),
    (9, 'ResNet18\nInference', '#10b981'),
    (10.7, 'Softmax\nOutput', '#10b981'),
    (12.4, 'Return\nResults', '#3b82f6'),
]

for x, label, color in flows:
    box = FancyBboxPatch((x, 4.3), 1.3, 0.8, boxstyle="round,pad=0.04", 
                        edgecolor='black', facecolor=color, linewidth=1)
    ax.add_patch(box)
    ax.text(x + 0.65, 4.7, label, fontsize=7, fontweight='bold', 
            ha='center', va='center', color='white')

# Process Details
ax.text(7, 3.2, 'Processing Pipeline', fontsize=11, fontweight='bold')

details = [
    '1️⃣ Convert JPEG/PNG → RGB (3 channels)',
    '2️⃣ Normalize: Mean=[0.485, 0.456, 0.406], Std=[0.229, 0.224, 0.225]',
    '3️⃣ ResNet18 forward pass → 6 class logits',
    '4️⃣ Softmax activation → Confidence %',
    '5️⃣ Return: {disease: str, confidence: float, all_classes: dict}'
]

y_pos = 2.8
for i, detail in enumerate(details):
    ax.text(0.5, y_pos - i*0.35, detail, fontsize=8, 
            family='monospace',
            bbox=dict(boxstyle='round', facecolor='#f9fafb', edgecolor='#d1d5db', linewidth=0.5))

# Constraints Box
ax.text(7, 0.6, '⚙️ Constraints: 4MB max | 25s timeout | 224×224 input | ~87% accuracy', 
        fontsize=9, ha='center', style='italic',
        bbox=dict(boxstyle='round', facecolor='#fef3c7', edgecolor='#f59e0b', linewidth=1.5))

plt.tight_layout()
plt.savefig('c:/Users/hones/Downloads/MediScan/lld_diagram.png', dpi=300, bbox_inches='tight', facecolor='white')
print("✅ LLD Diagram saved!")

# ============================================
# 3. Validation & Security Flow
# ============================================
fig, ax = plt.subplots(figsize=(12, 10))
ax.set_xlim(0, 12)
ax.set_ylim(0, 10)
ax.axis('off')

# Title
ax.text(6, 9.5, 'Validation & Security Pipeline', fontsize=16, fontweight='bold', ha='center')

# Column 1: Client Validation
ax.text(2, 8.8, 'CLIENT LAYER', fontsize=11, fontweight='bold', ha='center',
        bbox=dict(boxstyle='round', facecolor='#dbeafe', edgecolor='black', linewidth=1))

client_steps = [
    ('Upload File', 8.3, '#60a5fa'),
    ('Check MIME\n(JPEG/PNG/JPG)', 7.2, '#3b82f6'),
    ('Show Preview', 6.1, '#1e40af'),
]

for label, y, color in client_steps:
    box = FancyBboxPatch((1, y - 0.35), 2, 0.7, boxstyle="round,pad=0.05", 
                        edgecolor='black', facecolor=color, linewidth=1.5)
    ax.add_patch(box)
    ax.text(2, y, label, fontsize=9, fontweight='bold', 
            ha='center', va='center', color='white')

# Column 2: API Gateway Validation
ax.text(6, 8.8, 'API GATEWAY', fontsize=11, fontweight='bold', ha='center',
        bbox=dict(boxstyle='round', facecolor='#dbeafe', edgecolor='black', linewidth=1))

api_steps = [
    ('File Exists?', 8.3, '#2563eb'),
    ('MIME Valid?\n(JPEG/PNG/WebP)', 7.2, '#1e40af'),
    ('Size ≤ 4MB?', 6.1, '#0d47a1'),
    ('Return JSON', 5, '#1e40af'),
]

for label, y, color in api_steps:
    box = FancyBboxPatch((5, y - 0.35), 2, 0.7, boxstyle="round,pad=0.05", 
                        edgecolor='black', facecolor=color, linewidth=1.5)
    ax.add_patch(box)
    ax.text(6, y, label, fontsize=9, fontweight='bold', 
            ha='center', va='center', color='white')

# Column 3: FastAPI Processing
ax.text(10, 8.8, 'FASTAPI BACKEND', fontsize=11, fontweight='bold', ha='center',
        bbox=dict(boxstyle='round', facecolor='#d1fae5', edgecolor='black', linewidth=1))

backend_steps = [
    ('Receive File', 8.3, '#10b981'),
    ('Convert RGB', 7.2, '#059669'),
    ('Resize 224×224', 6.1, '#047857'),
    ('Normalize Values', 5, '#065f46'),
]

for label, y, color in backend_steps:
    box = FancyBboxPatch((9, y - 0.35), 2, 0.7, boxstyle="round,pad=0.05", 
                        edgecolor='black', facecolor=color, linewidth=1.5)
    ax.add_patch(box)
    ax.text(10, y, label, fontsize=9, fontweight='bold', 
            ha='center', va='center', color='white')

# Main arrow connecting all columns
main_arrow = FancyArrowPatch((3, 8.3), (5, 8.3), arrowstyle='->', 
                            mutation_scale=20, linewidth=2.5, color='#1e40af')
ax.add_patch(main_arrow)

main_arrow2 = FancyArrowPatch((7, 8.3), (9, 8.3), arrowstyle='->', 
                             mutation_scale=20, linewidth=2.5, color='#047857')
ax.add_patch(main_arrow2)

# Model Inference
ax.text(6, 3.8, 'MODEL INFERENCE', fontsize=11, fontweight='bold', ha='center',
        bbox=dict(boxstyle='round', facecolor='#c7d2fe', edgecolor='black', linewidth=1))

inference_box = FancyBboxPatch((4.5, 2.5), 3, 1, boxstyle="round,pad=0.1", 
                              edgecolor='black', facecolor='#818cf8', linewidth=2)
ax.add_patch(inference_box)
ax.text(6, 3.1, 'ResNet18 Forward Pass\n6-Class Classifier\n(6 disease outputs)', 
        fontsize=9, fontweight='bold', ha='center', va='center', color='white')

# Connect to inference
arrow_to_inference = FancyArrowPatch((10, 5), (6.5, 3.5), arrowstyle='->', 
                                   mutation_scale=20, linewidth=2, color='gray', linestyle='dashed')
ax.add_patch(arrow_to_inference)

# Error Handling
ax.text(2, 3.5, 'ERRORS', fontsize=10, fontweight='bold', ha='center',
        bbox=dict(boxstyle='round', facecolor='#fee2e2', edgecolor='black', linewidth=1))

errors = [
    ('❌ 400: No file', 2.9),
    ('❌ 400: Bad MIME', 2.4),
    ('❌ 400: Too large', 1.9),
]

for label, y in errors:
    ax.text(2, y, label, fontsize=8, ha='center',
            bbox=dict(boxstyle='round', facecolor='#fecaca', edgecolor='#dc2626', linewidth=1))

# Results
ax.text(10, 3.5, 'RESULTS', fontsize=10, fontweight='bold', ha='center',
        bbox=dict(boxstyle='round', facecolor='#dcfce7', edgecolor='black', linewidth=1))

results = [
    ('✅ Disease: str', 2.9),
    ('✅ Confidence: %', 2.4),
    ('✅ All classes: dict', 1.9),
]

for label, y in results:
    ax.text(10, y, label, fontsize=8, ha='center',
            bbox=dict(boxstyle='round', facecolor='#bbf7d0', edgecolor='#059669', linewidth=1))

# Footer
ax.text(6, 0.6, '🔒 Security: CORS enabled | File validation on client & server | Auto image normalization', 
        fontsize=9, ha='center', style='italic',
        bbox=dict(boxstyle='round', facecolor='#f0f0f0', edgecolor='black', linewidth=1))

plt.tight_layout()
plt.savefig('c:/Users/hones/Downloads/MediScan/validation_security_flow.png', dpi=300, bbox_inches='tight', facecolor='white')
print("✅ Validation & Security Diagram saved!")

print("\n✅ All diagrams created successfully!")
print("📁 Saved to:")
print("   - hld_diagram.png")
print("   - lld_diagram.png")
print("   - validation_security_flow.png")
