//PascalCase is the standard
function Message({ className, children }: { className?: string; children?: React.ReactNode }) {
	return <h1 className={className}>{children}</h1>;
}

export default Message;