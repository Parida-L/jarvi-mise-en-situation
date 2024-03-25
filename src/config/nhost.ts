import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
    subdomain: `${import.meta.env.VITE_NHOST_SUBDOMAIN}`,
    region: 'eu-central-1',
})

console.log("✅ NHOST.TS: Nhost client instantiated successfully");

(async () => {
    try {
        console.log("🚀 NHOST.TS: Attempting to sign in user...");
        
        // User signin
        await nhost.auth.signIn({
            email: `${import.meta.env.VITE_NHOST_EMAIL}`,
            password: `${import.meta.env.VITE_NHOST_PASSWORD}`,
        });

        //Verification if the user is Authenticated 
        if (nhost.auth.isAuthenticated()) {
            console.log("✅ NHOST.TS: User signed in successfully");
        } else {
            console.error("❌ NHOST.TS: User authentication failed");
        }
    } catch (error) {
        console.error("❌ NHOST.TS: Error signing in user:", error);
    }
})();

export default nhost;
