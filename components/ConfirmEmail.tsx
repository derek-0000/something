import { useRouter } from "next/router";

export default function ConfirmEmail() {
    const router = useRouter();
    const { token } = router.query;
    console.log(token);

    return (
        <div>
          <p>Parametro 1: {token}</p>
        </div>
      );
}