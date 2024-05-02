import { FormEvent, useEffect, useState } from "react";
import styles from "../styles/NewAd.module.css";
import axios from "axios";

type Category = {
  id: number;
  title: string;
};

export default function NewAd() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get<Category[]>(
        "http://localhost:5000/categories",
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const hSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    axios.post("http://localhost:5000/ads", formJson);

    console.log(formJson);
  };

  return (
    <form onSubmit={hSubmit}>
      <label>
        Titre de l&apos;annonce
        <br />
        <input className={styles["text-field"]} name="title" />
      </label>
      <br />
      <label>
        Prix
        <br />
        <input className={styles["text-field"]} name="price" />
      </label>
      <br />
      <label>
        Catégorie
        <select name="category">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Description
        <br />
        <input className={styles["text-field"]} name="description" />
      </label>
      <br />
      <label>
        Propriétaire
        <br />
        <input className={styles["text-field"]} name="owner" />
      </label>
      <br />
      <label>
        Image (url)
        <br />
        <input className={styles["text-field"]} name="imgUrl" />
      </label>
      <br />
      <label>
        Lieu
        <br />
        <input className={styles["text-field"]} name="location" />
      </label>
      <br />
      <label>
        Tags
        <br />
        <input className={styles["text-field"]} name="tags" />
      </label>
      <button className={styles.button}>Submit</button>
    </form>
  );
}
