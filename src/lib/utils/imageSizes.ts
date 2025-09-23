// Centralized sizes that reflect app.css breakpoints

export const imageSizes = {
	grid: '(min-width: 1440px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 425px) 50vw, 100vw',
	list: '(min-width: 768px) 96px, (min-width: 425px) 128px, 80vw',
	modal: '(min-width: 1440px) 800px, (min-width: 1024px) 700px, (min-width: 768px) 600px, 90vw'
} as const;
