type HeadingProps = {title : string; className?: string}

function Heading({ title, className }: HeadingProps) {
	return <h1 className={className}>{title}</h1>;
}

export default Heading;