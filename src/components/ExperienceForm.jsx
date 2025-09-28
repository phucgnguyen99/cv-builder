import { useId } from "react";

function emptyExp(makeId) {
    return {
        id: makeId(),
        company: "",
        position: "",
        responsibilities: "",
        startDate: "",
        endDate: "",
    };
}

export default function ExperienceForm({ isEditing, value, onChange }) {
    const reactId = useId();
    const makeId = () => `${reactId}-${crypto.randomUUID()}`;

    const add = () => onChange([...value, emptyExp(makeId)]);
    const remove = (id) => onChange(value.filter((x) => x.id !== id));
    const update = (id, patch) =>
        onChange(value.map((x) => (x.id === id ? { ...x, ...patch } : x)));

    if (!isEditing) {
        // View mode
        return (
        <div className="card">
            {value.length === 0 && <p className="muted">No entries yet.</p>}
            {value.map((x) => (
            <div className="item" key={x.id}>
                <strong>{x.company}</strong>
                <div>{x.position}</div>
                <div className="muted">
                {x.startDate} — {x.endDate}
                </div>
                {x.responsibilities && (
                <ul className="bullets">
                    {x.responsibilities
                    .split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
                )}
            </div>
            ))}
        </div>
        );
    }

    // Edit mode
    return (
        <div className="stack">
        {value.map((x) => (
            <form className="card" key={x.id}>
            <div className="row">
                <label>
                Company
                <input
                    type="text"
                    value={x.company}
                    onChange={(e) => update(x.id, { company: e.target.value })}
                    placeholder="Acme Inc."
                />
                </label>
                <label>
                Position Title
                <input
                    type="text"
                    value={x.position}
                    onChange={(e) => update(x.id, { position: e.target.value })}
                    placeholder="Software Engineer"
                />
                </label>
            </div>

            <label>
                Main responsibilities
                <textarea
                rows={4}
                value={x.responsibilities}
                onChange={(e) =>
                    update(x.id, { responsibilities: e.target.value })
                }
                placeholder={"Use bullet lines:\n• Built features...\n• Wrote tests..."}
                />
            </label>

            <div className="row">
                <label>
                Start
                <input
                    type="month"
                    value={x.startDate}
                    onChange={(e) => update(x.id, { startDate: e.target.value })}
                />
                </label>
                <label>
                End
                <input
                    type="month"
                    value={x.endDate}
                    onChange={(e) => update(x.id, { endDate: e.target.value })}
                />
                </label>
            </div>

            <div className="actions">
                <button type="button" className="btn danger" onClick={() => remove(x.id)}>
                Remove
                </button>
            </div>
            </form>
        ))}

        <button type="button" className="btn outline" onClick={add}>
            + Add experience
        </button>
        </div>
    );
}
