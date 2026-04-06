import React from 'react'

export default function index() {
    return (

        <>
            {/* Campos dinámicos según el Rol */}
            <div className={styles.field}>
                <label htmlFor="placa">Placa del Vehículo</label>
                <input
                    type="text"
                    id="placa"
                    name="placa"
                    placeholder="Ej: ABC-123"
                    value={formData.placa}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="vin">Vin (número de chasis)</label>
                <input
                    type="number"
                    id="vin"
                    name="vin"
                    placeholder="Ej: 1HGCM82633A004352"
                    value={formData.vin}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="marca">Marca</label>
                <input
                    type="text"
                    id="marca"
                    name="marca"
                    placeholder="Ej: Toyota, Mazda, Chevrolet, etc."
                    value={formData.marca}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="modelo">Modelo</label>
                <input
                    type="number"
                    id="modelo"
                    name="modelo"
                    placeholder="Ej: Corolla, 3, Spark, etc."
                    value={formData.modelo}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="anio">Año de fabricación</label>
                <input
                    type="number"
                    id="anio"
                    name="anio"
                    placeholder="Ej: 2023"
                    value={formData.anio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    placeholder="Ej: Rojo"
                    value={formData.color}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="tipo">tipo</label>
                <input
                    type="number"
                    id="tipo"
                    name="tipo"
                    placeholder="Ej: Carro"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    )
}
