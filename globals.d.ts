declare namespace process{
	export namespace env{
		export const NODE_ENV:string;
	}
}

declare namespace app {
	export const apiBasePath : string;
}

interface RequireImport {
    default: any;
}
