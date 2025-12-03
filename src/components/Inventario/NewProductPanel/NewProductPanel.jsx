import './NewProductPanel.css';

function NewProductPanel(props) {

  const isEditing = !!props.product;

  const title = isEditing ? "Editar Producto" : "Nuevo Producto";
  const buttonText = isEditing ? "Actualizar Producto" : "Agregar Producto";
  const action = isEditing ? props.onupdate : props.onadd;

  return (
    <div className="new-product-panel-container">
      <div className="new-product-panel">
        <h2>{title}</h2>

        <form onSubmit={action}>
          <label>
            Nombre del Producto:
            <input 
              type="text" 
              name="productName"
              defaultValue={isEditing ? props.product.name : ""}
            />
          </label>

          <label>
            Cantidad:
            <input 
              type="number" 
              name="productQuantity"
              defaultValue={isEditing ? props.product.stock : ""}
            />
          </label>

          <div className="actions-new-product">
            <button type="submit" className="btn-submit">
              {buttonText}
            </button>

            <button type="button" onClick={props.oncancel} className="btn-return">
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
export default NewProductPanel  ;