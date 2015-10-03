declare module 'component/router'{
	export  = router;
}

declare module router{
	/**
	 * Sets up a Route for the View Component
	 */
	function Router({url, stateName}: {url:string; stateName?:string});
	/**
	 * Route configuration for the View Component
	 */
	function RouteConfig({defaultRoute, parent, params}: {defaultRoute?:boolean; parent?:string; params?: any});
	/**
	 * Creates a new Router Component
	 * Depricated... Use Router and RouteConfig instead...
	 */
	function ComponentRouter({url, config}:{url: string; config?: {parent?: string; defaultRoute?: string; useAsNamedView: boolean; params?: any;}});
}

