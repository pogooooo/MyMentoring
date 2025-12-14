const WorksheetCard = ({ title, children, className = "" }) => (
    <div className={`bg-white border-2 border-black p-6 ${className}`}>
        <h3 className="font-bold text-lg mb-4 bg-black text-white px-3 py-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            {title}
        </h3>
        {children}
    </div>
);

export default WorksheetCard
