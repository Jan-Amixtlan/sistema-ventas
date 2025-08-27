# Backend Endpoints para Features
# Agregar estos endpoints a tu main.py de FastAPI

from fastapi import HTTPException
from typing import List, Optional
import uuid

# Modelo de datos para Features (agregar a tus modelos)
class Feature(BaseModel):
    id: int
    icon_type: str
    title: str
    description: str
    detailed_description: Optional[str] = None
    benefits: Optional[List[str]] = None
    specifications: Optional[List[dict]] = None
    image_url: Optional[str] = None
    is_active: bool = True
    created_at: Optional[str] = None

class FeatureResponse(BaseModel):
    id: int
    icon_type: str
    title: str
    description: str
    detailed_description: Optional[str] = None
    benefits: Optional[List[str]] = None
    specifications: Optional[List[dict]] = None
    image_url: Optional[str] = None

# Datos de ejemplo (reemplazar con tu base de datos)
FEATURES_DB = [
    {
        "id": 1,
        "icon_type": "wrench",
        "title": "Modern Equipments",
        "description": "Enim venia quis nostrud exercit ullamco laboris nsut aliquip com conseq reprehenderit.",
        "detailed_description": "Our state-of-the-art automotive equipment ensures precision diagnostics and repairs. We use cutting-edge technology to provide the most accurate service for your vehicle. Our workshop is equipped with the latest diagnostic computers, alignment equipment, and testing systems.",
        "benefits": [
            "Advanced diagnostic computers with real-time analysis",
            "Precision alignment equipment for perfect wheel alignment", 
            "Latest brake testing systems for safety assurance",
            "Modern lift and hydraulic systems for efficient service",
            "Computer-controlled air conditioning service equipment",
            "Electronic fuel injection testing and cleaning systems"
        ],
        "specifications": [
            {"label": "Diagnostic Accuracy", "value": "99.9%"},
            {"label": "Equipment Age", "value": "< 2 Years"},
            {"label": "Certification", "value": "ASE Certified"},
            {"label": "Warranty", "value": "2 Years"}
        ],
        "image_url": "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop",
        "is_active": True
    },
    {
        "id": 2,
        "icon_type": "car",
        "title": "Trusted Workshop",
        "description": "Enim venia quis nostrud exercit ullamco laboris nsut aliquip com conseq reprehenderit.",
        "detailed_description": "With over 15 years in the automotive industry, our workshop has built a reputation for reliability, quality, and customer satisfaction. We have served thousands of customers and maintained the highest standards of service quality.",
        "benefits": [
            "ASE certified technicians with ongoing training",
            "Quality guarantee on all work performed",
            "Transparent pricing with no hidden fees",
            "Customer satisfaction guarantee",
            "Insurance claim assistance",
            "Warranty honored by nationwide network"
        ],
        "specifications": [
            {"label": "Years in Business", "value": "15+"},
            {"label": "Customer Rating", "value": "4.9/5"},
            {"label": "Technicians", "value": "ASE Certified"},
            {"label": "Warranty", "value": "Nationwide"}
        ],
        "image_url": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
        "is_active": True
    },
    {
        "id": 3,
        "icon_type": "user-check",
        "title": "Service Any Vehicle",
        "description": "Enim venia quis nostrud exercit ullamco laboris nsut aliquip com conseq reprehenderit.",
        "detailed_description": "From compact cars to luxury vehicles, trucks to motorcycles - our experienced team can handle any automotive service need with expertise and care. We work on all makes and models, domestic and import vehicles.",
        "benefits": [
            "All vehicle makes and models serviced",
            "Import and domestic vehicles expertise",
            "Classic car restoration and maintenance",
            "Commercial vehicle service and fleet maintenance",
            "Motorcycle and ATV service",
            "Hybrid and electric vehicle certified service"
        ],
        "specifications": [
            {"label": "Vehicle Types", "value": "All Makes"},
            {"label": "Service Range", "value": "Complete"},
            {"label": "Specializations", "value": "50+"},
            {"label": "Fleet Service", "value": "Available"}
        ],
        "image_url": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
        "is_active": True
    }
]

# Endpoints para Features
@app.get("/api/features", response_model=List[FeatureResponse])
async def get_features():
    """
    Obtener todas las características activas
    """
    try:
        active_features = [feature for feature in FEATURES_DB if feature["is_active"]]
        return active_features
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving features: {str(e)}")

@app.get("/api/features/{feature_id}", response_model=FeatureResponse)
async def get_feature_by_id(feature_id: int):
    """
    Obtener una característica específica por ID
    """
    try:
        feature = next((f for f in FEATURES_DB if f["id"] == feature_id and f["is_active"]), None)
        if not feature:
            raise HTTPException(status_code=404, detail="Feature not found")
        return feature
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving feature: {str(e)}")

@app.get("/api/features/{feature_id}/details", response_model=FeatureResponse)
async def get_feature_details(feature_id: int):
    """
    Obtener detalles completos de una característica específica
    Incluye información adicional como beneficios y especificaciones
    """
    try:
        feature = next((f for f in FEATURES_DB if f["id"] == feature_id and f["is_active"]), None)
        if not feature:
            raise HTTPException(status_code=404, detail="Feature not found")
        
        # Aquí podrías cargar información adicional desde la base de datos
        # Por ejemplo, reseñas de clientes, imágenes adicionales, etc.
        
        return feature
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving feature details: {str(e)}")

# Endpoint adicional para estadísticas de features
@app.get("/api/features/stats")
async def get_features_stats():
    """
    Obtener estadísticas relacionadas con las características
    """
    try:
        return {
            "total_features": len([f for f in FEATURES_DB if f["is_active"]]),
            "equipment_count": 25,
            "certified_technicians": 8,
            "vehicles_serviced": 5000,
            "customer_satisfaction": 4.9
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving features stats: {str(e)}")
