import { useId } from "react";

function emptyEdu(makeId) {
    return {
        id: makeId(),
        school: "",
        title: "",
        startDate: "",
        endDate: "",
    };
    }

    export default function EducationForm({ isEditing, value, onChange }) {
    const reactId = useId();
    const makeId = () => `${reactId}-${crypto.randomUUID()}`;

    const add = () => onChange([...value, emptyEdu(makeId)]);
    const remove = (id) => onChange(value.filter((e) => e.id !== id));
    const update = (id, patch) =>
        onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));

    if (!isEditing) {
        // View mode
        return (
        <div className="card">
            {value.length === 0 && <p className="muted">No entries yet.</p>}
            {value.map((e) => (
            <div className="item" key={e.id}>
                <strong>{e.school}</strong>
                <div>{e.title}</div>
                <div className="muted">
                {e.startDate} — {e.endDate}
                </div>
            </div>
            ))}
        </div>
        );
    }

    // Edit mode
    return (
        <div className="stack">
        {value.map((e) => (
            <form className="card" key={e.id}>
            <div className="row">
                <label>
                School
                <input
                    type="text"
                    value={e.school}
                    onChange={(ev) => update(e.id, { school: ev.target.value })}
                    placeholder="George Mason University"
                />
                </label>
                <label>
                Title of study
                <input
                    type="text"
                    value={e.title}
                    onChange={(ev) => update(e.id, { title: ev.target.value })}
                    placeholder="B.S. Computer Science"
                />
                </label>
            </div>

            <div className="row">
                <label>
                Start
                <input
                    type="month"
                    value={e.startDate}
                    onChange={(ev) => update(e.id, { startDate: ev.target.value })}
                />
                </label>
                <label>
                End
                <input
                    type="month"
                    value={e.endDate}
                    onChange={(ev) => update(e.id, { endDate: ev.target.value })}
                />
                </label>
            </div>

            <div className="actions">
                <button type="button" className="btn danger" onClick={() => remove(e.id)}>
                Remove
                </button>
            </div>
            </form>
        ))}

        <button type="button" className="btn outline" onClick={add}>
            + Add education
        </button>
        </div>
    );
}
