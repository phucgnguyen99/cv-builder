export default function GeneralForm({ value, onChange }) {
    const update = (patch) => onChange({ ...value, ...patch });

    return (
        <form className="card">
        <label>
            Full name
            <input
            type="text"
            value={value.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Jane Doe"
            />
        </label>

        <label>
            Email
            <input
            type="email"
            value={value.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="jane@example.com"
            />
        </label>

        <label>
            Phone
            <input
            type="tel"
            value={value.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="(555) 000-1234"
            />
        </label>
        </form>
    );
}