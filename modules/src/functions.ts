


export const render = (route: any) => {
	const exts = [ 'ts', 'tsx', 'js', 'scss' ]
	const type = route.hasOwnProperty('page') ? 'pages' : ( route.hasOwnProperty('component') ? 'components' : null)
	
	exts.map( (ext:any) => renderElement(route, type, ext))
}

const renderElement = (route: any, type: string, ext: string) => {
	try {
		renderElementExternal(route, type, ext)
		route.hasOwnProperty('page') && require(`./../../src/${type}/${route.page}/${route.page}.${ext}`).page() 
		console.warn(`Element Internal loaded: ${type}.${route.page}.${ext}`)
	} catch (error) {
		return;
	}
}

const renderElementExternal =  (route: any, type: string, ext: string) => {
	try {
		route.hasOwnProperty('page') && require(`./../../src/${type}/${route.page}.${ext}`).page() 
		console.warn(`Element External loaded: ${type}.${route.page}.${ext}`)
	} catch (error) {
		return;
	}
}


export const checkRoutePath = (itemPath:any ) => window.location.pathname === itemPath