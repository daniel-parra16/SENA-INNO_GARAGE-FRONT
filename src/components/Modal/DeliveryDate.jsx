import '../Tabla/NewRegisterPanel/NewRegisterPanel.css';

function DeliveryDate(props) {

return (
    <div className="panel-container">
        <div className="panel">
            <h2>Send to Order</h2>

            <form onSubmit={props.onsubmit} className="form-new-product">

            {props.fields.map((item, index) => (
                <label key={index}>
                {item.label}

                {item.type === "select" ? (
                    <select name={item.name} defaultValue="">
                    <option value="">Seleccione una opción</option>

                    {(props.mechanics?.length > 0 ? props.mechanics : props.roles).map((opt, i) => (
                        <option key={i} value={opt.name}>
                        {opt.name}
                        </option>
                    ))}
                    </select>
                ) : item.type === "datetime-local" ? (
                    <input
                    type="datetime-local"
                    name={item.name}
                    />
                ) : (
                    <input
                    type={item.type}
                    name={item.name}
                    />
                )}
                </label>
            ))}

            <div className="actions-new-product">
                <button type="submit" className="btn-submit">
                Send Order
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

export default DeliveryDate;
