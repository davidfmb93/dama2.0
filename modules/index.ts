import { global } from './../src/services/global'
import { middleware } from './../src/services/middleware'
import { DamaRoutes } from './../src/routes'
import { render, checkRoutePath } from './src/functions'

// require(`./../src/styles/global.scss`)





const dama = async () => {
	await middleware()
	global() 
	configRoutes()
}

dama()


const configRoutes = () => {
	//Found route respect path
	let route: any = DamaRoutes.find( (item: any) => Array.isArray(item.path) ? item.path.some( (itemPath:string) => checkRoutePath(itemPath) ) : checkRoutePath(item.path))
	
	console.log('route:::', route)
	
	if(route){
		render(route)
	}else{
		// routeDontFound()
	}
}


/**
 * dinamicRoutes
 * 
 * This function generate the dinamic routes when yu send in the route :
 * 
 * @returns 
 */
function dinamicRoutes(){
	let otherRoutes:any = DamaRoutes.filter((item: any) => item.path.includes(':'))
	let getRouteCurrent:any = location.pathname.split('/')
	let request:object = {}
	otherRoutes.map( (route: any) => request = getRouteCurrent[1] == (route.path.split('/'))[1] ? { 'status': true, 'route': route} : { 'status': false })
	return request
}

/**
 * routeDontFound
 * 
 * This function work when route wasn't found
 * 
 * @returns 
 */
function routeDontFound(){
	const dinamic: any = dinamicRoutes();
	dinamic.status && require(`/src/ts/components/${dinamic.route.component}.ts`).page()
}


