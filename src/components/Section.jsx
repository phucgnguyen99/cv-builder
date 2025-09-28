export default function Section({ title, isEditing, onEdit, onSubmit, children }) {
    return (
        <section className="section">
        <div className="section-header">
            <h2>{title}</h2>
            <div className="section-actions">
            {isEditing ? (
                <button className="btn primary" onClick={onSubmit}>Submit</button>
            ) : (
                <button className="btn" onClick={onEdit}>Edit</button>
            )}
            </div>
        </div>
        <div>{children}</div>
        </section>
    );
}
