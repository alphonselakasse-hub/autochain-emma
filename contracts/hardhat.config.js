accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
   },
   amoy: {
     url: process.env.AMOY_RPC_URL || "",
     accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
   }
 }
};