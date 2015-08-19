declare module 'component/router'{
	export  = router;
}

declare module router{
	function Router({url, config}: {url:string; config?:any});
	function ComponentRouter({url, config}:{url: string; config?: {parent?: string; defaultRoute?: string; useAsNamedView: boolean; params?: any;}});
}

