declare namespace process{
	export namespace env{
		export const NODE_ENV:string;
	}
}

declare namespace app {
	export const apiBasePath : string;
	export const basePath : string;
}

interface RequireImport {
    default: any;
}
