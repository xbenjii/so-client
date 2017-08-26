interface ClientConfig {
	email: string;
	password: string;
	mainRoom: number;
	trigger: string;
}

const config : ClientConfig = {
	email: "",
	password: "",
	mainRoom: 1,
	trigger: "."
};

export { ClientConfig, config };