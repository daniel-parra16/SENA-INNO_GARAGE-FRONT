function NewProductPanel() {
  return (
    <div className="new-product-panel">
        <h2>Nuevo Producto</h2>
        <form>
            <label>
                Nombre del Producto:
                <input type="text" name="productName" />
            </label>
            <label>
                Cantidad:
                <input type="number" name="productQuantity" />
            </label>
            <button type="submit" className="btn-submit">Agregar Producto</button>
        </form>
    </div>
  );
}
export default NewProductPanel;