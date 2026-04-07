import { useState } from 'react';

export default function OrdenForm({ initialData, onSubmit }) {

  const [form, setForm] = useState({
    descripcion: initialData?.descripcion || '',
    totalEstimado: initialData?.totalEstimado || ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(form);
    }}>
      <input
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />

      <input
        name="totalEstimado"
        value={form.totalEstimado}
        onChange={handleChange}
        placeholder="Total"
      />

      <button type="submit">Guardar</button>
    </form>
  );
}