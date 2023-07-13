interface Config {
  clientKey: string;
  secretKey: string;
}

const createConfig: () => Config = () => {
  if (!process.env.NEXT_PUBLIC_CLIENT_KEY) throw new Error("no client key");
  if (!process.env.NEXT_PUBLIC_SECRET_KEY) throw new Error("no secret key");

  return {
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY,
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  };
};

export default createConfig();
