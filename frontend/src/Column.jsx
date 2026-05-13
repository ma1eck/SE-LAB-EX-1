function Column({ name = "default" }) {
  return (
    <div className="col-header">
      <h1 className="col-title">{name}</h1>
    </div>
  );
}

export default Column;
