import json
import psycopg2
from psycopg2 import extras
import numpy as np
import pandas as pd
import os
import random
from datetime import datetime, timedelta

# Configuración de conexión a PostgreSQL
parametros_conexion = {
    'host': os.getenv('DB_HOST', 'postgres-db'),
    'database': os.getenv('DB_NAME', 'postgres'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'mypassword')
}

# Función para crear el esquema y las tablas
def create_schema_and_tables(cursor):
    cursor.execute("CREATE SCHEMA IF NOT EXISTS operaciones;")
    
    # Tabla de plantas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_plants (
        plant_id SERIAL PRIMARY KEY,
        plant_code VARCHAR(10),
        plant_name VARCHAR(100),
        plant_location VARCHAR(100),
        plant_type VARCHAR(50),
        active BOOLEAN
    )
    """)
    
    # Tabla de estanques (ponds)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_ponds (
        pond_id SERIAL PRIMARY KEY,
        plant_id INTEGER REFERENCES operaciones.df_plants(plant_id),
        pond_code VARCHAR(20),
        pond_name VARCHAR(100),
        capacity FLOAT,
        measurement_unit VARCHAR(10),
        active BOOLEAN
    )
    """)
    
    # Tabla de bodegas (warehouses)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_warehouses (
        warehouse_id SERIAL PRIMARY KEY,
        plant_id INTEGER REFERENCES operaciones.df_plants(plant_id),
        warehouse_code VARCHAR(20),
        warehouse_name VARCHAR(100),
        capacity FLOAT,
        measurement_unit VARCHAR(10),
        active BOOLEAN
    )
    """)
    
    # Tabla de subsistemas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_subsystems (
        subsystem_id SERIAL PRIMARY KEY,
        subsystem_code VARCHAR(20),
        subsystem_name VARCHAR(100),
        plant_id INTEGER REFERENCES operaciones.df_plants(plant_id),
        active BOOLEAN
    )
    """)
    
    # Tabla de grupos de materiales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_material_groups (
        material_group_id SERIAL PRIMARY KEY,
        group_code VARCHAR(20),
        group_name VARCHAR(100),
        active BOOLEAN
    )
    """)
    
    # Tabla de materiales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_materials (
        material_id SERIAL PRIMARY KEY,
        material_code VARCHAR(20),
        material_name VARCHAR(100),
        material_group_id INTEGER REFERENCES operaciones.df_material_groups(material_group_id),
        material_type VARCHAR(50),
        measurement_unit VARCHAR(10),
        active BOOLEAN
    )
    """)
    
    # Tabla de baterías
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_batteries (
        battery_id SERIAL PRIMARY KEY,
        battery_code VARCHAR(20),
        battery_name VARCHAR(100),
        capacity FLOAT,
        measurement_unit VARCHAR(10),
        subsystem_id INTEGER REFERENCES operaciones.df_subsystems(subsystem_id),
        active BOOLEAN
    )
    """)
    
    # Tabla de mediciones de materiales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operaciones.df_material_measurements (
        measurement_id SERIAL PRIMARY KEY,
        material_id INTEGER REFERENCES operaciones.df_materials(material_id),
        plant_id INTEGER REFERENCES operaciones.df_plants(plant_id),
        pond_id INTEGER REFERENCES operaciones.df_ponds(pond_id),
        measurement_date TIMESTAMP,
        actual_value FLOAT,
        expected_value FLOAT,
        difference FLOAT,
        status VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

# Generar datos para las tablas
def generate_data():
    # Datos para plantas
    plant_locations = ["Maipú", "Mejillones", "Belloto", "Talca", "Biobio", "Osorno", "Coyhaique"]
    plants_data = []
    for i, location in enumerate(plant_locations, 1):
        plants_data.append({
            "plant_id": i,
            "plant_code": f"PL{i:03d}",
            "plant_name": f"Planta {location}",
            "plant_location": location,
            "plant_type": random.choice(["Producción", "Distribución", "Almacenamiento"]),
            "active": True
        })
    plants_df = pd.DataFrame(plants_data)
    
    # Datos para estanques (ponds)
    ponds_data = []
    pond_id = 1
    for plant in plants_data:
        for j in range(random.randint(2, 5)):
            ponds_data.append({
                "pond_id": pond_id,
                "plant_id": plant["plant_id"],
                "pond_code": f"ES{pond_id:03d}",
                "pond_name": f"Estanque {j+1} - {plant['plant_location']}",
                "capacity": random.uniform(1000, 5000),
                "measurement_unit": "m3",
                "active": True
            })
            pond_id += 1
    ponds_df = pd.DataFrame(ponds_data)
    
    # Datos para bodegas (warehouses)
    warehouses_data = []
    warehouse_id = 1
    for plant in plants_data:
        for j in range(random.randint(1, 3)):
            warehouses_data.append({
                "warehouse_id": warehouse_id,
                "plant_id": plant["plant_id"],
                "warehouse_code": f"WH{warehouse_id:03d}",
                "warehouse_name": f"Bodega {j+1} - {plant['plant_location']}",
                "capacity": random.uniform(500, 2000),
                "measurement_unit": "m2",
                "active": True
            })
            warehouse_id += 1
    warehouses_df = pd.DataFrame(warehouses_data)
    
    # Datos para subsistemas
    subsystems_data = []
    subsystem_id = 1
    for plant in plants_data:
        for j in range(random.randint(2, 4)):
            subsystems_data.append({
                "subsystem_id": subsystem_id,
                "subsystem_code": f"SS{subsystem_id:03d}",
                "subsystem_name": f"Subsistema {j+1} - {plant['plant_location']}",
                "plant_id": plant["plant_id"],
                "active": True
            })
            subsystem_id += 1
    subsystems_df = pd.DataFrame(subsystems_data)
    
    # Datos para grupos de materiales
    material_group_names = ["Cilindros", "Tanques", "Válvulas", "Mangueras", "Reguladores", "Sensores"]
    material_groups_data = []
    for i, name in enumerate(material_group_names, 1):
        material_groups_data.append({
            "material_group_id": i,
            "group_code": f"MG{i:03d}",
            "group_name": name,
            "active": True
        })
    material_groups_df = pd.DataFrame(material_groups_data)
    
    # Datos para materiales
    materials_data = []
    material_id = 1
    material_types = ["Almacenable", "Consumible", "Servicio"]
    for group in material_groups_data:
        for j in range(random.randint(3, 8)):
            materials_data.append({
                "material_id": material_id,
                "material_code": f"MAT{material_id:04d}",
                "material_name": f"{group['group_name']} Tipo {j+1}",
                "material_group_id": group["material_group_id"],
                "material_type": random.choice(material_types),
                "measurement_unit": random.choice(["kg", "unidad", "litro", "m3"]),
                "active": True
            })
            material_id += 1
    materials_df = pd.DataFrame(materials_data)
    
    # Datos para baterías
    batteries_data = []
    battery_id = 1
    for subsystem in subsystems_data:
        for j in range(random.randint(1, 3)):
            batteries_data.append({
                "battery_id": battery_id,
                "battery_code": f"BAT{battery_id:03d}",
                "battery_name": f"Batería {j+1} - {subsystem['subsystem_name']}",
                "capacity": random.uniform(100, 500),
                "measurement_unit": "kWh",
                "subsystem_id": subsystem["subsystem_id"],
                "active": True
            })
            battery_id += 1
    batteries_df = pd.DataFrame(batteries_data)
    
    # Datos para mediciones de materiales
    measurements_data = []
    measurement_id = 1
    start_date = datetime.now() - timedelta(days=90)
    
    for material in materials_data:
        # Seleccionar una planta aleatoria
        plant = random.choice(plants_data)
        
        # Seleccionar un estanque aleatorio de esa planta
        ponds_for_plant = [p for p in ponds_data if p["plant_id"] == plant["plant_id"]]
        if ponds_for_plant:
            pond = random.choice(ponds_for_plant)
            pond_id = pond["pond_id"]
        else:
            pond_id = None
        
        # Generar mediciones para los últimos 90 días
        for days_ago in range(90, 0, -5):  # Cada 5 días
            measurement_date = start_date + timedelta(days=90-days_ago)
            expected_value = random.uniform(100, 1000)
            actual_value = expected_value * random.uniform(0.85, 1.15)  # ±15% de variación
            difference = actual_value - expected_value
            
            status = "Normal"
            if difference > expected_value * 0.1:
                status = "Alto"
            elif difference < -expected_value * 0.1:
                status = "Bajo"
            
            measurements_data.append({
                "measurement_id": measurement_id,
                "material_id": material["material_id"],
                "plant_id": plant["plant_id"],
                "pond_id": pond_id,
                "measurement_date": measurement_date,
                "actual_value": actual_value,
                "expected_value": expected_value,
                "difference": difference,
                "status": status,
                "created_at": datetime.now()
            })
            measurement_id += 1
    
    measurements_df = pd.DataFrame(measurements_data)
    
    return {
        "plants": plants_df,
        "ponds": ponds_df,
        "warehouses": warehouses_df,
        "subsystems": subsystems_df,
        "material_groups": material_groups_df,
        "materials": materials_df,
        "batteries": batteries_df,
        "material_measurements": measurements_df
    }

# Función para insertar datos en las tablas
def insert_data(conexion, data_dict):
    cursor = conexion.cursor()
    create_schema_and_tables(cursor)
    
    # Insertar datos de plantas
    insert_df_to_table(cursor, data_dict["plants"], "operaciones.df_plants")
    
    # Insertar datos de estanques
    insert_df_to_table(cursor, data_dict["ponds"], "operaciones.df_ponds")
    
    # Insertar datos de bodegas
    insert_df_to_table(cursor, data_dict["warehouses"], "operaciones.df_warehouses")
    
    # Insertar datos de subsistemas
    insert_df_to_table(cursor, data_dict["subsystems"], "operaciones.df_subsystems")
    
    # Insertar datos de grupos de materiales
    insert_df_to_table(cursor, data_dict["material_groups"], "operaciones.df_material_groups")
    
    # Insertar datos de materiales
    insert_df_to_table(cursor, data_dict["materials"], "operaciones.df_materials")
    
    # Insertar datos de baterías
    insert_df_to_table(cursor, data_dict["batteries"], "operaciones.df_batteries")
    
    # Insertar datos de mediciones
    insert_df_to_table(cursor, data_dict["material_measurements"], "operaciones.df_material_measurements")
    
    conexion.commit()
    cursor.close()

def insert_df_to_table(cursor, df, table_name):
    # Convertir DataFrames a lista de tuplas
    data_tuples = [tuple(row) for row in df.values]
    
    # Construir consulta SQL dinámica
    columns = ', '.join(df.columns)
    placeholders = ', '.join(['%s'] * len(df.columns))
    
    insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    
    # Ejecutar la consulta con los datos
    extras.execute_batch(cursor, insert_query, data_tuples)

# Ejecutar el programa
try:
    # Generar los datos
    print("Generando datos de ejemplo...")
    data_dict = generate_data()
    
    # Conectar a PostgreSQL y cargar los datos
    print("Conectando a PostgreSQL...")
    conexion = psycopg2.connect(**parametros_conexion)
    
    print("Cargando datos en PostgreSQL...")
    insert_data(conexion, data_dict)
    
    print("✅ Datos cargados exitosamente en PostgreSQL dentro del esquema operaciones.")
    
    # Mostrar resumen de datos cargados
    for table_name, df in data_dict.items():
        print(f"Tabla {table_name}: {len(df)} registros")
    
except Exception as e:
    print(f"❌ Error en la carga de datos: {e}")
finally:
    if 'conexion' in locals() and conexion:
        conexion.close()