const SectionTitle = ({ children, icon: Icon }) => (
    <h2 className="text-2xl font-black mb-6 border-b-4 border-black pb-2 flex items-center gap-2 uppercase tracking-tight">
        {Icon && <Icon size={28} />}
        {children}
    </h2>
);

export default SectionTitle
