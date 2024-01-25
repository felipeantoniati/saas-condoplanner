import { auth, signOut } from "@/auth";


const SettingsPages = async () => {
      const session = await auth();

      return (
            <div>
                  {JSON.stringify(session)}
                  <form action={async () => {
                        "use server"

                        await signOut();
                  }}>
                        <button type="submit">
                              Sair
                        </button>
                  </form>
            </div>

      );
};

export default SettingsPages;