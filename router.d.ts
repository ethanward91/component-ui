declare module 'component/router'{
	export  = router;
}

declare module router{
	function Router({url, config}: {url:string; config?:any});
}