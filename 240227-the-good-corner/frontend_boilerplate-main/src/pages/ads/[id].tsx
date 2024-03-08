import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../styles/AdDetail.module.css";

type Ad = {
  id: number;
  title: string;
  imgUrl: string;
  price: string;
  description: string;
  owner: string;
};

type SandboxState = Ad & { editable: boolean };

export default function AdDetail() {
  const [state, setState] = useState<SandboxState>({
    editable: false,
    description: "",
    id: 0,
    imgUrl: "",
    owner: "",
    price: "",
    title: "",
  });

  const router = useRouter();

  async function fetchAd() {
    if (!router.query.id) return;
    const { data } = await axios.get<Ad>(
      `http://localhost:5000/ads/${router.query.id}`,
    );
    setState({ ...data, editable: false });
  }
  useEffect(() => {
    fetchAd();
  }, [router.query.id]);

  const hDelete = async () => {
    if (!router.query.id) return;
    await axios.delete(`http://localhost:5000/ads/${router.query.id}`);
    router.push("/");
  };

  const hSubmit = (evt: FormEvent) => {
    console.log("ping ?");

    evt.preventDefault();
    if (state.editable) {
      onSave();
      setState({ ...state, editable: false });
    } else {
      setState({ ...state, editable: true });
    }
  };

  const hChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;
    setState({ ...state, [name]: value });
  };

  const onSave = () => {
    console.log("Données sauvegardées :", state);
    axios.put(`http://localhost:5000/ads/${state.id}`, state);
  };

  return (
    <>
      <h2 className={styles["ad-details-title"]}>{state.title}</h2>
      <form onSubmit={hSubmit} className={styles["ad-details"]}>
        {state.editable ? (
          <input
            type="text"
            name="imgUrl"
            placeholder="URL de l'image"
            value={state.imgUrl}
            onChange={hChange}
            disabled={!state.editable}
          />
        ) : (
          <div className={styles["ad-details-image-container"]}>
            <img
              className={styles["ad-details-image"]}
              src={state.imgUrl}
              alt={state.title}
            />
          </div>
        )}
        <div className={styles["ad-details-info"]}>
          <div>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={state.price}
            onChange={hChange}
            disabled={!state.editable}
            className={styles["ad-details-price"]}
            />{" "}
          €
            </div>
          <textarea
            name="description"
            placeholder="Description"
            value={state.description}
            onChange={hChange}
            disabled={!state.editable}
            className={styles["ad-details-description"]}
          />
          <hr className={styles["separator"]} />
          <div className={styles["ad-details-owner"]}>
            Annoncée publiée par{" "}
            <b>
              <input
                type="text"
                name="owner"
                placeholder="Owner"
                value={state.owner}
                onChange={hChange}
                disabled={!state.editable}
              />
            </b>{" "}
            aujourd&apos;hui (9:32).
          </div>
          <a
            href={`mailto:${state.owner}`}
            className={`${styles["button"]} ${styles["button-primary"]} ${styles["link-button"]}`}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              strokeWidth={2.5}
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>
        </div>
        <fieldset className="actions">
          {state.editable ? (
              <button type="submit">Valider</button>
          ) : (
            <>
            <button type="submit">Éditer</button>
      <button className={styles.button} onClick={hDelete}>
        Supprimer
      </button>
      </>

          )}
        </fieldset>
      </form>
    </>
  );
}
