type HeadingProps = {title : string; subheading?: string; description?: string;}

function Heading({ title, subheading, description }: HeadingProps) {
	return (
		<div>
			<h1 className='font-bold text-6xl ml-1.5'>{title}</h1>
			<h2 className='font-bold text-4xl ml-1.5'>{subheading}</h2>
			<p className='ml-1.5'>{description}</p>
		</div>
	);
}

export default Heading;