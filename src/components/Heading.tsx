type HeadingProps = {title : string; subheading?: string; description?: string;}

function Heading({ title, subheading, description }: HeadingProps) {
	return (
		<>
			<h1 className='font-bold text-6xl'>{title}</h1>
			<h2 className='font-bold text-4xl'>{subheading}</h2>
			<p>{description}</p>
		</>
	);
}

export default Heading;