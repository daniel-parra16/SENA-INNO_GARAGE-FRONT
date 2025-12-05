import './NewRegisterPanel.css';

function NewRegisterPanel(props) {

  const isEditing = !!props.record;

  const title = isEditing ? `Edit ${props.module}` : `New ${props.module}`;
  const buttonText = isEditing ? `Update ${props.module}` : `Add ${props.module}`;
  const action = isEditing ? props.onupdate : props.onadd;

  return (
    <div className="panel-container">
      <div className="panel">
        <h2>{title}</h2>

        <form onSubmit={action}>
          {
            props.fields.map(item => (
              <label>
                {item.label}
                {
                  (item.type == "text" || item.type == "number")
                    ?
                      <input 
                        type={item.type} 
                        name={item.name} 
                        defaultValue={isEditing ? props.record[item.edit] : ""}
                        placeholder={item.placeholder}
                      />
                    : 
                      (
                        (item.type == "select") 
                          ?
                            <select name={item.name} defaultValue={isEditing ? props.record[item.edit] : ""}>
                              <option value="">Seleccione una opción</option>
                              {
                                props.roles.map(rol => (
                                  <option value={rol.name} >{rol.name}</option>
                                ))
                              }
                            </select>
                          : ""
                      )
                }
              </label>
            ))
          }

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
export default NewRegisterPanel  ;